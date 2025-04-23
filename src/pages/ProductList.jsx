import { useEffect, useState } from 'react'
import { fetchAllProducts } from '../api/products'
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllProducts()
        setProducts(data)
      } catch (err) {
        console.error('Error loading products', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredProducts = products.filter((product) =>
    `${product.brand} ${product.model}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          placeholder="Buscar por Marca o Modelo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: '100%', maxWidth: 400 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <CircularProgress />
          <Typography variant="subtitle1" mt={2}>Cargando productos...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
          }}
        >
          {filteredProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                flex: '1 1 calc(25% - 16px)', // 25% - gap to maintain 4 columns
                boxSizing: 'border-box',
              }}
            >
              <ProductCard
                product={product}
                onClick={() => navigate(`/product/${product.id}`)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  )
}
