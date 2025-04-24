import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Cart from '@/pages/Cart'
import { CartContext } from '@/context/CartContext'
import { MemoryRouter } from 'react-router-dom'

const renderWithCart = (cartItems = [], actions = {}) => {
  const defaultActions = {
    removeItem: jest.fn(),
    clearCart: jest.fn(),
    incrementItem: jest.fn(),
    decrementItem: jest.fn(),
  }

  return render(
    <CartContext.Provider value={{ cartItems, ...defaultActions, ...actions }}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartContext.Provider>
  )
}

describe('Cart page', () => {
  it('should show empty message when cart is empty', () => {
    renderWithCart([])
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument()
  })

  it('should render cart items and order summary', () => {
    const mockCartItems = [{
      id: '1',
      brand: 'Samsung',
      model: 'Galaxy S22',
      imgUrl: '/mock.png',
      quantity: 2,
      price: 500,
      colorName: 'Negro',
      storageName: '128GB',
      timestamp: 12345,
    }]

    renderWithCart(mockCartItems)

    expect(screen.getByText(/Samsung Galaxy S22/i)).toBeInTheDocument()
    expect(screen.getByText(/Resumen del pedido/i)).toBeInTheDocument()

    // Usamos getAllByText para evitar ambigüedad y buscar contenido exacto
    const totalElements = screen.getAllByText(/1000.00 €/i)
    const totalElement = totalElements.find(el =>
      el.textContent.toLowerCase().includes('total')
    )
    expect(totalElement).toBeInTheDocument()
  })

  it('should call clearCart on "VACIAR CARRITO" click', () => {
    const clearCart = jest.fn()
    const mockCartItems = [{
      id: '1',
      brand: 'Samsung',
      model: 'Galaxy S22',
      imgUrl: '/mock.png',
      quantity: 1,
      price: 500,
      colorName: 'Negro',
      storageName: '128GB',
      timestamp: 12345,
    }]

    renderWithCart(mockCartItems, { clearCart })
    fireEvent.click(screen.getByText(/VACIAR CARRITO/i))
    expect(clearCart).toHaveBeenCalled()
  })
})
