import { buildSearchEngine, type SearchEngine } from '@coveo/headless'
import { buildCommerceEngine, type CommerceEngine } from '@coveo/headless/commerce'
import { expandJoinedCompatibleRobots } from './lib/seriesFacetMatch'

const ORG_ID = import.meta.env.VITE_COVEO_ORG_ID ?? 'robomotionindustriesp0bp5xin'
const TRACKING_ID = import.meta.env.VITE_COVEO_TRACKING_ID ?? 'robomotion'
const API_KEY = import.meta.env.VITE_COVEO_API_KEY

export const AGENT_ID =
  import.meta.env.VITE_COVEO_AGENT_ID ?? '5c358d04-3cf2-4885-84d3-39f4aec8dd48'
export const ORGANIZATION_ID = ORG_ID

export type CapturedCommerceSearch = {
  url: string
  headers: Record<string, string>
  template: Record<string, unknown>
}

let capturedCommerceSearch: CapturedCommerceSearch | null = null

export const getCapturedCommerceSearch = (): CapturedCommerceSearch | null =>
  capturedCommerceSearch

const SKIP_CAPTURED_HEADERS = new Set(['content-length', 'content-type'])

const captureCommerceSearch = (request: {
  url?: string
  headers?: HeadersInit
  body?: BodyInit | null
}) => {
  if (typeof request.url !== 'string' || !request.url.includes('/commerce/v2/search')) return

  const template = parseRequestTemplate(request.body)
  if (!template) return

  const headers: Record<string, string> = {}
  const assign = (key: string, value: string) => {
    if (SKIP_CAPTURED_HEADERS.has(key.toLowerCase())) return
    headers[key] = value
  }

  const raw = request.headers
  if (raw instanceof Headers) {
    raw.forEach((value, key) => assign(key, value))
  } else if (Array.isArray(raw)) {
    for (const [key, value] of raw) assign(key, value)
  } else if (raw && typeof raw === 'object') {
    for (const [key, value] of Object.entries(raw)) {
      if (typeof value === 'string') assign(key, value)
    }
  }

  const alreadyCaptured = capturedCommerceSearch !== null
  capturedCommerceSearch = { url: request.url, headers, template }
  if (!alreadyCaptured) {
    void import('./lib/robotDirectory').then((mod) => {
      void mod.ensureRobotCatalog()
    })
  }
}

const parseRequestTemplate = (body: BodyInit | null | undefined): Record<string, unknown> | null => {
  if (typeof body === 'string') {
    try {
      const parsed: unknown = JSON.parse(body)
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>
      }
    } catch {
      return null
    }
    return null
  }

  if (
    body &&
    typeof body === 'object' &&
    !(body instanceof Blob) &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof ArrayBuffer) &&
    !ArrayBuffer.isView(body) &&
    !(typeof ReadableStream !== 'undefined' && body instanceof ReadableStream)
  ) {
    return { ...(body as unknown as Record<string, unknown>) }
  }

  return null
}

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
      preprocessRequest: (request, clientOrigin) => {
        captureCommerceSearch(request)
        return expandJoinedCompatibleRobots(request, clientOrigin)
      },
    },
  })

  return engine
}

/**
 * Direct KGAS probes that sent `pipeline` or `locale` came back NOT_ANSWERED.
 * Headless still attaches those on the Search API; strip them from agent calls
 * so follow-up fields (conversation id, etc.) are left intact.
 */
const stripAgentRequestGotchas = <T extends { url: string; body?: BodyInit | null }>(
  request: T
): T => {
  if (!request.url.includes('/agents/') || !request.url.includes('/answer')) {
    return request
  }
  if (typeof request.body !== 'string') return request

  try {
    const body = JSON.parse(request.body) as Record<string, unknown>
    delete body.pipeline
    delete body.locale
    return { ...request, body: JSON.stringify(body) }
  } catch {
    return request
  }
}

let knowledgeEngine: SearchEngine | null = null

/**
 * Sidecar Search API engine on the default pipeline. Atomic Commerce cannot
 * host `atomic-generated-answer`; the Search Agent lives here instead.
 */
export function getKnowledgeEngine(): SearchEngine {
  if (knowledgeEngine) {
    return knowledgeEngine
  }

  if (!API_KEY) {
    throw new MissingApiKeyError(
      'VITE_COVEO_API_KEY is not set. Copy .env.example to .env and add the key from the assessment brief.'
    )
  }

  knowledgeEngine = buildSearchEngine({
    configuration: {
      organizationId: ORG_ID,
      accessToken: API_KEY,
      analytics: { trackingId: TRACKING_ID },
      search: { pipeline: 'default' },
      preprocessRequest: (request) => stripAgentRequestGotchas(request),
    },
  })

  return knowledgeEngine
}
