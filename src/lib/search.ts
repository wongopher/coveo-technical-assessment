import {
  buildSearch,
  buildSearchBox,
  buildFieldsSortCriterion,
  buildRelevanceSortCriterion,
  loadCoreFacetActions,
  loadRegularFacetActions,
  loadSearchActions,
  SortDirection,
  type CategoryFacetValue,
  type Search,
  type SearchBox,
  type SortCriterion,
} from '@coveo/headless/commerce'
import { configurationStore, MAX_SELECTED_ROBOTS, uniqueSeries, type ConfigurationAnchor } from './configurationStore'
import { getCapturedCommerceSearch, getEngine } from '../engine'
import { robotFilterStore } from './robotFilter'
import { ensureRobotCatalog, reconcileAnchorsWithSeries, registerRobot } from './robotDirectory'
import {
  expandSeriesValues,
  isJoinedSeriesValue,
  seriesFromHash,
  writeCompatibleRobotsHash,
} from './seriesFacetMatch'
import {
  finishSyncingFacetDisplayLimits,
  hideEmptyFacets,
  isSyncingFacetDisplayLimits,
  syncFacetDisplayLimits,
} from './facetDisplayLimits'

let search: Search | null = null
let searchBox: SearchBox | null = null
/**
 * One generator for the lifetime of the engine. `search.facetGenerator()`
 * builds a new instance each call; reading `.facets` then constructs every
 * regular/category controller, which dispatches `facetSearch/register`.
 * Doing that from React snapshots (every Headless tick) is what made the
 * Compatible Robots click look like multiple fetches and slowed the page.
 */
let facetGenerator: ReturnType<Search['facetGenerator']> | null = null

/**
 * Regular facet controllers register facet search on first access. Before the
 * first Commerce response arrives, Headless still has an empty facetId and
 * facetSearch/register throws SchemaValidationError on page refresh with #f-…
 * hash params.
 */
const canAccessFacetControllers = (): boolean =>
  Boolean(search?.state.responseId)

const getFacets = () => {
  if (!canAccessFacetControllers()) return []
  if (!facetGenerator) {
    facetGenerator = getSearch().facetGenerator()
  }
  return facetGenerator.facets
}
let filterPersistenceReady = false
let searchBoxDomListenersReady = false
let lastResponseId = ''
let lastQueryAtResponse = ''
let reapplying = false
/** True when the in-flight reapply was triggered by a query change, not a robot click. */
let reapplyFromQuery = false
/** Skips filter persistence while an explicit "Remove filter" is in flight. */
let clearingRobotFilter = false
let reapplyAttempts = 0
let catalogKickoff = false

export const getSearch = (): Search => {
  if (!search) {
    search = buildSearch(getEngine())
    getSearchBox()
    initFilterPersistence()
  }
  return search
}

const getSearchBox = (): SearchBox => {
  if (!searchBox) {
    searchBox = buildSearchBox(getEngine(), { options: { clearFilters: false } })
    initSearchBoxDomListeners()
  }
  return searchBox
}

const hasRobotFilterContext = (): boolean => isRobotJourneyActive()

/** Pinned store first; fall back to selected robots' series. */
const getPinnedSeries = (): string[] => {
  const pinned = robotFilterStore.getSnapshot()
  if (pinned.series.length > 0) return pinned.series
  return uniqueSeries(configurationStore.getSnapshot().anchors)
}

const getCommerceSearchBoxInput = (): HTMLInputElement | HTMLTextAreaElement | null => {
  const root = document.querySelector('atomic-commerce-search-box')?.shadowRoot
  if (!root) return null
  const candidates = [...root.querySelectorAll('textarea, input')]
  for (const element of candidates) {
    if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement)) {
      continue
    }
    if (element.getAttribute('aria-hidden') === 'true') continue
    if (element.getAttribute('part')?.includes('spacer')) continue
    if (element.classList.contains('invisible')) continue
    return element
  }
  return null
}

