const EXPIRATION_TIME = 60 * 60 * 1000 

export function setCache(key, data) {
  try {
    const payload = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(key, JSON.stringify(payload))
  } catch (err) {
    console.error('[CACHE] Error saving to localStorage', err)
  }
}

export function getCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null

    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > EXPIRATION_TIME) return null
    return data
  } catch (err) {
    console.error('[CACHE] Error reading from localStorage', err)
    return null
  }
}
