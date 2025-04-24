import { api } from '@/api/apiClient'

describe('api client configuration', () => {
  it('should have the correct base URL', () => {
    expect(api.defaults.baseURL).toBe('https://itx-frontend-test.onrender.com/api')
  })

  it('should have a timeout of 10000 ms', () => {
    expect(api.defaults.timeout).toBe(10000)
  })

  it('should set Content-Type header to application/json', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })
})
