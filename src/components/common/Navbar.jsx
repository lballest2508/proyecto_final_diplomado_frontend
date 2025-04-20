import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function Navbar() {
  const { user, logout, loading } = useContext(CartContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tienda Online
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/shop">
          Tienda
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Carrito
        </Button>
        {loading ? (
          <Typography>Cargando...</Typography>
        ) : user ? (
          <Button color="inherit" onClick={logout}>
            Cerrar Sesión
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Iniciar Sesión
          </Button>
        )}
        <Button color="inherit" component={Link} to="/admin">
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;