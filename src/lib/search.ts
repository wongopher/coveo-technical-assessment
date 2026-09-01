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
import { configurationStore } from './configurationStore'
import { getEngine } from '../engine'
import { robotFilterStore } from './robotFilter'
import {
  finishSyncingFacetDisplayLimits,
  hideEmptyFacets,
  isSyncingFacetDisplayLimits,
  syncFacetDisplayLimits,
} from './facetDisplayLimits'

let search: Search | null = null
let searchBox: SearchBox | null = null

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
  return getSearch().facetGenerator().facets
}
let filterPersistenceReady = false
let searchBoxDomListenersReady = false
let lastResponseId = ''
let lastQueryAtResponse = ''
let reapplying = false
/** Skips filter persistence while an explicit "Remove filter" is in flight. */
let clearingRobotFilter = false
let reapplyAttempts = 0

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

/** Pinned store first; fall back to the configuration anchor's series. */
const getPinnedSeries = (): string[] => {
  const pinned = robotFilterStore.getSnapshot()
  if (pinned.series.length > 0) return pinned.series
  return configurationStore.getSnapshot().anchor?.series ?? []
}

const getCommerceSearchBoxInput = (): HTMLInputElement | HTMLTextAreaElement | null => {
  const root = document.querySelector('atomic-commerce-search-box')?.shadowRoot
  const element = root?.querySelector('textarea, input')
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement
    ? element
    : null
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

/** Clears the search box and runs an empty query (updates results and URL #q). */
const clearQueryAndSubmit = () => {
  resetSearchQuery()
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
      if (event.key !== 'Enter' || !hasSeriesPinned()) return

      const inSearchBox = event.composedPath().some(
        (node) =>
          node instanceof Element && node.closest('atomic-commerce-search-box') !== null
      )
      if (inSearchBox) {
        clearRobotsCategoryOnEngine()
      }
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

/**
 * Align Compatible Robots with `series` using engine actions (one search),
 * including values that are not in the current facet list. Controller
 * `toggleSelect` fires a search per value and cannot add a missing value —
 * that is what desynced the robot-select path from a normal facet click.
 */
const applySeriesSelection = (series: string[]) => {
  const engine = getEngine()
  const { toggleSelectFacetValue } = loadRegularFacetActions(engine)
  const { executeSearch } = loadSearchActions(engine)
  const current = selectedSeries()
  if (seriesEqual(current, series)) {
    reapplying = false
    engine.dispatch(executeSearch())
    return
  }

  const facet = getFacets().find(
    (entry) => entry.state.facetId === SERIES_FACET_ID && entry.type === 'regular'
  )
  const values = facet?.type === 'regular' ? facet.state.values : []
  let toggled = false

  for (const value of values) {
    const shouldBeSelected = series.includes(value.value)
    const isSelected = value.state === 'selected'
    if (shouldBeSelected === isSelected) continue
    engine.dispatch(toggleSelectFacetValue({ facetId: SERIES_FACET_ID, selection: value }))
    toggled = true
  }

  const present = new Set(values.map((value) => value.value))
  for (const value of series) {
    if (present.has(value)) continue
    engine.dispatch(
      toggleSelectFacetValue({
        facetId: SERIES_FACET_ID,
        selection: { value, state: 'idle', numberOfResults: 0 },
      })
    )
    toggled = true
  }

  if (!toggled) {
    reapplying = false
    return
  }

  engine.dispatch(executeSearch())
}

/** Drop the configuration anchor when facet fitment no longer matches that robot. */
const reconcileAnchorWithSeries = (series: string[]) => {
  const anchor = configurationStore.getSnapshot().anchor
  if (!anchor) return

  if (series.length === 0 || !seriesEqual(anchor.series, series)) {
    configurationStore.clearAnchor()
  }
}

/** Keep the pin store aligned with what the facet is actually filtering on. */
const syncStoreFromFacet = (series: string[]) => {
  const pinned = robotFilterStore.getSnapshot()

  if (series.length === 0) {
    if (pinned.series.length > 0) {
      robotFilterStore.unpinSeries()
    }
  } else if (!seriesEqual(series, pinned.series)) {
    robotFilterStore.pinSeries(series)
    dropRobotsCategoryWhenSeriesPinned()
  }

  reconcileAnchorWithSeries(series)
}

/**
 * Narrows results to parts that fit a given robot series.
 * Selects Compatible Robots on the engine so the left-rail checkboxes
 * update; Atomic then writes the hash from that state.
 */
export const selectSeries = (series: string[]) => {
  getSearch()
  getSearchBox().updateText('')

  if (series.length > 0) {
    robotFilterStore.pinSeries(series)
    dropRobotsCategoryWhenSeriesPinned()
  } else {
    robotFilterStore.unpinSeries()
  }

  if (reapplying) {
    applySeriesSelection(series)
    return
  }

  reapplying = true
  try {
    applySeriesSelection(series)
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
  robotFilterStore.unpinSeries()
  deselectAllSeries()
}

/** Robot series currently selected in the fitment facet. */
export const selectedSeries = (): string[] => {
  const facet = getFacets().find((entry) => entry.state.facetId === SERIES_FACET_ID)
  if (!facet || facet.type !== 'regular') return []
  return facet.state.values
    .filter((value) => value.state === 'selected')
    .map((value) => value.value)
}

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
  if (seriesEqual(current, target)) {
    reapplying = false
    reapplyAttempts = 0
    return
  }

  // Buyer changed Compatible Robots while a pin was still applying. Facet
  // selection wins so a later suggestion query does not snap back to the pin.
  if (!queryChanged && current.length > 0) {
    reapplying = false
    reapplyAttempts = 0
    syncStoreFromFacet(current)
    return
  }

  reapplyAttempts += 1
  if (reapplyAttempts > 8) {
    reapplying = false
    reapplyAttempts = 0
  }
}

/** Whether any robot-journey filter is active (browse, series, or anchor). */
export const isRobotJourneyActive = (): boolean =>
  robotFilterStore.getSnapshot().browseRobots ||
  configurationStore.getSnapshot().anchor !== null ||
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
  configurationStore.clearAnchor()

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
  try {
    if (series.length > 0) {
      dropRobotsCategoryWhenSeriesPinned()
      const current = selectedSeries()
      if (!seriesEqual(current, series)) {
        applySeriesSelection(series)
      } else {
        reapplying = false
      }
    } else if (pinned.browseRobots && !isRobotsCategorySelected()) {
      selectRobotsCategory()
    }
  } catch (error) {
    reapplying = false
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

    const responseId = search!.state.responseId
    if (responseId === lastResponseId) return

    const query = getCommerceSearchBoxInput()?.value ?? getSearchBox().state.value
    const queryChanged = query !== lastQueryAtResponse

    lastResponseId = responseId
    lastQueryAtResponse = query
    hideEmptyFacets(search!)
    requestAnimationFrame(() => hideEmptyFacets(search!))

    if (query.length === 0) {
      removeQueryFromHash()
    }

    if (reapplying) {
      finishReapplyingIfSynced(queryChanged)
      return
    }

    if (isSyncingFacetDisplayLimits()) {
      finishSyncingFacetDisplayLimits()
      return
    }

    if (clearingRobotFilter) {
      clearingRobotFilter = false
      return
    }

    const pinned = robotFilterStore.getSnapshot()
    const targetSeries = getPinnedSeries()
    const currentSeries = selectedSeries()

    if (queryChanged) {
      reapplyPinnedFilters()
      return
    }

    if (!seriesEqual(currentSeries, targetSeries)) {
      // Query unchanged: the buyer changed Compatible Robots (including
      // its Clear filter). Facet selection wins — do not re-pin.
      syncStoreFromFacet(currentSeries)
    } else if (currentSeries.length > 0) {
      reconcileAnchorWithSeries(currentSeries)
    }

    if (pinned.browseRobots && !isRobotsCategorySelected()) {
      robotFilterStore.unpinBrowse()
    }

    syncFacetDisplayLimits(search!)
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
  configurationStore.clearAnchor()

  getSearch()
  getSearchBox().updateText('')

  const fragment = BROWSE_ROBOTS_FRAGMENT
  if (window.location.hash.slice(1) === fragment) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }

  window.location.hash = fragment
}
