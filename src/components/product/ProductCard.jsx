import { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/product/${product.id}`}
          variant="contained"
          color="primary"
        >
          Ver Detalles
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            onAddToCart(product, 1);
            addToCart(product, 1)}}
        >
          Añadir al Carrito
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;