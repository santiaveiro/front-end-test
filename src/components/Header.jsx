import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Breadcrumbs,
  Link as MuiLink,
  Box,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cartCount } = useCart()
  const location = useLocation()

  
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const isHome = pathSegments.length === 0
  const isDetails = pathSegments[0] === 'product' && pathSegments[1]
  const isCart = pathSegments[0] === 'cart'

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '64px',
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}
          >
            Mobile Store
          </Typography>

          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
            <MuiLink component={Link} to="/" color="inherit" underline="hover">
              Productos
            </MuiLink>
            {isDetails && (
              <Typography color="text.primary">Detalles</Typography>
            )}
            {isCart && (
              <Typography color="text.primary">Carrito</Typography>
            )}
            {isHome && (
              <Typography color="text.primary">Actual</Typography>
            )}
          </Breadcrumbs>
        </Box>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
