import {
  categoryLeaf,
  compatibleJoints,
  formatPrice,
  formatSeriesList,
  robotSeriesIdentity,
  topCategory,
} from '../lib/catalog'
import { configurationStore, useConfigurationState } from '../lib/configurationStore'
import { browseRobots, clearRobotFilter } from '../lib/search'
import { useActiveSeries } from '../lib/hooks'

/**
 * Saved parts list for repair or upgrade: the selected robot context plus
 * line items an integrator or plant engineer would take to procurement.
 */
export function ConfigurationPanel() {
  const { anchors, shortlist } = useConfigurationState()
  const activeSeries = useActiveSeries()

  if (anchors.length === 0 && shortlist.length === 0) {
    return null
  }

  const total = shortlist.reduce((sum, item) => sum + (item.ec_price ?? 0), 0)
  const mismatchLabel =
    activeSeries.length === 1
      ? `Doesn't fit ${activeSeries[0]}`
      : `Doesn't fit any selected robot`

  return (
    <aside className="config-panel" aria-label="Your parts">
      <div className="config-panel__inner">
        <div className="config-panel__head">
          <div>
            <h2 className="config-panel__title">Your parts</h2>
            {anchors.length === 1 ? (
              <p className="config-panel__anchor">
                Parts for <strong>{anchors[0].name}</strong>
                <span className="config-panel__series">{anchors[0].series.join(' · ')}</span>
              </p>
            ) : activeSeries.length > 0 ? (
              <p className="config-panel__anchor">
                Showing parts that fit <strong>{formatSeriesList(activeSeries)}</strong>.{' '}
                <button type="button" className="btn btn--link" onClick={browseRobots}>
                  Pick a specific robot
                </button>{' '}
                to get a parts quote.
              </p>
            ) : (
              <p className="config-panel__anchor config-panel__anchor--empty">
                No robot selected yet.{' '}
                <button type="button" className="btn btn--link" onClick={browseRobots}>
                  Browse robots
                </button>{' '}
                to filter parts by fitment.
              </p>
            )}
          </div>
          <div className="config-panel__head-actions">
            {anchors.length === 1 && (
              <button type="button" className="btn btn--ghost" onClick={clearRobotFilter}>
                Clear robot
              </button>
            )}
            {shortlist.length > 0 && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => configurationStore.clearShortlist()}
              >
                Clear parts list
              </button>
            )}
          </div>
        </div>

        {shortlist.length > 0 && (
          <>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Category</th>
                  <th scope="col">Class / type</th>
                  <th scope="col">Mounts at</th>
                  <th scope="col">Fits</th>
                  <th scope="col">Price</th>
                  <th scope="col"><span className="sr-only">Remove</span></th>
                </tr>
              </thead>
              <tbody>
                {shortlist.map((item) => {
                  const joints = compatibleJoints(item)
                  const itemSeries = robotSeriesIdentity(item)
                  const imageUrl = item.ec_thumbnails?.[0]
                  const incompatible =
                    activeSeries.length > 0 &&
                    !itemSeries.some((entry) => activeSeries.includes(entry))
                  return (
                    <tr
                      key={item.permanentid}
                      className={incompatible ? 'compare__row--mismatch' : undefined}
                    >
                      <th scope="row">
                        <div className="compare__item">
                          {imageUrl ? (
                            <img
                              className="compare__thumb"
                              src={imageUrl}
                              alt=""
                              width={40}
                              height={40}
                            />
                          ) : (
                            <span className="compare__thumb compare__thumb--empty" aria-hidden="true" />
                          )}
                          <div className="compare__item-copy">
                            <a href={item.clickUri} target="_blank" rel="noreferrer">
                              {item.ec_name}
                            </a>
                            {incompatible && (
                              <p className="compare__mismatch">{mismatchLabel}</p>
                            )}
                          </div>
                        </div>
                      </th>
                      <td>{topCategory(item)}</td>
                      <td>{categoryLeaf(item)}</td>
                      <td>{joints.length ? joints.join(', ') : '—'}</td>
                      <td>
                        {itemSeries.length ? (
                          <span className="compare__fits">
                            {itemSeries.map((entry) => (
                              <span
                                key={entry}
                                className={`pill${
                                  activeSeries.includes(entry) ? ' pill--match' : ''
                                }`}
                              >
                                {entry}
                              </span>
                            ))}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{formatPrice(item.ec_price)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn--ghost btn--sm"
                          onClick={() => configurationStore.removeFromShortlist(item.permanentid)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan={5}>
                    Estimated parts total
                  </th>
                  <td colSpan={2}>{formatPrice(total)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="config-panel__cta">
              <button type="button" className="btn btn--primary">
                Request a quote
              </button>
              <button type="button" className="btn">
                Download parts list
              </button>
              <p className="config-panel__note">
                Demo actions. In production these would hand off to CPQ or a
                distributor with your parts list attached.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
