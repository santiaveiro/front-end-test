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
import { Link } from 'react-router-dom'

export default function Header() {
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
            <Typography color="text.primary">Actual</Typography>
          </Breadcrumbs>
        </Box>
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
