// src/components/Auth/RegisterForm/RegisterForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, sendOtp, clearError } from '../../../Redux/Slice/authSlice';
import './RegisterForm.css';

const getStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const strengthMeta = [
  { label: '', color: '' },
  { label: 'Weak', color: '#ba1a1a' },
  { label: 'Fair', color: '#e65100' },
  { label: 'Good', color: '#f9a825' },
  { label: 'Strong', color: '#2e7d32' },
];

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, otpLoading, otpError } = useSelector((state) => state.auth);

  const [role, setRole] = useState('user');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    password: '', confirmPassword: '', otp: '', terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);

  const otpLooksValid = /^\d{4,6}$/.test(form.otp.trim());

  const strength = getStrength(form.password);
  const strengthInfo = strengthMeta[strength];

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'email' && otpSent) {
      setOtpSent(false);
      setForm((prev) => ({ ...prev, email: value, otp: '' }));
      setErrors((prev) => ({ ...prev, email: '', otp: '' }));
      dispatch(clearError());
      return;
    }

    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ── OTP cooldown timer ── */
  const startCooldown = () => {
    setOtpCooldown(60);
    const id = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) { clearInterval(id); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  /* ── Send OTP ── */
  const handleSendOtp = async () => {
    if (!form.email.trim()) {
      setErrors((prev) => ({ ...prev, email: 'Email is required.' }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email address.' }));
      return;
    }

    const result = await dispatch(sendOtp({ email: form.email.trim().toLowerCase() }));

    if (sendOtp.fulfilled.match(result)) {
      setOtpSent(true);
      setForm((prev) => ({ ...prev, otp: '' }));
      startCooldown();
      toast.success(`OTP sent to ${form.email} 📧`);
    } else {
      toast.error(result.payload || 'Failed to send OTP. Please try again.');
    }
  };

  /* ── Validation ── */
  const validate = () => {
    const e = {};

    if (!form.fullName.trim())
      e.fullName = 'Full name is required.';
    else if (form.fullName.trim().length < 3)
      e.fullName = 'Name must be at least 3 characters.';

    if (!form.email.trim())
      e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.';

    // ✅ OTP optional — sirf format validate karo agar filled ho
    if (form.otp.trim() && !/^\d{4,6}$/.test(form.otp.trim()))
      e.otp = 'Enter a valid 4–6 digit OTP.';

    if (!form.phone.trim())
      e.phone = 'Phone number is required.';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian mobile number.';

    if (!form.password)
      e.password = 'Password is required.';
    else if (form.password.length < 8)
      e.password = 'Password must be at least 8 characters.';
    else if (strength < 3)
      e.password = 'Password is too weak. Add uppercase, numbers or symbols.';

    if (!form.confirmPassword)
      e.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';

    if (!form.terms)
      e.terms = 'You must accept the Terms of Service and Privacy Policy.';

    return e;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const result = await dispatch(registerUser({
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: '+91' + form.phone.replace(/\s/g, ''),
      password: form.password,
      role,
      // ✅ otp nahi bhej rahe abhi
    }));

    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created successfully! Welcome 🎉');
      navigate('/', { replace: true });
    } else {
      toast.error(result.payload || 'Registration failed. Please try again.');
    }
  };

  return (
    <section className="register-form-section">
      <div className="register-form-wrap">

        <div className="register-progress">
          <div className="register-progress__top">
            <h2 className="register-progress__heading">Create Your Account</h2>
          </div>
          <div className="register-progress__bar-track">
            <div className="register-progress__bar-fill" />
          </div>
        </div>

        <div className="register-toggle">
          <button type="button"
            className={`register-toggle__btn${role === 'user' ? ' register-toggle__btn--active' : ''}`}
            onClick={() => setRole('user')}>User</button>
          <button type="button"
            className={`register-toggle__btn${role === 'worker' ? ' register-toggle__btn--active' : ''}`}
            onClick={() => setRole('worker')}>Worker</button>
        </div>

        {/* ✅ Removed inline error divs — toast handles it now */}
        {otpError && (
          <div className="register-api-error">
            <span className="material-symbols-outlined">error</span>
            <span>{otpError}</span>
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit} noValidate>

          {/* Full Name */}
          <div className="register-field">
            <label className="register-label" htmlFor="fullName">Full Name</label>
            <div className="register-input-wrap">
              <span className="material-symbols-outlined register-input-icon">person</span>
              <input id="fullName" name="fullName" type="text"
                placeholder="John Doe" autoComplete="name"
                className={`register-input${errors.fullName ? ' register-input--error' : ''}`}
                value={form.fullName} onChange={handleChange} />
            </div>
            {errors.fullName && <span className="register-error">{errors.fullName}</span>}
          </div>

          {/* Email + OTP */}
          <div className="register-field">
            <label className="register-label" htmlFor="email">Email Address</label>
            <div className="register-input-wrap">
              <span className="material-symbols-outlined register-input-icon">mail</span>
              <input id="email" name="email" type="email"
                placeholder="john@example.com" autoComplete="email"
                className={`register-input register-input--with-action${errors.email ? ' register-input--error' : ''}${otpLooksValid ? ' register-input--verified' : ''}`}
                value={form.email} onChange={handleChange} />

              <button type="button"
                className={`register-otp-trigger${otpLooksValid ? ' register-otp-trigger--verified' : ''}${otpLoading ? ' register-otp-trigger--loading' : ''}`}
                onClick={handleSendOtp}
                disabled={otpLoading || otpCooldown > 0 || otpLooksValid}>
                {otpLooksValid ? (
                  <><span className="material-symbols-outlined">verified</span> Verified</>
                ) : otpLoading ? (
                  <span className="register-btn__spinner register-btn__spinner--sm" />
                ) : otpCooldown > 0 ? (
                  <span>{otpCooldown}s</span>
                ) : (
                  <span>{otpSent ? 'Resend OTP' : 'Get OTP'}</span>
                )}
              </button>
            </div>
            {errors.email && <span className="register-error">{errors.email}</span>}

            {otpSent && (
              <div className={`register-otp-box${otpLooksValid ? ' register-otp-box--verified' : ''}`}>
                <p className="register-otp-box__hint">
                  <span className="material-symbols-outlined">mark_email_read</span>
                  OTP sent to <strong>{form.email}</strong>
                </p>
                <div className="register-input-wrap">
                  <span className="material-symbols-outlined register-input-icon">pin</span>
                  <input id="otp" name="otp" type="text"
                    placeholder="Enter OTP (4–6 digits)"
                    inputMode="numeric" maxLength={6} autoComplete="one-time-code"
                    className={`register-input${errors.otp ? ' register-input--error' : ''}${otpLooksValid ? ' register-input--verified' : ''}`}
                    value={form.otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setForm((prev) => ({ ...prev, otp: val }));
                      setErrors((prev) => ({ ...prev, otp: '' }));
                    }} />
                  {otpLooksValid && (
                    <span className="material-symbols-outlined register-otp-verified-badge">check_circle</span>
                  )}
                </div>
                {errors.otp && <span className="register-error">{errors.otp}</span>}
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="register-field">
            <label className="register-label" htmlFor="phone">Phone Number</label>
            <div className="register-phone-row">
              <div className="register-phone-prefix">+91</div>
              <input id="phone" name="phone" type="tel"
                placeholder="98765 43210" autoComplete="tel" maxLength={11}
                className={`register-input register-input--phone${errors.phone ? ' register-input--error' : ''}`}
                value={form.phone} onChange={handleChange} />
            </div>
            {errors.phone && <span className="register-error">{errors.phone}</span>}
          </div>

          {/* Password */}
          <div className="register-field">
            <label className="register-label" htmlFor="password">Create Password</label>
            <div className="register-input-wrap">
              <span className="material-symbols-outlined register-input-icon">lock</span>
              <input id="password" name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••" autoComplete="new-password"
                className={`register-input register-input--padright${errors.password ? ' register-input--error' : ''}`}
                value={form.password} onChange={handleChange} />
              <button type="button" className="register-input-toggle"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {form.password && (
              <>
                <div className="register-strength-bars">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="register-strength-bar"
                      style={{ backgroundColor: i <= strength ? strengthInfo.color : 'var(--color-surface-container-highest)' }} />
                  ))}
                </div>
                <p className="register-strength-label" style={{ color: strengthInfo.color }}>
                  {strengthInfo.label} Password
                </p>
              </>
            )}
            {errors.password && <span className="register-error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="register-field">
            <label className="register-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="register-input-wrap">
              <span className="material-symbols-outlined register-input-icon">lock_reset</span>
              <input id="confirmPassword" name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••" autoComplete="new-password"
                className={`register-input register-input--padright${errors.confirmPassword ? ' register-input--error' : ''}`}
                value={form.confirmPassword} onChange={handleChange} />
              <button type="button" className="register-input-toggle"
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                <span className="material-symbols-outlined">
                  {showConfirm ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {form.confirmPassword && (
              <p className={`register-match-label${form.password === form.confirmPassword ? ' register-match-label--ok' : ' register-match-label--err'}`}>
                <span className="material-symbols-outlined">
                  {form.password === form.confirmPassword ? 'check_circle' : 'cancel'}
                </span>
                {form.password === form.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
            {errors.confirmPassword && <span className="register-error">{errors.confirmPassword}</span>}
          </div>

          {/* Terms */}
          <label className={`register-terms${errors.terms ? ' register-terms--error' : ''}`}>
            <input type="checkbox" name="terms" className="register-checkbox"
              checked={form.terms} onChange={handleChange} />
            <span className="register-terms__text">
              I agree to the{' '}
              <Link className="register-link" to="/terms">Terms of Service</Link>{' '}
              and{' '}
              <Link className="register-link" to="/privacy">Privacy Policy</Link>.
            </span>
          </label>
          {errors.terms && <span className="register-error register-error--terms">{errors.terms}</span>}

          {/* Submit */}
          <button type="submit"
            className={`register-btn${loading ? ' register-btn--loading' : ''}`}
            disabled={loading}>
            {loading ? (
              <><span className="register-btn__spinner" />Creating Account…</>
            ) : (
              <>Create Account<span className="material-symbols-outlined register-btn__arrow">arrow_forward</span></>
            )}
          </button>

          <p className="register-signin">
            Already have an account?{' '}
            <Link className="register-link register-link--bold" to="/login">Sign In Here</Link>
          </p>

        </form>
      </div>
    </section>
  );
}