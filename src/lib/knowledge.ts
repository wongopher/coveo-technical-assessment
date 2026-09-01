import { useSyncExternalStore } from 'react'
import { buildSearchBox, type SearchBox } from '@coveo/headless'
import { getKnowledgeEngine } from '../engine'

export type KnowledgeStatus = {
  loading: boolean
  hasAnswer: boolean
  cannotAnswer: boolean
}

let knowledgeBox: SearchBox | null = null
let interfaceReady = false
let pendingQuery: string | null = null
let lastSyncedQuery = ''
let cachedStatus: KnowledgeStatus = { loading: false, hasAnswer: false, cannotAnswer: false }
const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((listener) => listener())
}

const getKnowledgeBox = (): SearchBox => {
  if (!knowledgeBox) {
    knowledgeBox = buildSearchBox(getKnowledgeEngine(), {
      options: { numberOfSuggestions: 0 },
    })
  }
  return knowledgeBox
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

let engineUnsubscribe: (() => void) | null = null
let engineSubscriberCount = 0

const subscribeEngine = (listener: () => void) => {
  listeners.add(listener)
  if (engineSubscriberCount === 0) {
    engineUnsubscribe = getKnowledgeEngine().subscribe(emit)
  }
  engineSubscriberCount += 1
  return () => {
    listeners.delete(listener)
    engineSubscriberCount -= 1
    if (engineSubscriberCount === 0) {
      engineUnsubscribe?.()
      engineUnsubscribe = null
    }
  }
}

const hasQuerySnapshot = () => (lastSyncedQuery.length > 0 ? lastSyncedQuery : '')

const readStatus = (): KnowledgeStatus => {
  const generated = getKnowledgeEngine().state.generatedAnswer
  const loading = Boolean(generated?.isLoading || generated?.isStreaming)
  const hasAnswer = Boolean(generated?.answer)
  const cannotAnswer = Boolean(generated?.cannotAnswer) && !loading
  if (
    cachedStatus.loading === loading &&
    cachedStatus.hasAnswer === hasAnswer &&
    cachedStatus.cannotAnswer === cannotAnswer
  ) {
    return cachedStatus
  }
  cachedStatus = { loading, hasAnswer, cannotAnswer }
  return cachedStatus
}

const submitQuestion = (query: string) => {
  lastSyncedQuery = query
  emit()
  const box = getKnowledgeBox()
  box.updateText(query)
  box.submit()
}

/**
 * Submit a question on the sidecar SearchEngine only. Nothing here writes
 * back to Commerce, so a threaded Agent question cannot clear Compatible Robots.
 */
export const askKnowledgeQuestion = (query: string) => {
  const trimmed = query.trim()
  if (!trimmed) return
  if (readStatus().loading && trimmed === lastSyncedQuery) return

  if (!interfaceReady) {
    pendingQuery = trimmed
    lastSyncedQuery = trimmed
    emit()
    return
  }

  submitQuestion(trimmed)
}

/** AtomicSearchInterface has initialized; flush any query that arrived first. */
export const markKnowledgeInterfaceReady = () => {
  if (interfaceReady) return
  interfaceReady = true
  const queued = pendingQuery
  pendingQuery = null
  if (queued !== null) {
    lastSyncedQuery = ''
    askKnowledgeQuestion(queued)
  }
}

export const useKnowledgeQuery = (): string =>
  useSyncExternalStore(subscribe, hasQuerySnapshot, hasQuerySnapshot)

export const useKnowledgeStatus = (): KnowledgeStatus =>
  useSyncExternalStore(subscribeEngine, readStatus, readStatus)
