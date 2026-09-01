import type { ConfigurationAnchor } from '../lib/configurationStore'

/**
 * Selected robot identity — thumbnail + name — used in the filter bar and
 * the Your parts panel so one or many robots read the same way.
 */
export function SelectedRobots({
  robots,
  compact = false,
  seriesFilter,
}: {
  robots: ConfigurationAnchor[]
  compact?: boolean
  /** When set, only these series codes are shown — keeps the pin bar aligned with the facet. */
  seriesFilter?: string[]
}) {
  if (robots.length === 0) return null

  return (
    <ul className={`selected-robots${compact ? ' selected-robots--compact' : ''}`}>
      {robots.map((robot) => {
        const series = seriesFilter?.length
          ? robot.series.filter((value) => seriesFilter.includes(value))
          : robot.series
        return (
        <li key={robot.permanentid} className="selected-robots__item">
          {robot.imageUrl ? (
            <img
              className="selected-robots__thumb"
              src={robot.imageUrl}
              alt=""
              width={compact ? 40 : 48}
              height={compact ? 40 : 48}
            />
          ) : (
            <span className="selected-robots__thumb selected-robots__thumb--empty" aria-hidden="true" />
          )}
          <span className="selected-robots__copy">
            <span className="selected-robots__label">Parts for {robot.name}</span>
            {series.length > 0 && (
              <span className="selected-robots__series">{series.join(' · ')}</span>
            )}
          </span>
        </li>
        )
      })}
    </ul>
  )
}
