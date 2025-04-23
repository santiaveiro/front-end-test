import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
  } from '@mui/material'
  
  export default function ProductCard({ product, onClick }) {
    return (
      <Card
        sx={{
          height: '100%',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
            borderColor: '#1976d2',
          },
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="160"
            image={product.imgUrl}
            alt={product.model}
            sx={{ objectFit: 'contain', p: 1 }}
          />
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600}>
              {product.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.model}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
  