/** Removes `q` from the location hash when the query is empty. */
const removeQueryFromHash = () => {
  const raw = window.location.hash.slice(1)
  if (!raw) return

  const params = new URLSearchParams(raw)
  if (!params.has('q')) return

  params.delete('q')
  const next = params.toString()
  const base = `${window.location.pathname}${window.location.search}`
  history.replaceState(null, document.title, next ? `${base}#${next}` : base)
}

/** Runs an empty query — resets results and drops `#q` from the URL. */
export const resetSearchQuery = () => {
  getSearch()
  const engine = getEngine()
  const { prepareForSearchWithQuery, executeSearch } = loadSearchActions(engine)
  const hasRobotFilter = hasRobotFilterContext()

  engine.dispatch(
    prepareForSearchWithQuery({
      query: '',
      clearFilters: !hasRobotFilter,
    })
  )
  engine.dispatch(executeSearch())

  getSearchBox().updateText('')
  removeQueryFromHash()
}

const scheduleResetAfterClear = () => {
  // Let Atomic's clear handler empty the input first, then reset via the engine.
  setTimeout(() => resetSearchQuery(), 0)
}

/**
 * Atomic's clear (X) only calls searchBox.clear() — it empties the input but does
 * not execute a new search, so results and `#q` stay on the previous query.
 */
const initSearchBoxDomListeners = () => {
  if (searchBoxDomListenersReady) return
  searchBoxDomListenersReady = true

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key !== 'Enter' || event.shiftKey || !hasSeriesPinned()) return

      const inSearchBox = event.composedPath().some(
        (node) =>
          node instanceof Element && node.closest('atomic-commerce-search-box') !== null
      )
      if (!inSearchBox) return

      // Atomic's own submit joins multi-select (`R-20%2CC-5`) or clears it.
      // Submit through Headless with clearFilters: false instead.
      event.preventDefault()
      event.stopImmediatePropagation()
      const target = event.target
      const typed =
        target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
          ? target.value
          : ''
      const value = typed || getCommerceSearchBoxInput()?.value || getSearchBox().state.value
      runQuery(value)
    },
    true
  )

  document.addEventListener(
    'click',
    (event) => {
      const path = event.composedPath()
      const isClear = (node: EventTarget) =>
        node instanceof Element &&
        node.getAttribute('part')?.split(/\s+/).includes('clear-button')
      const seriesFacet = path.some(
        (node) =>
          node instanceof Element &&
          node.tagName.toLowerCase() === 'atomic-commerce-facet' &&
          node.getAttribute('field') === SERIES_FACET_ID
      )
      if (seriesFacet && path.some(isClear)) {
        event.preventDefault()
        event.stopImmediatePropagation()
        clearSeries()
        return
      }

      const inSearchBox = path.some(
        (node) =>
          node instanceof Element &&
          node.tagName.toLowerCase() === 'atomic-commerce-search-box'
      )
      if (inSearchBox && path.some(isClear)) {
        scheduleResetAfterClear()
      }
    },
    true
  )
}

const arraysEqual = (a: string[], b: string[]): boolean =>
  a.length === b.length && a.every((value, index) => value === b[index])

const seriesEqual = (a: string[], b: string[]): boolean =>
  arraysEqual([...a].sort(), [...b].sort())

const hasSeriesPinned = (): boolean => getPinnedSeries().length > 0

/** Deselect Category: Robots on the engine without triggering its own search. */
const clearRobotsCategoryOnEngine = () => {
  if (!isRobotsCategorySelected()) return
  const engine = getEngine()
  const { deselectAllValuesInCoreFacet } = loadCoreFacetActions(engine)
  engine.dispatch(deselectAllValuesInCoreFacet({ facetId: CATEGORY_FACET_ID }))
}

const submitQuery = (query: string) => {
  if (hasSeriesPinned()) {
    clearRobotsCategoryOnEngine()
  }

  const engine = getEngine()
  const { prepareForSearchWithQuery, executeSearch } = loadSearchActions(engine)
  engine.dispatch(
    prepareForSearchWithQuery({
      query,
      clearFilters: !hasRobotFilterContext(),
    })
  )
  engine.dispatch(executeSearch())
}

