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

  if (!isAuthenticated) {
    // Login ke baad wapas isi page par lana hai
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check (optional)
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Wrong role — apne dashboard par bhejo
    if (user?.role === 'worker') {
      return <Navigate to="/worker/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;