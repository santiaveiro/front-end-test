import { createContext, useContext, useEffect, useState } from 'react'
import { addToCart as apiAddToCart } from '../api/products'

const LOCAL_STORAGE_KEY = 'cartTotalCount'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, cartCount)
  }, [cartCount])

  const addToCart = async ({ id, colorCode, storageCode }) => {
    try {
      const { count } = await apiAddToCart({ id, colorCode, storageCode })
      if (typeof count === 'number') {
        setCartCount(count)
      }
    } catch (err) {
      console.error('[CartContext] Error adding item to cart:', err)
    }
  }

  const clearCart = () => {
    setCartCount(0)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
