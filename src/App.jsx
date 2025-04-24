import Header from './components/Header'
import { AppRoutes } from './routes/AppRoutes'
import { Box } from '@mui/material'

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <AppRoutes />
      </Box>
    </Box>
  )
}

export default App
