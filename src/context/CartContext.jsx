import { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyCoupon = (coupon) => {
    if (coupon === 'DESCUENTO10') {
      return 0.9;
    }
    return 1;
  };

  const calculateTotal = (discount = 1) => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) * discount;
  };

  const generateWhatsAppMessage = (discount = 1) => {
    const message = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} - $${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');
    const total = calculateTotal(discount);
    return encodeURIComponent(
      `Hola, quiero comprar:\n${message}\nTotal: $${total.toFixed(2)}`
    );
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  };

  const register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Error al registrarse: ' + error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Mock para verificar si el usuario es administrador
  const isAdmin = () => {
    // Más adelante, usa Firebase custom claims o una base de datos
    return user && user.email === 'test@test.com';
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        calculateTotal,
        generateWhatsAppMessage,
        user,
        login,
        register,
        logout,
        loading,
        isAdmin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};