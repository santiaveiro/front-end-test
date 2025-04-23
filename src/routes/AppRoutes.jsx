import { Routes, Route } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}
