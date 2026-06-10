// src/components/Auth/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log(user);

  if (!isAuthenticated) {
    // Login ke baad wapas isi page par lana hai
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check (optional)
  const hasRoleAccess =
    !allowedRoles ||
    allowedRoles.includes(user?.role) ||
    (user?.role[0] === 'both' && allowedRoles.some((role) => ['user', 'worker'].includes(role)));

  if (!hasRoleAccess) {
    // Wrong role — apne dashboard par bhejo
    if (user?.role === 'worker') {
      return <Navigate to="/worker/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
