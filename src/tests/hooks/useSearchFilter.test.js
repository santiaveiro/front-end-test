import { renderHook, act } from '@testing-library/react'
import { useSearchFilter } from '@/hooks/useSearchFilter'

describe('useSearchFilter', () => {
  const mockData = [
    { brand: 'Samsung', model: 'Galaxy S22' },
    { brand: 'Apple', model: 'iPhone 14' },
    { brand: 'Google', model: 'Pixel 7' },
  ]

  it('should return all data when search is empty', () => {
    const { result } = renderHook(() => useSearchFilter(mockData, ['brand', 'model']))
    expect(result.current.filteredData).toEqual(mockData)
  })

  it('should filter data by brand', () => {
    const { result } = renderHook(() => useSearchFilter(mockData, ['brand', 'model']))
    act(() => {
      result.current.setSearch('samsung')
    })
    expect(result.current.filteredData).toEqual([{ brand: 'Samsung', model: 'Galaxy S22' }])
  })

  it('should filter data by model', () => {
    const { result } = renderHook(() => useSearchFilter(mockData, ['brand', 'model']))
    act(() => {
      result.current.setSearch('pixel')
    })
    expect(result.current.filteredData).toEqual([{ brand: 'Google', model: 'Pixel 7' }])
  })

  it('should be case insensitive', () => {
    const { result } = renderHook(() => useSearchFilter(mockData, ['brand', 'model']))
    act(() => {
      result.current.setSearch('IPHONE')
    })
    expect(result.current.filteredData).toEqual([{ brand: 'Apple', model: 'iPhone 14' }])
  })

  it('should return empty array when no match', () => {
    const { result } = renderHook(() => useSearchFilter(mockData, ['brand', 'model']))
    act(() => {
      result.current.setSearch('nokia')
    })
    expect(result.current.filteredData).toEqual([])
  })
})
