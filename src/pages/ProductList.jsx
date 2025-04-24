import React from 'react'
import { useEffect, useState } from 'react'
import { fetchAllProducts } from '../api/products'
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'
import { useSearchFilter } from '../hooks/useSearchFilter'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
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

  const { search, setSearch, filteredData: filteredProducts } = useSearchFilter(
    products,
    ['brand', 'model']
  )

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          placeholder="Buscar por Marca o Modelo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#fff',
            borderRadius: 1,
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0,0,0,0.12)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(13,161,154,0.6)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(13,161,154,0.9)',
                borderWidth: '2px',
              },
            },
            '& input': {
              fontSize: '0.95rem',
            },
          }}
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
            justifyContent: filteredProducts.length === 1 ? 'center' : 'flex-start',
          }}
        >
          {filteredProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                flex: '1 1 calc(25% - 16px)',
                maxWidth: 'calc(25% - 16px)',
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
    </Box>
  )
}
