import { useEffect, useState } from 'react'
import { getSearch, SORT_OPTIONS } from '../lib/search'

/**
 * Custom sort control.
 *
 * The Commerce response advertises `relevance` as the only available sort, so
 * atomic-commerce-sort-dropdown renders a single useless option. The API does
 * honour explicit field sorts, so these are dispatched directly.
 */
export function SortControl() {
  const [active, setActive] = useState('relevance')

  useEffect(() => {
    const search = getSearch()
    const sort = search.sort()
    const sync = () => {
      const match = SORT_OPTIONS.find((option) => sort.isSortedBy(option.criterion))
      if (match) {
        setActive(match.id)
      }
    }
    sync()
    return search.subscribe(sync)
  }, [])

  const onChange = (id: string) => {
    const option = SORT_OPTIONS.find((entry) => entry.id === id)
    if (!option) return
    setActive(id)
    getSearch().sort().sortBy(option.criterion)
  }

  return (
    <div className="sort">
      <label htmlFor="sort-select">Sort</label>
      <select
        id="sort-select"
        value={active}
        onChange={(event) => onChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
