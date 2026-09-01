import { buildCommerceEngine, type CommerceEngine } from '@coveo/headless/commerce'
import { expandJoinedCompatibleRobots } from './lib/seriesFacetMatch'

const ORG_ID = import.meta.env.VITE_COVEO_ORG_ID ?? 'robomotionindustriesp0bp5xin'
const TRACKING_ID = import.meta.env.VITE_COVEO_TRACKING_ID ?? 'robomotion'
const API_KEY = import.meta.env.VITE_COVEO_API_KEY

export const AGENT_ID =
  import.meta.env.VITE_COVEO_AGENT_ID ?? '5c358d04-3cf2-4885-84d3-39f4aec8dd48'
export const ORGANIZATION_ID = ORG_ID

export class MissingApiKeyError extends Error {}

let engine: CommerceEngine | null = null

export function getEngine(): CommerceEngine {
  if (engine) {
    return engine
  }

  if (!API_KEY) {
    throw new MissingApiKeyError(
      'VITE_COVEO_API_KEY is not set. Copy .env.example to .env and add the key from the assessment brief.'
    )
  }

  engine = buildCommerceEngine({
    configuration: {
      organizationId: ORG_ID,
      accessToken: API_KEY,
      analytics: { trackingId: TRACKING_ID },
      context: {
        language: 'en',
        country: 'GB',
        currency: 'GBP',
        view: { url: 'https://robomotion.com/search' },
      },
      preprocessRequest: (request, clientOrigin) =>
        expandJoinedCompatibleRobots(request, clientOrigin),
    },
  })

  return engine
}
