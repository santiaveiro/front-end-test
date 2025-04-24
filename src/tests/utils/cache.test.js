import { setCache, getCache } from '@/utils/cache'

describe('cache utility', () => {
  const key = 'testKey'
  const value = { name: 'Test' }

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01T00:00:00Z'))
  })

  it('should store data in localStorage with timestamp', () => {
    setCache(key, value)
    const stored = JSON.parse(localStorage.getItem(key))
    expect(stored).toHaveProperty('data', value)
    expect(typeof stored.timestamp).toBe('number')
  })

  it('should retrieve data if not expired', () => {
    const payload = {
      data: value,
      timestamp: Date.now(),
    }
    localStorage.setItem(key, JSON.stringify(payload))
    const result = getCache(key)
    expect(result).toEqual(value)
  })

  it('should return null if no item exists', () => {
    const result = getCache('nonexistent')
    expect(result).toBeNull()
  })

  it('should return null if data is expired', () => {
    const payload = {
      data: value,
      timestamp: Date.now() - 61 * 60 * 1000, // expired by 1 minute
    }
    localStorage.setItem(key, JSON.stringify(payload))
    const result = getCache(key)
    expect(result).toBeNull()
  })

  it('should return null on malformed JSON', () => {
    localStorage.setItem(key, '{bad-json')
    const result = getCache(key)
    expect(result).toBeNull()
  })
})
