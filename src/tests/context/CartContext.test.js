import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import * as productApi from '@/api/products'


describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.cartItems).toEqual([])
    expect(result.current.cartCount).toBe(0)
  })

  it('should add an item to cart', async () => {
    jest.spyOn(productApi, 'addToCart').mockResolvedValue({ count: 1 })

    const { result } = renderHook(() => useCart(), { wrapper })

    await act(async () => {
      await result.current.addToCart({
        id: '1',
        colorCode: 'black',
        storageCode: '64',
        model: 'Galaxy S22',
        brand: 'Samsung',
        imgUrl: 'url',
        price: 999,
        colorName: 'Black',
        storageName: '64GB',
        cpu: 'Exynos',
        ram: '8GB',
        os: 'Android',
        displayResolution: '1080x2400',
        battery: '4000mAh',
        primaryCamera: '50MP',
        secondaryCamera: '10MP',
        dimentions: '146x70x7.6 mm',
        weight: '167g'
      })
    })

    expect(result.current.cartItems.length).toBe(1)
    expect(result.current.cartCount).toBe(1)
  })

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.clearCart()
    })
    expect(result.current.cartItems).toEqual([])
    expect(result.current.cartCount).toBe(0)
  })
})
