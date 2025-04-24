import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    brand: 'Samsung',
    model: 'Galaxy S21',
    price: '999 €',
    imgUrl: 'https://example.com/phone.jpg',
  }

  const mockOnClick = jest.fn()

  it('renders brand, model, price and image', () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />)

    expect(screen.getByText(/Samsung/i)).toBeInTheDocument()
    expect(screen.getByText(/Galaxy S21/i)).toBeInTheDocument()
    expect(screen.getByText(/999 €/i)).toBeInTheDocument()

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', mockProduct.imgUrl)
    expect(image).toHaveAttribute('alt', mockProduct.model)
  })

  it('calls onClick when card is clicked', () => {
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />)

    const card = screen.getByRole('button')
    fireEvent.click(card)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
