import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    // Role-based redirect
    if (user?.role === 'worker') {
      return <Navigate to="/worker/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;