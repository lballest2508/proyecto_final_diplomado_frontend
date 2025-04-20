import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { getProductById } from '../services/api';
import { CartContext } from '../context/CartContext';

function Product() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await getProductById(id);
        setProduct(foundProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
      setQuantity(1);
      // Show success notification
      setSnackbar({
        open: true,
        message: 'Producto añadido al carrito correctamente',
        severity: 'success',
      });
    } else {
      // Show error notification if something goes wrong
      setSnackbar({
        open: true,
        message: 'Por favor, selecciona una cantidad válida',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Producto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <TextField
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            inputProps={{ min: 1 }}
            sx={{ width: 100, mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ mb: 2, ml: 2 }}
          >
            Agregar al Carrito
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Product;
