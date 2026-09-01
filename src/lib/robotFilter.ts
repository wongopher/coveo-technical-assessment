/**
 * Pinned robot journey state. Coveo clears facet selections when the query
 * changes; this store is the source of truth until the buyer removes the filter.
 */

export interface PinnedRobotFilter {
  browseRobots: boolean
  series: string[]
}

let pinned: PinnedRobotFilter = { browseRobots: false, series: [] }
const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((listener) => listener())
}

export const robotFilterStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(): PinnedRobotFilter {
    return pinned
  },
  pinBrowseRobots() {
    pinned = { browseRobots: true, series: [] }
    emit()
  },
  pinSeries(series: string[]) {
    pinned = { browseRobots: false, series: [...series] }
    emit()
  },
  unpinBrowse() {
    if (!pinned.browseRobots) return
    pinned = { ...pinned, browseRobots: false }
    emit()
  },
  unpinSeries() {
    if (pinned.series.length === 0) return
    pinned = { ...pinned, series: [] }
    emit()
  },
  clear() {
    pinned = { browseRobots: false, series: [] }
    emit()
  },
  isActive(): boolean {
    return pinned.browseRobots || pinned.series.length > 0
  },
}
