import type { Search } from '@coveo/headless/commerce'
import {
  loadCategoryFacetSetActions,
  loadCoreFacetActions,
  loadSearchActions,
} from '@coveo/headless/commerce'
import { getEngine } from '../engine'

/** Facets request this many values before Atomic shows "Show more". */
export const FACET_VALUES_BEFORE_SHOW_MORE = 10

let syncingFacetDisplayLimits = false
/** Facets we already bumped this session — avoids re-search loops when the index has fewer values. */
const displayLimitSynced = new Set<string>()

export const isSyncingFacetDisplayLimits = (): boolean => syncingFacetDisplayLimits

/**
 * Coveo Commerce defaults to 8 facet values, so "Show more" appears when a
 * ninth option exists. Bump the request to 10 so the control only shows when
 * there are more than ten options in the index.
 */
export const syncFacetDisplayLimits = (search: Search): void => {
  if (syncingFacetDisplayLimits) return

  const engine = getEngine()
  if (!search.state.responseId) return

  const generator = search.facetGenerator()
  const coreActions = loadCoreFacetActions(engine)
  const categoryActions = loadCategoryFacetSetActions(engine)
  let needsSearch = false

  for (const facet of generator.facets) {
    const { facetId, type, canShowLessValues, values } = facet.state

    if (canShowLessValues) continue
    if (values.length >= FACET_VALUES_BEFORE_SHOW_MORE) continue
    if (displayLimitSynced.has(facetId)) continue

    displayLimitSynced.add(facetId)

    if (type === 'hierarchical') {
      engine.dispatch(
        categoryActions.updateCategoryFacetNumberOfValues({
          facetId,
          numberOfValues: FACET_VALUES_BEFORE_SHOW_MORE,
        })
      )
      needsSearch = true
      continue
    }

    if (type === 'regular') {
      engine.dispatch(
        coreActions.updateCoreFacetNumberOfValues({
          facetId,
          numberOfValues: FACET_VALUES_BEFORE_SHOW_MORE,
        })
      )
      needsSearch = true
    }
  }

  if (!needsSearch) return

  syncingFacetDisplayLimits = true
  const { executeSearch } = loadSearchActions(engine)
  engine.dispatch(executeSearch())
}

export const finishSyncingFacetDisplayLimits = (): void => {
  syncingFacetDisplayLimits = false
}

const FACET_HOST_SELECTOR = [
  'atomic-commerce-category-facet',
  'atomic-commerce-facet',
  'atomic-commerce-numeric-facet',
  'atomic-commerce-timeframe-facet',
].join(',')

type FacetWithValues = {
  state: {
    field?: string
    facetId?: string
    values?: Array<{ numberOfResults?: number; state?: string; children?: unknown[] }>
    selectedValueAncestry?: unknown[]
  }
}

const facetHasSelectableValues = (facet: FacetWithValues): boolean => {
  const ancestry = facet.state.selectedValueAncestry
  if (Array.isArray(ancestry) && ancestry.length > 0) return true

  const values = facet.state.values ?? []
  return values.some(
    (value) =>
      (value.numberOfResults ?? 0) > 0 ||
      (value.state !== undefined && value.state !== 'idle') ||
      (Array.isArray(value.children) && value.children.length > 0)
  )
}

/** Hide Atomic facet hosts that have no values for the current result set. */
export const hideEmptyFacets = (search: Search): void => {
  const byField = new Map<string, boolean>()
  for (const facet of search.facetGenerator().facets) {
    const field = facet.state.field || facet.state.facetId
    if (!field) continue
    byField.set(field, facetHasSelectableValues(facet))
  }

  for (const host of document.querySelectorAll(FACET_HOST_SELECTOR)) {
    if (!(host instanceof HTMLElement)) continue
    const field = host.getAttribute('field')
    if (!field || !byField.has(field)) continue
    host.hidden = byField.get(field) === false
  }
}
