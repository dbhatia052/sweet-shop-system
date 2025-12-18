import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'ADMIN') {
        return <Navigate to="/" />;
      }
    } catch (e) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;