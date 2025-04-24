import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '@/components/Header'
import * as CartContext from '@/context/CartContext'

window.scrollTo = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/product/1'
  }),
  useNavigate: () => jest.fn()
}))

describe('Header component', () => {
  beforeEach(() => {
    jest.spyOn(CartContext, 'useCart').mockReturnValue({
      cartCount: 3
    })
  })

  it('renders title and cart count correctly', () => {
    render(<Header />, { wrapper: MemoryRouter })
    expect(screen.getByText('Mobile Store')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('displays breadcrumb for product details', () => {
    render(<Header />, { wrapper: MemoryRouter })
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText('Detalles')).toBeInTheDocument()
  })

  it('calls scrollTo when logo is clicked', () => {
    render(<Header />, { wrapper: MemoryRouter })
    fireEvent.click(screen.getByText('Mobile Store'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
