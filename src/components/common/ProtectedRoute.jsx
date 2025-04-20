import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(CartContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;