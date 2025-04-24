import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes/AppRoutes'

jest.mock('@/pages/ProductList', () => () => <div>Mock ProductList</div>)
jest.mock('@/pages/ProductDetails', () => () => <div>Mock ProductDetails</div>)
jest.mock('@/pages/Cart', () => () => <div>Mock Cart</div>)

describe('AppRoutes', () => {
  it('renders ProductList on default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('Mock ProductList')).toBeInTheDocument()
  })

  it('renders ProductDetails on route "/product/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/product/123']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('Mock ProductDetails')).toBeInTheDocument()
  })

  it('renders Cart on route "/cart"', () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('Mock Cart')).toBeInTheDocument()
  })
})