/**
 * Runs a query through the Headless search box so the Atomic search box stays
 * in sync. Driving the shadow-DOM input with synthetic events does not submit.
 */
export const runQuery = (query: string) => {
  getSearch()
  getSearchBox().updateText(query)
  submitQuery(query)
}

export const SERIES_FACET_ID = 'compatible_robot_series'
export const CATEGORY_FACET_ID = 'ec_category'
export const ROBOTS_CATEGORY = 'Robots'

/**
 * The Commerce API advertises relevance as the only available sort, but it
 * honours field sorts that are requested explicitly. These are offered in a
 * custom control because the stock Atomic dropdown renders only what the
 * response advertises.
 */
export const PAGE_SIZE_OPTIONS = [12, 24, 48] as const

export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[1]

export const SORT_OPTIONS: Array<{ id: string; label: string; criterion: SortCriterion }> = [
  { id: 'relevance', label: 'Best match', criterion: buildRelevanceSortCriterion() },
  {
    id: 'price-asc',
    label: 'Price: low to high',
    criterion: buildFieldsSortCriterion([
      { name: 'ec_price', direction: SortDirection.Ascending },
    ]),
  },
  {
    id: 'price-desc',
    label: 'Price: high to low',
    criterion: buildFieldsSortCriterion([
      { name: 'ec_price', direction: SortDirection.Descending },
    ]),
  },
  {
    id: 'rating-desc',
    label: 'Highest rated',
    criterion: buildFieldsSortCriterion([
      { name: 'ec_rating', direction: SortDirection.Descending },
    ]),
  },
]

const syncSeriesHash = (series: string[]) => {
  if (seriesEqual(seriesFromHash(), series)) return
  writeCompatibleRobotsHash(series)
}

/**
 * Align Compatible Robots with `series` using engine actions (one search),
 * including values that are not in the current facet list. Always clear
 * first so a joined `R-20,C-10` token cannot stay selected while the pin
 * and `f-compatible_robot_series` hash show the real series codes.
 */
const applySeriesSelection = (series: string[]) => {
  const current = selectedSeries()
  if (seriesEqual(current, series) && !hasJoinedSeriesSelection()) {
    reapplying = false
    reapplyFromQuery = false
    if (series.length > 0) syncSeriesHash(series)
    return
  }

  const engine = getEngine()
  const { deselectAllValuesInCoreFacet } = loadCoreFacetActions(engine)
  const { toggleSelectFacetValue } = loadRegularFacetActions(engine)
  const { executeSearch } = loadSearchActions(engine)

  engine.dispatch(deselectAllValuesInCoreFacet({ facetId: SERIES_FACET_ID }))
  for (const value of series) {
    engine.dispatch(
      toggleSelectFacetValue({
        facetId: SERIES_FACET_ID,
        selection: { value, state: 'idle', numberOfResults: 0 },
      })
    )
  }
  engine.dispatch(executeSearch())
}

/** Keep selected robots in sync when Compatible Robots changes. */
const capSeries = (series: string[]): string[] => series.slice(0, MAX_SELECTED_ROBOTS)

/** Drop robots whose series is no longer selected; resolve robots for new series. */
const syncAnchorsWithSeries = (series: string[]) => {
  reconcileAnchorsWithSeries(capSeries(series))
}

/** Keep the pin store aligned with what the facet is actually filtering on. */
const syncStoreFromFacet = (series: string[]) => {
  const pinned = robotFilterStore.getSnapshot()

  if (series.length > MAX_SELECTED_ROBOTS) {
    const keep =
      pinned.series.length > 0 && pinned.series.length <= MAX_SELECTED_ROBOTS
        ? pinned.series
        : capSeries(series)
    selectSeries(keep)
    return
  }

  if (series.length === 0) {
    if (pinned.series.length > 0) {
      robotFilterStore.unpinSeries()
    }
  } else if (!seriesEqual(series, pinned.series)) {
    robotFilterStore.pinSeries(series)
    dropRobotsCategoryWhenSeriesPinned()
  }

  syncAnchorsWithSeries(series)
}

