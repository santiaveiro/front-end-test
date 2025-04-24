import { fetchAllProducts, fetchProductById, addToCart } from '@/api/products'
import { api } from '@/api/apiClient'
import * as cache from '@/utils/cache'

jest.mock('@/api/apiClient')
jest.mock('@/utils/cache')

describe('products API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchAllProducts', () => {
    it('should return cached products if available', async () => {
      const mockCached = [{ id: 1, model: 'Galaxy' }]
      cache.getCache.mockReturnValue(mockCached)

      const result = await fetchAllProducts()
      expect(result).toEqual(mockCached)
      expect(api.get).not.toHaveBeenCalled()
    })

    it('should fetch and cache products if not cached', async () => {
      const mockFetched = [{ id: 2, model: 'iPhone' }]
      cache.getCache.mockReturnValue(null)
      api.get.mockResolvedValue({ data: mockFetched })

      const result = await fetchAllProducts()
      expect(result).toEqual(mockFetched)
      expect(api.get).toHaveBeenCalledWith('/product')
      expect(cache.setCache).toHaveBeenCalledWith('cachedProducts', mockFetched)
    })
  })

  describe('fetchProductById', () => {
    it('should fetch product by ID', async () => {
      const mockProduct = { id: 1, model: 'Pixel' }
      api.get.mockResolvedValue({ data: mockProduct })

      const result = await fetchProductById(1)
      expect(result).toEqual(mockProduct)
      expect(api.get).toHaveBeenCalledWith('/product/1')
    })
  })

  describe('addToCart', () => {
    it('should call API to add product to cart', async () => {
      const mockResponse = { count: 1 }
      api.post.mockResolvedValue({ data: mockResponse })

      const result = await addToCart({ id: '1', colorCode: 'red', storageCode: '64' })
      expect(result).toEqual(mockResponse)
      expect(api.post).toHaveBeenCalledWith('/cart', {
        id: '1',
        colorCode: 'red',
        storageCode: '64'
      })
    })
  })
})
