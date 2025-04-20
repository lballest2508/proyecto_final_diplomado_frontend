import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import ProductList from '../components/product/ProductList';
import { getProducts, getCategories } from '../services/api';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(['Todas', ...categoriesData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product, quantity) => {
    setSnackbar({
      open: true,
      message: `Producto añadido al carrito correctamente`,
      severity: 'success',
    });
    console.log(`Producto añadido al carrito: ${product.name}, Cantidad: ${quantity}`);
    
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Filtrar productos por categoría y búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todas' || !selectedCategory
        ? true
        : product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tienda
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          select
          label="Categoría"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Buscar productos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Box>
      {loading ? (
        <ProductList
          products={[]}
          loading={true}
          onAddToCart={handleAddToCart}
        />
      ) : filteredProducts.length > 0 ? (
        <ProductList
          products={filteredProducts}
          loading={false}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <Typography>No se encontraron productos.</Typography>
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

export default Shop;
