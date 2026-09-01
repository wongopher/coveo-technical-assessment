import type { Product } from '@coveo/headless/commerce'

/**
 * Field helpers for the RoboMotion index.
 *
 * The catalog carries no payload/reach/precision fields. Those numbers exist
 * only in prose, so everything surfaced here is read from structured data:
 * the category hierarchy (whose leaf encodes the payload band) and the
 * fitment fields under additionalFields.
 */

const additional = (product: Product, key: string): string | null => {
  const value = (product.additionalFields as Record<string, unknown> | undefined)?.[key]
  return typeof value === 'string' && value.length > 0 ? value : null
}

const splitList = (value: string | null): string[] =>
  value ? value.split(';').map((entry) => entry.trim()).filter(Boolean) : []

/** Deepest category path, e.g. "Robots|Articulated Robots|Large Articulated (50-200kg)". */
export const categoryPath = (product: Product): string[] => {
  const deepest = product.ec_category?.[product.ec_category.length - 1]
  return deepest ? deepest.split('|') : []
}

/** Top-level category, e.g. "Robots" or "End-of-Arm Tooling". */
export const topCategory = (product: Product): string => categoryPath(product)[0] ?? ''

/**
 * Leaf category. For robots this is the payload band, e.g.
 * "Large Articulated (50-200kg)" — the only structured payload signal in the index.
 */
export const categoryLeaf = (product: Product): string => {
  const path = categoryPath(product)
  return path[path.length - 1] ?? ''
}

export const isRobot = (product: Product): boolean => topCategory(product) === 'Robots'

/** Robot series this product fits, e.g. ["R-20", "R-50", "C-10"]. */
export const compatibleSeries = (product: Product): string[] =>
  splitList(additional(product, 'compatible_robot_series'))

const SERIES_CODE = /\b(R-\d+|C-\d+|S-\d+)\b/g

/**
 * Series identity for a robot listing. Robot products often omit
 * compatible_robot_series but include the code in ec_name (e.g. "NexBot R-20 …").
 */
export const robotSeriesIdentity = (product: Product): string[] => {
  const fromField = compatibleSeries(product)
  if (fromField.length) return fromField
  if (!isRobot(product)) return []

  const name = product.ec_name ?? ''
  const matches = [...name.matchAll(SERIES_CODE)].map((match) => match[0])
  return [...new Set(matches)]
}

/** Robot joints this part mounts to, e.g. ["J6"]. */
export const compatibleJoints = (product: Product): string[] =>
  splitList(additional(product, 'compatible_with_joints'))

export const formatPrice = (value: number | null | undefined): string =>
  typeof value === 'number'
    ? new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
      }).format(value)
    : '—'

/** Conjunction list for selected series, e.g. "R-20 and C-10". */
export const formatSeriesList = (series: string[]): string =>
  series.length <= 2
    ? series.join(' and ')
    : `${series.slice(0, -1).join(', ')}, and ${series[series.length - 1]}`

/**
 * Spec chips for a card. Robots lead with their payload band; parts lead with
 * what they fit, since fitment is the deciding factor when servicing an
 * existing installation.
 */
export const specChips = (product: Product): Array<{ label: string; value: string }> => {
  const chips: Array<{ label: string; value: string }> = []
  const leaf = categoryLeaf(product)
  const joints = compatibleJoints(product)

  if (isRobot(product)) {
    if (leaf) chips.push({ label: 'Class', value: leaf })
  } else {
    if (leaf) chips.push({ label: 'Type', value: leaf })
    if (joints.length) chips.push({ label: 'Mounts at', value: joints.join(', ') })
  }

  if (product.ec_brand) chips.push({ label: 'Line', value: product.ec_brand })

  return chips
}
