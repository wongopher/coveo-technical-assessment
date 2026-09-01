import { useLayoutEffect } from 'react'
import {
  AtomicCommerceSearchBox,
  AtomicCommerceSearchBoxQuerySuggestions,
  AtomicCommerceSearchBoxRecentQueries,
} from '@coveo/atomic-react/commerce'
import { useConfigurationState } from '../lib/configurationStore'
import { useActiveSeries, useRobotFilter, useRobotJourneyActive } from '../lib/hooks'
import { runQuery } from '../lib/search'

const SUGGESTED_QUERIES = ['welding arm', 'MIG torch', 'safety scanner', 'harmonic reducer']

const PARTS_QUERIES = ['MIG torch', 'safety scanner', 'harmonic reducer', 'cable harness']

export function HeroSection() {
  const { anchors } = useConfigurationState()
  const pinned = useRobotFilter()
  const activeSeries = useActiveSeries()
  const hasRobotContext = useRobotJourneyActive()

  const suggestedQueries = hasRobotContext ? PARTS_QUERIES : SUGGESTED_QUERIES

  // Keep the Stencil search box mounted. Remounting on robot-context changes
  // re-inits query suggestions and can fire a second Commerce search.
  useLayoutEffect(() => {
    const box = document.querySelector('atomic-commerce-search-box')
    if (box) {
      ;(box as HTMLElement & { clearFilters: boolean }).clearFilters = !hasRobotContext
    }
  }, [hasRobotContext])

  let subcopy: string
  if (anchors.length > 0) {
    subcopy =
      anchors.length === 1
        ? `Search tools, consumables, and spares compatible with ${anchors[0].name}.`
        : `Search tools, consumables, and spares compatible with your ${anchors.length} selected robots.`
  } else if (activeSeries.length > 0) {
    subcopy = `Search parts that fit ${activeSeries.join(', ')}.`
  } else if (pinned.browseRobots) {
    subcopy = 'Choose your robot below, then search for compatible parts.'
  } else {
    subcopy =
      'Search 1,242 robots, tools, and spares. Use the filters, or pick a robot if you already know the series.'
  }

  return (
    <div className="hero">
      <h1 className="hero__title">Find the right parts for your robot</h1>
      <p className="hero__sub">{subcopy}</p>
      <AtomicCommerceSearchBox clearFilters={!hasRobotContext}>
        <AtomicCommerceSearchBoxQuerySuggestions />
        <AtomicCommerceSearchBoxRecentQueries />
      </AtomicCommerceSearchBox>

      <p className="hero__hints">
        <span>Try searching for</span>
        {suggestedQueries.map((query) => (
          <button
            key={query}
            type="button"
            className="hint"
            onClick={() => runQuery(query)}
          >
            {query}
          </button>
        ))}
      </p>
    </div>
  )
}
