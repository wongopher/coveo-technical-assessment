import type { Product } from '@coveo/headless/commerce'
import {
  AtomicProductImage,
  AtomicProductLink,
  AtomicProductRating,
} from '@coveo/atomic-react/commerce'
import {
  categoryLeaf,
  formatPrice,
  isRobot,
  robotSeriesIdentity,
  specChips,
  topCategory,
} from '../lib/catalog'
import {
  configurationStore,
  isShortlisted,
  useConfigurationState,
} from '../lib/configurationStore'
import { useHighlightSeries } from '../lib/hooks'
import { clearRobotFilter, selectSeries } from '../lib/search'
import { CARD_CSS } from './cardCss'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const config = useConfigurationState()
  const highlightSeries = useHighlightSeries()
  const robot = isRobot(product)
  const series = robotSeriesIdentity(product)
  const chips = specChips(product)
  const shortlisted = isShortlisted(config, product.permanentid)

  const anchored = config.anchor?.permanentid === product.permanentid
  const fitsAnchor =
    config.anchor && !robot
      ? series.some((entry) => config.anchor?.series.includes(entry))
      : false

  const startConfiguration = () => {
    if (series.length) {
      selectSeries(series)
    }
    configurationStore.setAnchor({
      permanentid: product.permanentid,
      name: product.ec_name ?? 'Selected robot',
      series,
      clickUri: product.clickUri,
      imageUrl: product.ec_thumbnails?.[0],
    })
  }

  return (
    <article className={`card${robot ? ' card--robot' : ''}`}>
      <style>{CARD_CSS}</style>

      <div className="card__media">
        <AtomicProductImage field="ec_thumbnails" />
      </div>

      <div className="card__body">
        <p className="card__eyebrow">
          {topCategory(product)}
          {robot ? '' : ` · ${categoryLeaf(product)}`}
        </p>

        <h3 className="card__title">
          <AtomicProductLink />
        </h3>

        {product.ec_shortdesc && <p className="card__desc">{product.ec_shortdesc}</p>}

        {chips.length > 0 && (
          <dl className="chips">
            {chips.map((chip) => (
              <div className="chip" key={chip.label}>
                <dt>{chip.label}</dt>
                <dd>{chip.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {series.length > 0 && (
          <p className="card__fitment">
            <span className="card__fitment-label">
              {robot ? 'Series' : 'Fits'}
            </span>
            {series.map((entry) => (
              <span
                key={entry}
                className={`pill${
                  !robot && highlightSeries.includes(entry) ? ' pill--match' : ''
                }`}
              >
                {entry}
              </span>
            ))}
          </p>
        )}

        {fitsAnchor && (
          <p className="card__reason">Fits your {config.anchor?.name}</p>
        )}

        <div className="card__meta">
          <span className="card__price">{formatPrice(product.ec_price)}</span>
          <AtomicProductRating field="ec_rating" />
        </div>

        <div className="card__actions">
          {robot ? (
            <button
              type="button"
              className={`btn${anchored ? ' btn--active' : ' btn--primary'}`}
              onClick={anchored ? clearRobotFilter : startConfiguration}
            >
              {anchored ? 'Parts for this robot' : 'Find parts for this'}
            </button>
          ) : null}

          <button
            type="button"
            className={`btn${shortlisted ? ' btn--active' : ''}`}
            onClick={() => configurationStore.toggleShortlist(product)}
          >
            {shortlisted ? 'In your parts' : 'Add to your parts'}
          </button>
        </div>
      </div>
    </article>
  )
}
