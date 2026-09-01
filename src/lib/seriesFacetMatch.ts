/** Same field Headless uses for the Compatible Robots facet (`SERIES_FACET_ID`). */
const SERIES_FACET_ID = 'compatible_robot_series'
const SERIES_HASH_KEY = `f-${SERIES_FACET_ID}`
const SERIES_CODE = /^[CRS]-\d+$/

type FacetValue = {
  value?: string
  state?: string
}

type CommerceFacet = {
  facetId?: string
  field?: string
  values?: FacetValue[]
}

type CommerceSearchBody = {
  query?: string
  facets?: CommerceFacet[]
}

const isCommerceSearchBody = (value: unknown): value is CommerceSearchBody =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isSeriesFacet = (facet: CommerceFacet): boolean =>
  facet.facetId === SERIES_FACET_ID || facet.field === SERIES_FACET_ID

const splitJoinedSeries = (value: string): string[] | null => {
  if (!value.includes(',')) return null
  const parts = value.split(',').map((entry) => entry.trim()).filter(Boolean)
  if (parts.length < 2 || !parts.every((part) => SERIES_CODE.test(part))) return null
  return parts
}

const expandJoinedSeriesValues = (values: FacetValue[]): FacetValue[] | null => {
  if (
    !values.some(
      (entry) =>
        entry.state === 'selected' &&
        typeof entry.value === 'string' &&
        splitJoinedSeries(entry.value) !== null
    )
  ) {
    return null
  }

  return values.flatMap((entry) => {
    if (entry.state !== 'selected' || typeof entry.value !== 'string') return [entry]
    const parts = splitJoinedSeries(entry.value)
    if (!parts) return [entry]
    return parts.map((value) => ({ ...entry, value }))
  })
}

/**
 * Atomic serializes multi-value facets as `f-field=C-5,R-20` (literal comma).
 * Copied URLs and URLSearchParams encode that comma as `%2C`, and Atomic then
 * treats `C-5,R-20` as a single facet value — zero results, stale counts.
 * Rewrite the hash to a raw comma before the URL manager runs.
 */
export const normalizeCompatibleRobotsHash = (): void => {
  const raw = window.location.hash.slice(1)
  if (!raw) return

  const encoded = new URLSearchParams(raw).get(SERIES_HASH_KEY)
  if (!encoded) return
  const parts = splitJoinedSeries(encoded)
  if (!parts) return

  const next = raw.replace(
    new RegExp(`${SERIES_HASH_KEY}=[^&]*`),
    `${SERIES_HASH_KEY}=${parts.map((value) => encodeURIComponent(value)).join(',')}`
  )
  if (next === raw) return

  history.replaceState(
    null,
    document.title,
    `${window.location.pathname}${window.location.search}#${next}`
  )
}

/**
 * If Headless still has a joined `C-5,R-20` selection, expand it on the wire
 * so the Commerce request matches two real series values.
 */
export const expandJoinedCompatibleRobots = <T extends { body?: BodyInit | null }>(
  request: T,
  clientOrigin: string
): T => {
  if (clientOrigin !== 'commerceApiFetch') return request
  if (typeof request.body !== 'string' || request.body.length === 0) return request

  let parsed: unknown
  try {
    parsed = JSON.parse(request.body)
  } catch {
    return request
  }

  if (!isCommerceSearchBody(parsed) || !Array.isArray(parsed.facets)) return request

  let changed = false
  parsed.facets = parsed.facets.map((facet) => {
    if (!isSeriesFacet(facet) || !Array.isArray(facet.values)) return facet
    const values = expandJoinedSeriesValues(facet.values)
    if (!values) return facet
    changed = true
    return { ...facet, values }
  })

  if (!changed) return request
  return { ...request, body: JSON.stringify(parsed) }
}
