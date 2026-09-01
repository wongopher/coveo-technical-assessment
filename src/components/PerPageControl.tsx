import { useEffect, useState } from 'react'
import { DEFAULT_PAGE_SIZE, getSearch, PAGE_SIZE_OPTIONS } from '../lib/search'

/** Page-size dropdown for the product grid, wired to Headless pagination. */
export function PerPageControl() {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)

  useEffect(() => {
    const search = getSearch()
    const pagination = search.pagination({ options: { pageSize: DEFAULT_PAGE_SIZE } })
    setPageSize(pagination.state.pageSize || DEFAULT_PAGE_SIZE)

    return search.subscribe(() => {
      setPageSize(pagination.state.pageSize)
    })
  }, [])

  const onChange = (value: string) => {
    const size = Number(value)
    if (!(PAGE_SIZE_OPTIONS as readonly number[]).includes(size)) return
    setPageSize(size)
    getSearch().pagination().setPageSize(size)
  }

  return (
    <div className="sort">
      <label htmlFor="per-page-select">Per page</label>
      <select
        id="per-page-select"
        value={pageSize}
        onChange={(event) => onChange(event.target.value)}
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  )
}
