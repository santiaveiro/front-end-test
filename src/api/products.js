import { api } from './apiClient'
import { getCache, setCache } from '../utils/cache'

const PRODUCTS_KEY = 'cachedProducts'

export async function fetchAllProducts() {
  const cached = getCache(PRODUCTS_KEY)
  if (cached) return cached

  try {
    const { data } = await api.get('/product')
    if (Array.isArray(data)) setCache(PRODUCTS_KEY, data)
    return data
  } catch (error) {
    console.error('[API] Failed to fetch product list:', error)
    throw error
  }
}

export async function fetchProductById(id) {
  try {
    const { data } = await api.get(`/product/${id}`)
    return data
  } catch (error) {
    console.error(`[API] Failed to fetch product ${id}:`, error)
    throw error
  }
}

export async function addToCart({ id, colorCode, storageCode }) {
  try {
    const { data } = await api.post('/cart', {
      id,
      colorCode,
      storageCode,
    })
    return data
  } catch (error) {
    console.error('[API] Failed to add to cart:', error)
    throw error
  }
}
