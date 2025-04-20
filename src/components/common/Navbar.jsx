import { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const { user, logout, loading } = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Tienda', path: '/shop' },
    { text: 'Carrito', path: '/cart' },
    {
      text: user ? 'Cerrar Sesión' : 'Iniciar Sesión',
      path: user ? null : '/login',
      action: user ? logout : null,
    },
    { text: 'Admin', path: '/admin' },
  ];

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={item.path ? Link : 'button'}
            to={item.path}
            onClick={item.action}
            sx={{ color: 'text.primary' }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: { xs: 1, sm: 0 }, fontWeight: 'bold' }}
        >
          Tienda Online
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={item.path ? Link : 'button'}
              to={item.path}
              onClick={item.action}
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawerList}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;