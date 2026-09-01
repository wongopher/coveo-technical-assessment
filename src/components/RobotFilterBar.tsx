import { useLayoutEffect, useRef } from 'react'
import { formatSeriesList } from '../lib/catalog'
import { MAX_SELECTED_ROBOTS, useConfigurationState } from '../lib/configurationStore'
import { useActiveSeries, useRobotFilter } from '../lib/hooks'
import { browseRobots, clearRobotFilter } from '../lib/search'
import { SelectedRobots } from './SelectedRobots'

type RobotFilterPlacement = 'mobile' | 'sidebar'

/**
 * Sticky robot context beside the search header. Empty state offers an
 * optional shortcut to pick a robot; search and facets stay the main path.
 * Once a journey is active it summarises the filter.
 *
 * Rendered twice: a compact bar on small screens, and a card in the facet
 * column (above Category, beside the search header) on desktop.
 */
export function RobotFilterBar({ placement }: { placement: RobotFilterPlacement }) {
  const { anchors } = useConfigurationState()
  const pinned = useRobotFilter()
  const activeSeries = useActiveSeries()
  const cardRef = useRef<HTMLDivElement>(null)
  const empty = anchors.length === 0 && !pinned.browseRobots && activeSeries.length === 0

  useLayoutEffect(() => {
    if (placement !== 'sidebar') return
    const card = cardRef.current
    const header = document.querySelector('atomic-layout-section[section="search"]')
    if (!card || !(header instanceof HTMLElement)) return

    const syncHeight = () => {
      if (getComputedStyle(card).display === 'none') {
        card.style.removeProperty('height')
        return
      }
      if (anchors.length > 1) {
        card.style.removeProperty('height')
        return
      }
      card.style.height = `${Math.round(header.getBoundingClientRect().height)}px`
    }

    const observer = new ResizeObserver(syncHeight)
    observer.observe(header)
    syncHeight()
    return () => {
      observer.disconnect()
      card.style.removeProperty('height')
    }
  }, [placement, empty, anchors.length])

  let title = 'Have a specific robot?'
  let detail = 'Choose your machine to only show compatible parts.'

  if (anchors.length > 0) {
    title =
      anchors.length === 1
        ? `Parts for ${anchors[0].name}`
        : `Parts for ${anchors.length} robots`
    detail =
      anchors.length >= MAX_SELECTED_ROBOTS
        ? 'Maximum of 3 robots. Remove one to add another.'
        : activeSeries.length > 0
          ? `Showing parts compatible with ${formatSeriesList(activeSeries)}`
          : 'Select compatible parts for these robots'
  } else if (activeSeries.length > 0) {
    title = 'Filtering by compatible robot'
    detail = `Showing parts that fit ${formatSeriesList(activeSeries)}`
  } else if (pinned.browseRobots) {
    title = 'Browsing robots'
    detail = 'Pick your robot, then search for compatible parts'
  }

  return (
    <div
      ref={cardRef}
      className={`robot-filter-bar robot-filter-bar--${placement}${empty ? ' robot-filter-bar--empty' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="robot-filter-bar__inner">
        <div className="robot-filter-bar__lead" aria-label={title}>
          {anchors.length > 0 ? (
            <SelectedRobots robots={anchors} compact seriesFilter={activeSeries} />
          ) : (
            <div className="robot-filter-bar__copy">
              <span className="robot-filter-bar__label">{title}</span>
              <span className="robot-filter-bar__detail">{detail}</span>
            </div>
          )}
          {anchors.length > 0 && (
            <span className="robot-filter-bar__detail">{detail}</span>
          )}
        </div>
        {empty ? (
          <button type="button" className="btn btn--primary" onClick={browseRobots}>
            Find parts for your robot
          </button>
        ) : (
          <button
            type="button"
            className="robot-filter-bar__clear"
            onClick={clearRobotFilter}
          >
            Remove filter
          </button>
        )}
      </div>
    </div>
  )
}
