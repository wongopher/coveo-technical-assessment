import { useSyncExternalStore } from 'react'
import type { Product } from '@coveo/headless/commerce'

/**
 * Atomic mounts every product card in its own React root, so cards cannot read
 * React context from the page. This module-level store is shared across roots
 * and read through useSyncExternalStore.
 */

export interface ConfigurationAnchor {
  permanentid: string
  name: string
  series: string[]
  clickUri: string
  imageUrl?: string
}

export interface ConfigurationState {
  anchor: ConfigurationAnchor | null
  shortlist: Product[]
}

let state: ConfigurationState = { anchor: null, shortlist: [] }
const listeners = new Set<() => void>()

const emit = () => {
  listeners.forEach((listener) => listener())
}

const setState = (next: ConfigurationState) => {
  state = next
  emit()
}

export const configurationStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(): ConfigurationState {
    return state
  },
  setAnchor(anchor: ConfigurationAnchor | null) {
    setState({ ...state, anchor })
  },
  clearAnchor() {
    setState({ ...state, anchor: null })
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
