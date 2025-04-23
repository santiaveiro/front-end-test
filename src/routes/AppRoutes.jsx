import { Routes, Route } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import ProductDetails from '../pages/ProductDetails'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  )
}
