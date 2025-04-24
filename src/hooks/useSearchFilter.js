import { useMemo, useState } from 'react'

export function useSearchFilter(data = [], keys = []) {
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    const lowerSearch = search.toLowerCase()
    return data.filter(item =>
      keys.some(key =>
        String(item[key]).toLowerCase().includes(lowerSearch)
      )
    )
  }, [search, data, keys])

  return { search, setSearch, filteredData }
}