/**
 * Narrows results to parts that fit a given robot series.
 * Selects Compatible Robots on the engine so the left-rail checkboxes
 * update; Atomic then writes the hash from that state.
 */
export const selectSeries = (series: string[]) => {
  getSearch()
  getSearchBox().updateText('')

  const next = capSeries(series)
  reapplyFromQuery = false
  if (next.length > 0) {
    robotFilterStore.pinSeries(next)
    dropRobotsCategoryWhenSeriesPinned()
  } else {
    robotFilterStore.unpinSeries()
  }

  syncAnchorsWithSeries(next)

  if (reapplying) {
    applySeriesSelection(next)
    return
  }

  reapplying = true
  try {
    applySeriesSelection(next)
  } catch (error) {
    reapplying = false
    throw error
  }
}

const deselectSeriesFacetOnEngine = () => {
  const engine = getEngine()
  const { deselectAllValuesInCoreFacet } = loadCoreFacetActions(engine)
  engine.dispatch(deselectAllValuesInCoreFacet({ facetId: SERIES_FACET_ID }))
}

const deselectAllSeries = () => {
  deselectSeriesFacetOnEngine()
  const engine = getEngine()
  const { executeSearch } = loadSearchActions(engine)
  engine.dispatch(executeSearch())
}

export const clearSeries = () => {
  clearingRobotFilter = true
  robotFilterStore.unpinSeries()
  configurationStore.clearAnchors()
  syncSeriesHash([])
  deselectAllSeries()
}

export const toggleSelectedRobot = (anchor: ConfigurationAnchor) => {
  const current = configurationStore.getSnapshot().anchors
  const remaining = current.filter((entry) => entry.permanentid !== anchor.permanentid)
  const selected = remaining.length !== current.length

  if (selected) {
    if (remaining.length === 0) {
      clearRobotFilter()
      return
    }
    configurationStore.setAnchors(remaining)
    selectSeries(uniqueSeries(remaining))
    return
  }

  const withoutSameSeries = current.filter(
    (entry) => !entry.series.some((value) => anchor.series.includes(value))
  )
  if (withoutSameSeries.length >= MAX_SELECTED_ROBOTS) return
  const next = [...withoutSameSeries, anchor]
  configurationStore.setAnchors(next)
  selectSeries(uniqueSeries(next))
}

/** Robot series currently selected in the fitment facet. */
const rawSelectedSeries = (): string[] => {
  const facet = getFacets().find((entry) => entry.state.facetId === SERIES_FACET_ID)
  if (!facet || facet.type !== 'regular') return []
  return facet.state.values
    .filter((value) => value.state === 'selected')
    .map((value) => value.value)
}

const hasJoinedSeriesSelection = (): boolean => rawSelectedSeries().some(isJoinedSeriesValue)

export const selectedSeries = (): string[] => expandSeriesValues(rawSelectedSeries())

/** Facet selection is authoritative; fall back to pin / anchor when the facet is idle. */
export const getActiveSeries = (): string[] => {
  const fromFacet = selectedSeries()
  if (fromFacet.length > 0) return fromFacet
  return getPinnedSeries()
}

const finishReapplyingIfSynced = (queryChanged: boolean) => {
  if (!reapplying) return

  const target = getPinnedSeries()
  const current = selectedSeries()
  if (seriesEqual(current, target) && !hasJoinedSeriesSelection()) {
    reapplying = false
    reapplyFromQuery = false
    reapplyAttempts = 0
    if (target.length > 0) syncSeriesHash(target)
    return
  }

  // Buyer changed Compatible Robots (including Clear) while a pin from
  // "Find parts for this" was still applying. Do not treat a query rewrite
  // (which drops or joins multi-select) as a deliberate facet change.
  if (!reapplyFromQuery && !queryChanged && !hasJoinedSeriesSelection()) {
    reapplying = false
    reapplyFromQuery = false
    reapplyAttempts = 0
    syncStoreFromFacet(current)
    if (current.length === 0) syncSeriesHash([])
    return
  }

  reapplyAttempts += 1
  if (reapplyAttempts > 8) {
    reapplying = false
    reapplyFromQuery = false
    reapplyAttempts = 0
    return
  }

  applySeriesSelection(target)
}

