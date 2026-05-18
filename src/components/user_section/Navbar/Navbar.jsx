// src/components/user_section/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Redux/Slice/authSlice';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropRef = useRef(null);

    // Redux auth state
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
        setProfileOpen(false);
    }, [location]);

    // Close profile dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        return parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : parts[0][0].toUpperCase();
    };

    const handleLogout = () => {
        dispatch(logout());
        setProfileOpen(false);
        navigate('/login', { replace: true });
    };

    // ── Profile Avatar + Dropdown ──
    const ProfileDropdown = () => (
        <div className="navbar__profile-wrap" ref={dropRef}>
            <button
                className={`navbar__avatar-btn ${profileOpen ? 'navbar__avatar-btn--open' : ''}`}
                onClick={() => setProfileOpen((p) => !p)}
                aria-label="Open profile menu"
            >
                <span className="navbar__avatar">{getInitials(user?.fullName)}</span>
                <div className="navbar__avatar-info">
                    <span className="navbar__avatar-name">{user?.fullName?.split(' ')[0] || 'User'}</span>
                    <span className="navbar__avatar-role">User</span>
                </div>
                <span className="material-symbols-outlined navbar__avatar-caret">
                    {profileOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {profileOpen && (
                <div className="navbar__dropdown">
                    {/* User info header */}
                    <div className="navbar__dropdown-header">
                        <span className="navbar__dropdown-avatar">{getInitials(user?.fullName)}</span>
                        <div>
                            <p className="navbar__dropdown-name">{user?.fullName || 'User'}</p>
                            <p className="navbar__dropdown-email">{user?.email || ''}</p>
                        </div>
                    </div>

                    <div className="navbar__dropdown-divider" />

                    {/* Menu items */}
                    <Link to="/profile" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">account_circle</span>
                        <span>My Profile</span>
                    </Link>
                    <Link to="/bookings/current" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">pending_actions</span>
                        <span>Current Booking</span>
                    </Link>
                    <Link to="/bookings/past" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">history</span>
                        <span>Past Bookings</span>
                    </Link>
                    <Link to="/help" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">help_center</span>
                        <span>Help Center</span>
                    </Link>

                    <div className="navbar__dropdown-divider" />

                    <button className="navbar__dropdown-item navbar__dropdown-item--logout" onClick={handleLogout}>
                        <span className="material-symbols-outlined">logout</span>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                {/* Logo */}
                <div className="navbar__logo">
                    <Link to="/" className="navbar__logo-icon">H</Link>
                    <Link to="/" className="navbar__logo-text">HelperLoc</Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="navbar__links">
                    <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>Home</Link>
                    <Link to="/how-it-works" className={`navbar__link ${isActive('/how-it-works') ? 'navbar__link--active' : ''}`}>How it Works</Link>
                    <Link to="/about-us" className={`navbar__link ${isActive('/about-us') ? 'navbar__link--active' : ''}`}>About</Link>
                    <Link to="/contact-us" className={`navbar__link ${isActive('/contact-us') ? 'navbar__link--active' : ''}`}>Contact</Link>
                </div>

                {/* Search */}
                <div className="navbar__search">
                    <span className="material-symbols-outlined navbar__search-icon">search</span>
                    <input type="text" placeholder="Search services..." className="navbar__search-input" />
                </div>
                <div className='navbar__login'>
                    {/* CTA — Login/Signup OR Profile */}
                    <div className="navbar__actions">
                        {isAuthenticated ? (
                            <ProfileDropdown />
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="navbar__btn navbar__btn--outline navbar-login">Login</button>
                                </Link>
                                <Link to="/registration">
                                    <button className="navbar__btn navbar__btn--filled">Sign Up</button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="navbar__mobile-menu">
                    <Link to="/" className={`navbar__mobile-link ${isActive('/') ? 'navbar__mobile-link--active' : ''}`}>Home</Link>
                    <Link to="/how-it-works" className={`navbar__mobile-link ${isActive('/how-it-works') ? 'navbar__mobile-link--active' : ''}`}>How it Works</Link>
                    <Link to="/about-us" className={`navbar__mobile-link ${isActive('/about-us') ? 'navbar__mobile-link--active' : ''}`}>About</Link>
                    <Link to="/contact-us" className={`navbar__mobile-link ${isActive('/contact-us') ? 'navbar__mobile-link--active' : ''}`}>Contact</Link>

                    {isAuthenticated ? (
                        /* Mobile — logged in */
                        <div className="navbar__mobile-profile">
                            <div className="navbar__mobile-profile-header">
                                <span className="navbar__avatar navbar__avatar--mobile">{getInitials(user?.fullName)}</span>
                                <div>
                                    <p className="navbar__dropdown-name">{user?.fullName}</p>
                                    <p className="navbar__dropdown-email">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Mobile — not logged in */
                        <div className="navbar__mobile-actions">
                            <Link to="/login"><button className="navbar__btn navbar__btn--outline">Login</button></Link>
                            <Link to="/registration"><button className="navbar__btn navbar__btn--filled">Sign Up</button></Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;