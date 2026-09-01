import { useSyncExternalStore } from 'react'
import type { Product } from '@coveo/headless/commerce'

/**
 * Atomic mounts every product card in its own React root, so cards cannot read
 * React context from the page. This module-level store is shared across roots
 * and read through useSyncExternalStore.
 */

export const MAX_SELECTED_ROBOTS = 3

export interface ConfigurationAnchor {
  permanentid: string
  name: string
  series: string[]
  clickUri: string
  imageUrl?: string
}

export interface ConfigurationState {
  anchors: ConfigurationAnchor[]
  shortlist: Product[]
}

let state: ConfigurationState = { anchors: [], shortlist: [] }
const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((listener) => listener())
}

const setState = (next: ConfigurationState) => {
  state = next
  emit()
}

const anchorsEqual = (a: ConfigurationAnchor[], b: ConfigurationAnchor[]): boolean =>
  a.length === b.length && a.every((anchor, index) => anchor.permanentid === b[index]?.permanentid)

export const uniqueSeries = (anchors: ConfigurationAnchor[]): string[] => [
  ...new Set(anchors.flatMap((anchor) => anchor.series)),
]

export const configurationStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(): ConfigurationState {
    return state
  },
  setAnchors(anchors: ConfigurationAnchor[]) {
    const next = anchors.slice(0, MAX_SELECTED_ROBOTS)
    if (anchorsEqual(state.anchors, next)) return
    setState({ ...state, anchors: next })
  },
  addAnchor(anchor: ConfigurationAnchor) {
    if (state.anchors.some((entry) => entry.permanentid === anchor.permanentid)) return
    if (state.anchors.length >= MAX_SELECTED_ROBOTS) return
    setState({ ...state, anchors: [...state.anchors, anchor] })
  },
  removeAnchor(permanentid: string) {
    if (!state.anchors.some((entry) => entry.permanentid === permanentid)) return
    setState({
      ...state,
      anchors: state.anchors.filter((entry) => entry.permanentid !== permanentid),
    })
  },
  clearAnchors() {
    if (state.anchors.length === 0) return
    setState({ ...state, anchors: [] })
  },
  toggleShortlist(product: Product) {
    const exists = state.shortlist.some((item) => item.permanentid === product.permanentid)
    if (exists) {
      setState({
        ...state,
        shortlist: state.shortlist.filter((item) => item.permanentid !== product.permanentid),
      })
      return
    }
    setState({ ...state, shortlist: [...state.shortlist, product] })
  },
  removeFromShortlist(permanentid: string) {
    setState({
      ...state,
      shortlist: state.shortlist.filter((item) => item.permanentid !== permanentid),
    })
  },
  clearShortlist() {
    setState({ ...state, shortlist: [] })
  },
}

export const useConfigurationState = (): ConfigurationState =>
  useSyncExternalStore(
    configurationStore.subscribe,
    configurationStore.getSnapshot,
    configurationStore.getSnapshot
  )

export const isShortlisted = (
  state: ConfigurationState,
  permanentid: string
): boolean => state.shortlist.some((item) => item.permanentid === permanentid)

export const isAnchored = (
  state: ConfigurationState,
  permanentid: string
): boolean => state.anchors.some((anchor) => anchor.permanentid === permanentid)