/** Whether any robot-journey filter is active (browse, series, or anchor). */
export const isRobotJourneyActive = (): boolean =>
  robotFilterStore.getSnapshot().browseRobots ||
  configurationStore.getSnapshot().anchors.length > 0 ||
  getActiveSeries().length > 0

export const isRobotsCategorySelected = (): boolean => {
  const facet = getFacets().find((entry) => entry.state.facetId === CATEGORY_FACET_ID)
  if (!facet || facet.type !== 'hierarchical') return false

  const values = facet.state.values as CategoryFacetValue[]
  const robots = values.find((value) => value.value === ROBOTS_CATEGORY)
  return robots?.state === 'selected'
}

const selectRobotsCategory = (): boolean => {
  const facet = getFacets().find((entry) => entry.state.facetId === CATEGORY_FACET_ID)
  if (!facet || facet.type !== 'hierarchical') return false

  const values = facet.state.values as CategoryFacetValue[]
  const robots = values.find((value) => value.value === ROBOTS_CATEGORY)
  if (!robots) return false
  if (robots.state !== 'selected') {
    facet.toggleSelect(robots)
  }
  return true
}

const clearRobotsCategorySelection = () => {
  clearRobotsCategoryOnEngine()
}

/** Once a robot series is pinned, leave browse mode — show parts, not robots. */
const dropRobotsCategoryWhenSeriesPinned = () => {
  if (!hasSeriesPinned()) return
  clearRobotsCategoryOnEngine()
}

export const clearRobotsCategory = () => {
  clearRobotsCategorySelection()
  const engine = getEngine()
  const { executeSearch } = loadSearchActions(engine)
  engine.dispatch(executeSearch())
}

/** Clears pinned robot filters, facet selections, and the configuration anchor. */
export const clearRobotFilter = () => {
  clearingRobotFilter = true
  robotFilterStore.clear()
  configurationStore.clearAnchors()

  getSearch()
  deselectSeriesFacetOnEngine()
  clearRobotsCategorySelection()

  const engine = getEngine()
  const { executeSearch } = loadSearchActions(engine)
  engine.dispatch(executeSearch())
}

const reapplyPinnedFilters = () => {
  const pinned = robotFilterStore.getSnapshot()
  const series = getPinnedSeries()
  if (!pinned.browseRobots && series.length === 0) return
  if (reapplying) return

  reapplying = true
  reapplyFromQuery = true
  try {
    if (series.length > 0) {
      dropRobotsCategoryWhenSeriesPinned()
      const current = selectedSeries()
      if (!seriesEqual(current, series) || hasJoinedSeriesSelection()) {
        applySeriesSelection(series)
      } else {
        reapplying = false
        reapplyFromQuery = false
      }
    } else if (pinned.browseRobots && !isRobotsCategorySelected()) {
      selectRobotsCategory()
    }
  } catch (error) {
    reapplying = false
    reapplyFromQuery = false
    throw error
  }
}

