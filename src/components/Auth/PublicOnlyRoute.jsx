import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, user, authMode } = useSelector((state) => state.auth);
  const roles = Array.isArray(user?.roles) && user.roles.length
    ? user.roles
    : user?.role === 'both'
      ? ['user', 'worker']
      : user?.role
        ? [user.role]
        : [];

  if (isAuthenticated) {
    // Role-based redirect
    if (authMode === 'worker' && roles.includes('worker')) {
      return <Navigate to="/worker/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
