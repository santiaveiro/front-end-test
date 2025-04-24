import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Breadcrumbs,
  Link as MuiLink,
  Box,
  Container,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { cartCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const pathSegments = location.pathname.split('/').filter(Boolean)
  const isHome = pathSegments.length === 0
  const isDetails = pathSegments[0] === 'product' && pathSegments[1]
  const isCart = pathSegments[0] === 'cart'

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate('/')
  }

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        background: 'linear-gradient(90deg, rgba(13,161,154,0.9) 0%, rgba(210,81,25,0.9) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#fff',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '64px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box
              onClick={handleLogoClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
              }}
            >
              <PhoneIphoneIcon sx={{ color: '#fff', fontSize: 26 }} />
              <Typography
                variant="h6"
                onClick={handleLogoClick}
                sx={{
                  textDecoration: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  userSelect: 'none' 
                }}
              >
                Mobile Store
              </Typography>

            </Box>

            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                color: '#fff',
                '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.6)' },
                '& a': {
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 400,
                  '&:hover': { color: '#fff' },
                },
              }}
            >
              <MuiLink component={Link} to="/" underline="hover">
                Productos
              </MuiLink>
              {isDetails && <Typography color="text.primary">Detalles</Typography>}
              {isCart && <Typography color="text.primary">Carrito</Typography>}
              {isHome && <Typography color="text.primary">Actual</Typography>}
            </Breadcrumbs>
          </Box>
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Badge
              badgeContent={cartCount}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: 'rgba(13,161,154,0.9)',
                  color: '#fff',
                  fontWeight: 600,
                },
              }}
            >
              <ShoppingCartIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
