import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ProductDetails from '@/pages/ProductDetails'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import * as api from '@/api/products'
import { CartProvider } from '@/context/CartContext'

jest.mock('@/api/products')

const mockProduct = {
  id: '1',
  brand: 'TestBrand',
  model: 'ModelX',
  price: '999',
  imgUrl: 'test.jpg',
  cpu: 'Octa-core',
  ram: '8GB',
  os: 'TestOS',
  displayResolution: '1080x2400',
  battery: '4000mAh',
  primaryCamera: '12MP',
  secondaryCamera: '8MP',
  dimentions: '150x70x8mm',
  weight: '170g',
  options: {
    colors: [{ code: 'red', name: 'Red' }],
    storages: [{ code: '64', name: '64GB' }]
  }
}

describe('ProductDetails Page', () => {
  beforeEach(() => {
    api.fetchProductById.mockResolvedValue(mockProduct)
  })

  it('renders and displays product details', async () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/Cargando producto/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/TestBrand ModelX/i)).toBeInTheDocument()
      expect(screen.getByText(/Descripción/i)).toBeInTheDocument()
    })
  })
})
