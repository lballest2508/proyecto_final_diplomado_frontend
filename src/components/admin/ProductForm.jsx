import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';
import { getCategories } from '../../services/api';

function ProductForm({ product = {}, onSave }) {
  const [formData, setFormData] = useState({
    id: product.id || null,
    name: product.name || '',
    price: product.price || '',
    category: product.category || '',
    image: product.image || '',
    description: product.description || '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setFormData({
      id: product.id || null,
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      image: product.image || '',
      description: product.description || '',
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || Date.now(), // Generar ID temporal
      price: parseFloat(formData.price),
    });
    // Reiniciar formulario si es un nuevo producto
    if (!product.id) {
      setFormData({
        id: null,
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">{product.id ? 'Editar Producto' : 'Nuevo Producto'}</Typography>
      <TextField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Precio"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        select
        label="Categoría"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        fullWidth
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="URL de la Imagen"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        {product.id ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  );
}

export default ProductForm;