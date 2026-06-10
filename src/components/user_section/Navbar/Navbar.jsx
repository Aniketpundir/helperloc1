// src/components/user_section/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Redux/Slice/authSlice';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropRef = useRef(null);

    const { isAuthenticated, user, authMode } = useSelector((state) => state.auth);
    const userRoles = Array.isArray(user?.roles) && user.roles.length
        ? user.roles
        : user?.role === 'both'
            ? ['user', 'worker']
            : user?.role
                ? [user.role]
                : [];
    const isWorkerMode = authMode === 'worker' && userRoles.includes('worker');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setProfileOpen(false);
    }, [location]);

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

    const canUseUserChats = isAuthenticated && userRoles.includes('user');

    // ── User Dropdown ──
    const UserDropdown = () => (
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
                    <div className="navbar__dropdown-header">
                        <span className="navbar__dropdown-avatar">{getInitials(user?.fullName)}</span>
                        <div>
                            <p className="navbar__dropdown-name">{user?.fullName || 'User'}</p>
                            <p className="navbar__dropdown-email">{user?.email || ''}</p>
                        </div>
                    </div>

                    <div className="navbar__dropdown-divider" />

                    <Link to="/user-dashboard/user-profile" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">account_circle</span>
                        <span>My Profile</span>
                    </Link>
                    <Link to="/user-dashboard/current-booking" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">pending_actions</span>
                        <span>Current Booking</span>
                    </Link>
                    <Link to="/user-dashboard/past-booking" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">history</span>
                        <span>Past Bookings</span>
                    </Link>
                    <Link to="/user-dashboard/post-work" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">work</span>
                        <span>Post Work</span>
                    </Link>
                    <Link to="/user-dashboard/my-posted-jobs" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">list_alt</span>
                        <span>My Posted Jobs</span>
                    </Link>
                    <Link to="/user-dashboard/recent-chats" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">forum</span>
                        <span>Recent Chats</span>
                    </Link>
                    <Link to="/help-and-support" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">help_center</span>
                        <span>Help & Support</span>
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

    // ── Worker Dropdown ──
    const WorkerDropdown = () => (
        <div className="navbar__profile-wrap" ref={dropRef}>
            <button
                className={`navbar__avatar-btn ${profileOpen ? 'navbar__avatar-btn--open' : ''}`}
                onClick={() => setProfileOpen((p) => !p)}
                aria-label="Open worker menu"
            >
                <span className="navbar__avatar navbar__avatar--worker">{getInitials(user?.fullName)}</span>
                <div className="navbar__avatar-info">
                    <span className="navbar__avatar-name">{user?.fullName?.split(' ')[0] || 'Worker'}</span>
                    <span className="navbar__avatar-role">Worker</span>
                </div>
                <span className="material-symbols-outlined navbar__avatar-caret">
                    {profileOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {profileOpen && (
                <div className="navbar__dropdown">
                    <div className="navbar__dropdown-header navbar__dropdown-header--worker">
                        <span className="navbar__dropdown-avatar navbar__dropdown-avatar--worker">{getInitials(user?.fullName)}</span>
                        <div>
                            <p className="navbar__dropdown-name">{user?.fullName || 'Worker'}</p>
                            <p className="navbar__dropdown-email">{user?.email || ''}</p>
                        </div>
                    </div>

                    <div className="navbar__dropdown-divider" />

                    <Link to="/worker/dashboard" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span>Worker Dashboard</span>
                    </Link>
                    <Link to="/worker/profile" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">account_circle</span>
                        <span>Worker Profile</span>
                    </Link>
                    <Link to="/worker/booking-request" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">pending_actions</span>
                        <span>Booking Requests</span>
                    </Link>
                    <Link to="/worker/completed-work" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">task_alt</span>
                        <span>Completed Projects</span>
                    </Link>
                    <Link to="/worker/available-work" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">work_outline</span>
                        <span>Available Work</span>
                    </Link>
                    <Link to="/worker/applied-work" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">assignment_turned_in</span>
                        <span>Applied Work</span>
                    </Link>
                    <Link to="/worker/recent-chats" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">forum</span>
                        <span>Recent Chats</span>
                    </Link>
                    <Link to="/worker/client-review" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">star_rate</span>
                        <span>Client Reviews</span>
                    </Link>

                    <Link to="/help-and-support" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                        <span className="material-symbols-outlined">help_center</span>
                        <span>Help & Support</span>
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

                <div className="navbar__logo">
                    <Link to="/" className="navbar__logo-icon">H</Link>
                    <Link to="/" className="navbar__logo-text">Helper Loc</Link>
                </div>

                <div className="navbar__links">
                    <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>Home</Link>
                    <Link to="/how-it-works" className={`navbar__link ${isActive('/how-it-works') ? 'navbar__link--active' : ''}`}>How it Works</Link>
                    <Link to="/about-us" className={`navbar__link ${isActive('/about-us') ? 'navbar__link--active' : ''}`}>About</Link>
                    <Link to="/contact-us" className={`navbar__link ${isActive('/contact-us') ? 'navbar__link--active' : ''}`}>Contact</Link>
                    {canUseUserChats && (
                        <Link
                            to="/user-dashboard/recent-chats"
                            className={`navbar__link ${isActive('/user-dashboard/recent-chats') ? 'navbar__link--active' : ''}`}
                        >
                            Chats
                        </Link>
                    )}
                </div>

                <div className="navbar__search">
                    <span className="material-symbols-outlined navbar__search-icon">search</span>
                    <input type="text" placeholder="Search services..." className="navbar__search-input" />
                </div>

                {/* ── RIGHT SIDE: Role-based rendering ── */}
                <div className="navbar__actions">
                    {isAuthenticated ? (
                        isWorkerMode ? <WorkerDropdown /> : <UserDropdown />
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="navbar__btn navbar__btn--outline">Login</button>
                            </Link>
                            <Link to="/registration">
                                <button className="navbar__btn navbar__btn--filled">Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
