import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, clearError } from '../../../Redux/Slice/authSlice';
import './LoginForm.css';

const GoogleIcon = () => (
  <svg className="login-social__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const { loading } = useSelector((state) => state.auth);

  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: '', password: '', remember: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) {
      e.identifier = 'Email or phone number is required.';
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identifier);
      const isPhone = /^[6-9]\d{9}$/.test(form.identifier.replace(/\s/g, ''));
      if (!isEmail && !isPhone)
        e.identifier = 'Enter a valid email address or 10-digit mobile number.';
    }
    if (!form.password)
      e.password = 'Password is required.';
    else if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const result = await dispatch(loginUser({
      identifier: form.identifier.trim().toLowerCase(),
      password: form.password,
      remember: form.remember,
      role,
    }));

    if (loginUser.fulfilled.match(result)) {
      toast.success(`Welcome back! You're logged in successfully. 🎉`);
      navigate(from, { replace: true });
    } else {
      // result.payload = error message from rejectWithValue
      toast.error(result.payload || 'Login failed. Please try again.');
    }
  };

  return (
    <section className="login-form-section">
      <div className="login-form-wrap">

        <div className="login-header">
          <h2 className="login-header__heading">Welcome Back!</h2>
          <p className="login-header__sub">Welcome back! Please enter your details.</p>
        </div>

        <div className="login-toggle">
          <button type="button"
            className={`login-toggle__btn${role === 'user' ? ' login-toggle__btn--active' : ''}`}
            onClick={() => setRole('user')}>User</button>
          <button type="button"
            className={`login-toggle__btn${role === 'worker' ? ' login-toggle__btn--active' : ''}`}
            onClick={() => setRole('worker')}>Worker</button>
        </div>

        {/* ✅ Removed inline error div — toast handles it now */}

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          <div className="login-field">
            <label className="login-label" htmlFor="identifier">Email or Phone Number</label>
            <div className="login-input-wrap">
              <span className="material-symbols-outlined login-input-icon">mail</span>
              <input
                id="identifier" name="identifier" type="text"
                placeholder="name@example.com" autoComplete="username"
                className={`login-input${errors.identifier ? ' login-input--error' : ''}`}
                value={form.identifier} onChange={handleChange}
              />
            </div>
            {errors.identifier && <span className="login-error">{errors.identifier}</span>}
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label" htmlFor="password">Password</label>
              <a className="login-forgot" href="#">Forgot Password?</a>
            </div>
            <div className="login-input-wrap">
              <span className="material-symbols-outlined login-input-icon">lock</span>
              <input
                id="password" name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••" autoComplete="current-password"
                className={`login-input login-input--padright${errors.password ? ' login-input--error' : ''}`}
                value={form.password} onChange={handleChange}
              />
              <button type="button" className="login-input-toggle"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {errors.password && <span className="login-error">{errors.password}</span>}
          </div>

          <label className="login-remember">
            <input type="checkbox" name="remember" className="login-checkbox"
              checked={form.remember} onChange={handleChange} />
            <span className="login-remember__text">Remember me for 30 days</span>
          </label>

          <div className="login-security-note">
            <span className="material-symbols-outlined login-security-note__icon">verified_user</span>
            <p>Your session is secured with 256-bit SSL encryption.</p>
          </div>

          <button type="submit"
            className={`login-btn${loading ? ' login-btn--loading' : ''}`}
            disabled={loading}>
            {loading ? (
              <><span className="login-btn__spinner" />Signing In…</>
            ) : 'Sign In'}
          </button>

          <p className="login-signup">
            Don't have an account?{' '}
            <a className="login-link" href="/registration">Sign Up Here</a>
          </p>

        </form>
      </div>
    </section>
  );
}