import { useSyncExternalStore } from 'react'
import { configurationStore } from './configurationStore'
import { robotFilterStore, type PinnedRobotFilter } from './robotFilter'
import { getActiveSeries, getSearch, isRobotJourneyActive, selectedSeries } from './search'

const subscribeToSearch = (onChange: () => void) => getSearch().subscribe(onChange)

const subscribeToRobotJourney = (onChange: () => void) => {
  const unsubSearch = subscribeToSearch(onChange)
  const unsubFilter = robotFilterStore.subscribe(onChange)
  const unsubConfig = configurationStore.subscribe(onChange)
  return () => {
    unsubSearch()
    unsubFilter()
    unsubConfig()
  }
}

/**
 * Selected fitment values, joined so the snapshot stays referentially stable
 * across renders (useSyncExternalStore compares by identity).
 */
const seriesSnapshot = () => selectedSeries().join(',')

const activeSeriesSnapshot = () => getActiveSeries().join(',')

const subscribeToHighlightSeries = (onChange: () => void) => {
  const unsubFilter = robotFilterStore.subscribe(onChange)
  const unsubConfig = configurationStore.subscribe(onChange)
  return () => {
    unsubFilter()
    unsubConfig()
  }
}

/** Pinned / anchor series only — avoids subscribing every product card to search. */
const highlightSeriesSnapshot = (): string => {
  const pinned = robotFilterStore.getSnapshot()
  if (pinned.series.length > 0) return pinned.series.join(',')
  return configurationStore.getSnapshot().anchor?.series.join(',') ?? ''
}

const robotJourneySnapshot = () => (isRobotJourneyActive() ? '1' : '')

export const useSelectedSeries = (): string[] => {
  const joined = useSyncExternalStore(subscribeToSearch, seriesSnapshot, seriesSnapshot)
  return joined ? joined.split(',') : []
}

/** Facet selection when present; otherwise pinned / anchor series. */
export const useActiveSeries = (): string[] => {
  const joined = useSyncExternalStore(
    subscribeToRobotJourney,
    activeSeriesSnapshot,
    activeSeriesSnapshot
  )
  return joined ? joined.split(',') : []
}

/** For per-card fitment highlighting — same source as getPinnedSeries, no search sub. */
export const useHighlightSeries = (): string[] => {
  const joined = useSyncExternalStore(
    subscribeToHighlightSeries,
    highlightSeriesSnapshot,
    highlightSeriesSnapshot
  )
  return joined ? joined.split(',') : []
}

export const useRobotJourneyActive = (): boolean =>
  useSyncExternalStore(subscribeToRobotJourney, robotJourneySnapshot, robotJourneySnapshot) ===
  '1'

export const useRobotFilter = (): PinnedRobotFilter =>
  useSyncExternalStore(
    robotFilterStore.subscribe,
    robotFilterStore.getSnapshot,
    robotFilterStore.getSnapshot
  )
