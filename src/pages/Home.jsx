import { useEffect, useState } from 'react';
import { Alert, Container, Snackbar, Typography } from '@mui/material';
import ProductList from '../components/product/ProductList';
import { getProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Mostrar solo los primeros 3 productos como "destacados"
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleToCart = (product, quantity) => {
    setSnackbar({
      open: true,
      message: `Producto añadido al carrito correctamente`,
      severity: 'success',
    });
    console.log(`Producto añadido al carrito: ${product.name}, Cantidad: ${quantity}`);
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Productos Destacados
      </Typography>
      {products.length > 0 ? (
        <ProductList products={products} onAddToCart={handleToCart} />
      ) : (
        <Typography>Cargando productos...</Typography>
      )}
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

export default Home;