const initFilterPersistence = () => {
  if (filterPersistenceReady || !search) return
  filterPersistenceReady = true

  lastResponseId = search.state.responseId
  lastQueryAtResponse = getCommerceSearchBoxInput()?.value ?? getSearchBox().state.value

  search.subscribe(() => {
    if (search!.state.isLoading) return

    search!.state.products.forEach(registerRobot)

    if (!catalogKickoff && search!.state.responseId && getCapturedCommerceSearch()) {
      catalogKickoff = true
      void ensureRobotCatalog()
    }

    const responseId = search!.state.responseId
    if (responseId === lastResponseId) return

    const query = (getSearchBox().state.value || getCommerceSearchBoxInput()?.value || '').trim()
    const queryChanged = query !== lastQueryAtResponse

    lastResponseId = responseId
    lastQueryAtResponse = query

    const facets = getFacets()
    hideEmptyFacets(facets)
    requestAnimationFrame(() => hideEmptyFacets(getFacets()))

    if (query.length === 0) {
      removeQueryFromHash()
    }

    const finishedDisplayLimits = isSyncingFacetDisplayLimits()
    if (finishedDisplayLimits) finishSyncingFacetDisplayLimits()

    if (reapplying) {
      finishReapplyingIfSynced(queryChanged || finishedDisplayLimits)
      return
    }

    if (clearingRobotFilter) {
      clearingRobotFilter = false
      return
    }

    const pinned = robotFilterStore.getSnapshot()
    const targetSeries = getPinnedSeries()
    const currentSeries = selectedSeries()
    const hashSeries = seriesFromHash()
    /** Pin / URL win over a follow-up search that dropped or joined multi-select. */
    const restoreSelection = queryChanged || finishedDisplayLimits

    // Atomic joins multi-select as a single `R-20,C-10` value. Expanded series
    // then matches the pin, but checkboxes and `f-compatible_robot_series`
    // stay on the joined token. Always split it back into real series codes.
    if (hasJoinedSeriesSelection()) {
      const next = capSeries(
        restoreSelection && targetSeries.length > 0 ? targetSeries : currentSeries
      )
      if (next.length === 0) {
        if (targetSeries.length > 0) reapplyPinnedFilters()
        return
      }
      if (!seriesEqual(next, targetSeries)) {
        robotFilterStore.pinSeries(next)
        dropRobotsCategoryWhenSeriesPinned()
        syncAnchorsWithSeries(next)
      }
      reapplying = true
      reapplyFromQuery = restoreSelection
      applySeriesSelection(next)
      return
    }

    if (restoreSelection && targetSeries.length > 0) {
      reapplyPinnedFilters()
      return
    }

    if (!seriesEqual(currentSeries, targetSeries)) {
      if (currentSeries.length === 0 && targetSeries.length > 0) {
        if (restoreSelection) {
          reapplyPinnedFilters()
          return
        }
        // Query unchanged: Clear on Compatible Robots (or breadbox).
        syncStoreFromFacet([])
        syncSeriesHash([])
        return
      }
      // Buyer changed Compatible Robots. Facet selection wins — do not re-pin.
      syncStoreFromFacet(currentSeries)
    } else if (currentSeries.length > 0) {
      syncAnchorsWithSeries(currentSeries)
    } else if (hashSeries.length > 0 && targetSeries.length === 0) {
      selectSeries(capSeries(hashSeries))
      return
    }

    if (pinned.browseRobots && !isRobotsCategorySelected()) {
      robotFilterStore.unpinBrowse()
    }

    const synced = getPinnedSeries()
    if (synced.length > 0 && seriesEqual(selectedSeries(), synced) && !hasJoinedSeriesSelection()) {
      syncSeriesHash(synced)
    }

    if (!finishedDisplayLimits) syncFacetDisplayLimits(facets)
  })
}

/** Hash Atomic's URL manager understands as: 48 / page, relevance, Category = Robots. */
export const BROWSE_ROBOTS_FRAGMENT =
  'perPage=48&sortCriteria=relevance&cf-ec_category=Robots'

/**
 * Entry point for the robot-first journey. Robots are only 61 of 1,242 products,
 * so they rarely surface on a broad query. Always reset to the Robots catalogue
 * (no query, no other facets, relevance, 48 per page) so the buyer can pick
 * a machine to configure around.
 */
export const browseRobots = () => {
  robotFilterStore.pinBrowseRobots()
  configurationStore.clearAnchors()

  getSearch()
  getSearchBox().updateText('')

  const fragment = BROWSE_ROBOTS_FRAGMENT
  if (window.location.hash.slice(1) === fragment) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }

  window.location.hash = fragment
}
