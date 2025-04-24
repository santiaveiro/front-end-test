import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { addToCart as apiAddToCart } from '../api/products'

const LOCAL_STORAGE_ITEMS = 'cartItems'
const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_ITEMS)
    return stored ? JSON.parse(stored) : []
  })

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ITEMS, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = async (itemData) => {
    const {
      id, colorCode, storageCode, model, brand, imgUrl, price,
      colorName, storageName, cpu, ram, os, displayResolution,
      battery, primaryCamera, secondaryCamera, dimentions, weight
    } = itemData

    try {
      await apiAddToCart({ id, colorCode, storageCode })

      setCartItems((prev) => {
        const existing = prev.find(item =>
          item.id === id &&
          item.colorCode === colorCode &&
          item.storageCode === storageCode
        )

        if (existing) {
          return prev.map(item =>
            item.id === id &&
            item.colorCode === colorCode &&
            item.storageCode === storageCode
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }

        return [
          ...prev,
          {
            id,
            colorCode,
            storageCode,
            model,
            brand,
            imgUrl,
            price,
            colorName,
            storageName,
            cpu,
            ram,
            os,
            displayResolution,
            battery,
            primaryCamera,
            secondaryCamera,
            dimentions,
            weight,
            quantity: 1,
            timestamp: Date.now()
          }
        ]
      })
    } catch (err) {
      console.error('[CartContext] Error adding item to cart:', err)
    }
  }

  const incrementItem = (timestamp) => {
    setCartItems(prev =>
      prev.map(item =>
        item.timestamp === timestamp ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrementItem = (timestamp) => {
    setCartItems(prev =>
      prev.flatMap(item => {
        if (item.timestamp !== timestamp) return [item]
        if (item.quantity <= 1) return []
        return [{ ...item, quantity: item.quantity - 1 }]
      })
    )
  }

  const removeItem = (timestamp) => {
    setCartItems((prev) => prev.filter((item) => item.timestamp !== timestamp))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(LOCAL_STORAGE_ITEMS)
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        addToCart,
        removeItem,
        clearCart,
        incrementItem,
        decrementItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export { CartContext }
