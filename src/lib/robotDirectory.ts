import type { Product } from '@coveo/headless/commerce'
import { isRobot, robotSeriesIdentity } from './catalog'
import {
  configurationStore,
  MAX_SELECTED_ROBOTS,
  type ConfigurationAnchor,
} from './configurationStore'
import { getCapturedCommerceSearch } from '../engine'

const bySeries = new Map<string, ConfigurationAnchor>()
const inflight = new Map<string, Promise<ConfigurationAnchor | null>>()
let catalogPromise: Promise<void> | null = null

export const toAnchor = (product: Product): ConfigurationAnchor => ({
  permanentid: product.permanentid,
  name: product.ec_name ?? 'Selected robot',
  series: robotSeriesIdentity(product),
  clickUri: product.clickUri,
  imageUrl: product.ec_thumbnails?.[0],
})

const remember = (anchor: ConfigurationAnchor) => {
  if (!anchor.permanentid) return
  for (const series of anchor.series) {
    const current = bySeries.get(series)
    if (!current || current.permanentid.startsWith('series:')) {
      bySeries.set(series, anchor)
    }
  }
}

export const registerRobot = (product: Product) => {
  if (!isRobot(product)) return
  remember(toAnchor(product))
}

export const robotForSeries = (series: string): ConfigurationAnchor | undefined =>
  bySeries.get(series)

const placeholder = (series: string): ConfigurationAnchor => ({
  permanentid: `series:${series}`,
  name: `${series} series`,
  series: [series],
  clickUri: '',
})

const isProduct = (value: unknown): value is Product =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Product).permanentid === 'string'

const parseProducts = (payload: unknown): Product[] => {
  if (typeof payload !== 'object' || payload === null) return []
  const products = (payload as { products?: unknown }).products
  if (!Array.isArray(products)) return []
  return products.filter(isProduct)
}

const robotsCategoryFacet = () => ({
  facetId: 'ec_category',
  field: 'ec_category',
  type: 'hierarchical' as const,
  numberOfValues: 1,
  isFieldExpanded: false,
  preventAutoSelect: true,
  initialNumberOfValues: 10,
  delimitingCharacter: '|',
  values: [
    {
      children: [],
      state: 'selected' as const,
      value: 'Robots',
      retrieveCount: 10,
    },
  ],
})

const searchRobots = async (query: string, page: number, perPage: number): Promise<Product[]> => {
  const captured = getCapturedCommerceSearch()
  if (!captured) return []

  const context =
    captured.template.context &&
    typeof captured.template.context === 'object' &&
    !Array.isArray(captured.template.context)
      ? (captured.template.context as Record<string, unknown>)
      : {}

  const body = {
    ...captured.template,
    query,
    page,
    perPage,
    facets: [robotsCategoryFacet()],
    context: {
      ...context,
      capture: false,
      source: ['robomotion-ui'],
    },
  }

  const response = await fetch(captured.url, {
    method: 'POST',
    headers: {
      ...captured.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) return []
  return parseProducts(await response.json())
}

const pickRobotForSeries = (products: Product[], series: string): ConfigurationAnchor | null => {
  const robots = products.filter(isRobot).map(toAnchor)
  robots.forEach(remember)
  return (
    robots.find((robot) => robot.series.includes(series)) ??
    robots.find((robot) => robot.name.includes(series)) ??
    null
  )
}

const fetchRobotForSeries = async (series: string): Promise<ConfigurationAnchor | null> => {
  const cached = robotForSeries(series)
  if (cached && !cached.permanentid.startsWith('series:')) return cached

  const pending = inflight.get(series)
  if (pending) return pending

  const request = (async () => {
    try {
      const products = await searchRobots(series, 0, 12)
      return pickRobotForSeries(products, series)
    } catch {
      return null
    } finally {
      inflight.delete(series)
    }
  })()

  inflight.set(series, request)
  return request
}

/** Load the robot catalogue once so facet-selected series can show name + thumbnail. */
export const ensureRobotCatalog = async (): Promise<void> => {
  if (bySeries.size >= 8) return
  if (catalogPromise) return catalogPromise

  catalogPromise = (async () => {
    try {
      if (!getCapturedCommerceSearch()) {
        catalogPromise = null
        return
      }
      const pageSize = 48
      const first = await searchRobots('', 0, pageSize)
      first.filter(isRobot).forEach(registerRobot)
      if (first.length >= pageSize && bySeries.size < 8) {
        const second = await searchRobots('', 1, pageSize)
        second.filter(isRobot).forEach(registerRobot)
      }
    } catch {
      catalogPromise = null
    }
  })()

  return catalogPromise
}

const isPlaceholder = (anchor: ConfigurationAnchor): boolean =>
  anchor.permanentid.startsWith('series:')

/**
 * One pinned robot per Compatible Robots value. Prefer a real robot the buyer
 * already chose over a series placeholder so the pin bar, checkboxes, and
 * `f-compatible_robot_series` hash stay 1:1.
 */
export const reconcileAnchorsWithSeries = (series: string[]): void => {
  if (series.length === 0) {
    configurationStore.clearAnchors()
    return
  }

  const existing = configurationStore.getSnapshot().anchors
  const usedIds = new Set<string>()
  const next: ConfigurationAnchor[] = []
  const missing: string[] = []

  for (const value of series) {
    if (next.length >= MAX_SELECTED_ROBOTS) break

    const chosen = existing.find(
      (anchor) =>
        !usedIds.has(anchor.permanentid) &&
        !isPlaceholder(anchor) &&
        anchor.series.includes(value)
    )
    if (chosen) {
      next.push(chosen)
      usedIds.add(chosen.permanentid)
      continue
    }

    const known = robotForSeries(value)
    if (known && !isPlaceholder(known) && !usedIds.has(known.permanentid)) {
      next.push(known)
      usedIds.add(known.permanentid)
      continue
    }

    next.push(placeholder(value))
    missing.push(value)
  }

  configurationStore.setAnchors(next)

  if (missing.length === 0) return

  void (async () => {
    await ensureRobotCatalog()
    const catalogLoaded = bySeries.size > 0
    for (const value of missing) {
      const robot = robotForSeries(value) ?? (catalogLoaded ? await fetchRobotForSeries(value) : null)
      if (!robot) continue
      const current = configurationStore.getSnapshot().anchors
      const placeholderId = `series:${value}`
      if (!current.some((anchor) => anchor.permanentid === placeholderId)) continue
      const without = current.filter((anchor) => anchor.permanentid !== placeholderId)
      if (without.some((anchor) => anchor.permanentid === robot.permanentid)) {
        configurationStore.setAnchors(without)
        continue
      }
      configurationStore.setAnchors([...without, robot])
    }
  })()
}
