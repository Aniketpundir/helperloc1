// src/components/Auth/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute
 * ─────────────────────────────────────────────
 * Sirf logged-in users ko andar jaane deta hai.
 * Agar login nahi hai toh /login par redirect karta hai
 * aur current location save karta hai taaki login ke
 * baad wapas wahi bhej sake.
 *
 * Optional: allowedRoles={['worker']} pass karo
 * role-based access ke liye.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const roles = Array.isArray(user?.roles) && user.roles.length
    ? user.roles
    : user?.role === 'both'
      ? ['user', 'worker']
      : user?.role
        ? [user.role]
        : [];

  if (!isAuthenticated) {
    // Login ke baad wapas isi page par lana hai
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check (optional)
  const hasRoleAccess =
    !allowedRoles ||
    allowedRoles.some((role) => roles.includes(role));

  if (!hasRoleAccess) {
    // Wrong role — apne dashboard par bhejo
    if (roles.includes('worker')) {
      return <Navigate to="/worker/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
