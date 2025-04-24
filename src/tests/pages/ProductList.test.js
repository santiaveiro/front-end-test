import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ProductList from '@/pages/ProductList'
import { BrowserRouter } from 'react-router-dom'
import * as api from '@/api/products'

jest.mock('@/api/products')
jest.mock('@/hooks/useSearchFilter', () => ({
  useSearchFilter: (data) => ({
    search: '',
    setSearch: jest.fn(),
    filteredData: data,
  }),
}))

const mockProducts = [
  { id: '1', brand: 'Apple', model: 'iPhone 13', price: '1000', imgUrl: 'iphone.jpg' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S21', price: '800', imgUrl: 'samsung.jpg' },
]

describe('ProductList Page', () => {
  beforeEach(() => {
    api.fetchAllProducts.mockResolvedValue(mockProducts)
  })

  it('should render loading initially and then display products', async () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )

    expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/iPhone 13/i)).toBeInTheDocument()
      expect(screen.getByText(/Galaxy S21/i)).toBeInTheDocument()
    })
  })

  it('should render the search input', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    )

    const input = screen.getByPlaceholderText(/Buscar por Marca o Modelo/i)
    expect(input).toBeInTheDocument()
  })
})
