import { useContext, useState } from 'react';
import {
  Container,
  Typography,
  List,
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import CartItem from '../components/cart/CartItem';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../services/api';

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    generateWhatsAppMessage,
    user,
  } = useContext(CartContext);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(1);
  const [couponMessage, setCouponMessage] = useState('');

  const handleApplyCoupon = () => {
    const discountFactor = applyCoupon(coupon);
    if (discountFactor < 1) {
      setDiscount(discountFactor);
      setCouponMessage('¡Cupón aplicado con éxito!');
    } else {
      setDiscount(1);
      setCouponMessage('Cupón inválido');
    }
  };

  const handleCheckout = async () => {
    try {
      await createOrder({
        userId: user.uid,
        products: cart,
        total: calculateTotal(discount),
      });
      // Opcional: Limpiar carrito tras crear el pedido
      // setCart([]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Carrito
        </Typography>
        <Typography>
          Por favor, inicia sesión para ver tu carrito.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito
      </Typography>
      {cart.length === 0 ? (
        <Typography>Tu carrito está vacío.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </List>
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Código de cupón"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              sx={{ mr: 2, width: 200 }}
            />
            <Button variant="outlined" onClick={handleApplyCoupon}>
              Aplicar Cupón
            </Button>
            {couponMessage && (
              <Alert
                severity={discount < 1 ? 'success' : 'error'}
                sx={{ mt: 2 }}
              >
                {couponMessage}
              </Alert>
            )}
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${calculateTotal(discount).toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href={`https://wa.me/+573043453080?text=${generateWhatsAppMessage(
              discount
            )}`}
            target="_blank"
            sx={{ mt: 2 }}
            onClick={handleCheckout}
          >
            Comprar por WhatsApp
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;