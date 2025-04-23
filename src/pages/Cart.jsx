import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Button,
    Divider,
    Paper,
  } from '@mui/material'
  import DeleteIcon from '@mui/icons-material/Delete'
  import { Add, Remove } from '@mui/icons-material'
  import { useCart } from '../context/CartContext'
  import { useNavigate } from 'react-router-dom'
  
  export default function Cart() {
    const { cartItems, removeItem, clearCart, incrementItem, decrementItem } = useCart()
    const navigate = useNavigate()
  
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  
    return (
      <Box sx={{ px: 4, py: 4, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Carrito de Compras
        </Typography>
  
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            {cartItems.length === 0 ? (
              <Typography variant="body1">Tu carrito está vacío.</Typography>
            ) : (
              cartItems.map((item) => (
                <Card
                  key={item.timestamp}
                  sx={{
                    display: 'flex',
                    mb: 3,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: 4, borderColor: '#ccc' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      image={item.imgUrl}
                      alt={item.model}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'contain',
                        mr: 2,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    <CardContent sx={{ px: 0 }}>
                      <Typography
                        variant="subtitle1"
                        onClick={() => navigate(`/product/${item.id}`)}
                        sx={{ cursor: 'pointer', fontWeight: 500 }}
                      >
                        {item.brand} {item.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Precio unidad: {item.price} € × {item.quantity}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        Subtotal: {(item.price * item.quantity).toFixed(2)} €
                      </Typography>
                      <Typography variant="body2">
                        Color: {item.colorName}, Almacenamiento: {item.storageName}
                      </Typography>
  
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            decrementItem(item.timestamp)
                          }}
                        >
                          <Remove />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            incrementItem(item.timestamp)
                          }}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
  
                  <IconButton
                    onClick={() => removeItem(item.timestamp)}
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))
            )}
          </Box>
  
          {cartItems.length > 0 && (
            <Paper elevation={2} sx={{ p: 3, minWidth: 320, height: 'fit-content' }}>
              <Typography variant="h6" gutterBottom>
                Resumen del pedido
              </Typography>
              <Typography variant="body1">Productos: {totalItems}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                Total: {totalPrice.toFixed(2)} €
              </Typography>
  
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => alert('Implementar proceso de pago')}
              >
                PROCEDER AL PAGO
              </Button>
  
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={clearCart}
              >
                VACIAR CARRITO
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    )
  }
  