import { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from '../context/CartContext';
import ProductForm from '../components/admin/ProductForm';
import OrderList from '../components/admin/OrderList';
import { getProducts, createProduct, updateProduct, deleteProduct, getOrders } from '../services/api';
import ProtectedRoute from '../components/common/ProtectedRoute';

function Admin() {
  const { user, isAdmin } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, ordersData] = await Promise.all([
          getProducts(),
          getOrders(),
        ]);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSaveProduct = async (product) => {
    try {
      if (product.id && product.id === editingProduct?.id) {
        await updateProduct(product.id, product);
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? product : p))
        );
        setEditingProduct(null);
      } else {
        delete product.id;
        const newProduct = await createProduct(product);
        setProducts((prev) => [...prev, newProduct]);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  if (!isAdmin()) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Acceso denegado. Solo administradores.</Typography>
      </Container>
    );
  }

  return (
    <ProtectedRoute>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Panel de Administración
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Productos" />
          <Tab label="Pedidos" />
        </Tabs>
        {tab === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Gestionar Productos
              </Typography>
              <ProductForm
                product={editingProduct || {}}
                onSave={handleSaveProduct}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Lista de Productos
              </Typography>
              <List>
                {products.map((product) => (
                  <ListItem
                    key={product.id}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={product.name}
                      secondary={`$${product.price} - ${product.category}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
        {tab === 1 && <OrderList orders={orders} />}
      </Container>
    </ProtectedRoute>
  );
}

export default Admin;