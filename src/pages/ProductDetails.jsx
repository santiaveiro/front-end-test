import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardMedia,
  CircularProgress,
} from '@mui/material'
import { fetchProductById } from '../api/products'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [color, setColor] = useState('')
  const [storage, setStorage] = useState('')
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProductById(id)
        setProduct(data)
        if (data.options?.colors?.length > 0) setColor(data.options.colors[0].code)
        if (data.options?.storages?.length > 0) setStorage(data.options.storages[0].code)
      } catch (err) {
        console.error('Error loading product details', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleAddToCart = async () => {
    try {
      await addToCart({ id: product.id, colorCode: color, storageCode: storage })
    } catch (error) {
      console.error('Error adding product to cart', error)
    }
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <CircularProgress />
        <Typography variant="subtitle1" mt={2}>Cargando producto...</Typography>
      </Box>
    )
  }

  if (!product) return <Typography variant="h6">Producto no encontrado</Typography>

  return (
    <Box sx={{ p: 3, maxWidth: '960px', mx: 'auto' }}>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          marginBottom: '1.5rem',
          display: 'inline-block',
          color: '#5e2ca5',
        }}
      >
        ← Volver al listado
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: 'flex-start',
        }}
      >
        {/* Imagen */}
        <Box sx={{ flexBasis: '40%', maxWidth: 360 }}>
          <Card sx={{ p: 1 }}>
            <CardMedia
              component="img"
              image={product.imgUrl}
              alt={product.model}
              sx={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto',
                maxHeight: 280,
              }}
            />
          </Card>
        </Box>

        {/* Detalles + Acciones */}
        <Box sx={{ flexBasis: '60%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              {product.brand} {product.model}
            </Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              {product.price} €
            </Typography>

            <Typography variant="subtitle2" fontWeight={500} gutterBottom>
              Descripción:
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>CPU: {product.cpu}</li>
              <li>RAM: {product.ram}</li>
              <li>Sistema Operativo: {product.os}</li>
              <li>Pantalla: {product.displayResolution}</li>
              <li>Batería: {product.battery}</li>
              <li>Cámaras: {product.primaryCamera} / {product.secondaryCamera}</li>
              <li>Dimensiones: {product.dimentions}</li>
              <li>Peso: {product.weight}</li>
            </ul>
          </Card>

          <Card sx={{ p: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Color</InputLabel>
              <Select value={color} label="Color" onChange={(e) => setColor(e.target.value)}>
                {product.options?.colors?.map((c) => (
                  <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Almacenamiento</InputLabel>
              <Select value={storage} label="Almacenamiento" onChange={(e) => setStorage(e.target.value)}>
                {product.options?.storages?.map((s) => (
                  <MenuItem key={s.code} value={s.code}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddToCart}
              disabled={!color || !storage}
            >
              AÑADIR AL CARRITO
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
