import { useState, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Register() {
  const { register } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registrarse
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
        <Typography>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Register;