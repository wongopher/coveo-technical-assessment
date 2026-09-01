import { useEffect } from 'react'
import { getSearch } from '../lib/search'

/** Registers Headless listeners (filter persistence, clear-to-submit) on mount. */
export function SearchBootstrap() {
  useEffect(() => {
    getSearch()
  }, [])
  return null
}
