import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Check if link is active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

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
                    <Link 
                        to="/" 
                        className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/how-it-works" 
                        className={`navbar__link ${isActive('/how-it-works') ? 'navbar__link--active' : ''}`}
                    >
                        How it Works
                    </Link>
                    <Link 
                        to="/about-us" 
                        className={`navbar__link ${isActive('/about-us') ? 'navbar__link--active' : ''}`}
                    >
                        About
                    </Link>
                    <Link 
                        to="/contact-us" 
                        className={`navbar__link ${isActive('/contact-us') ? 'navbar__link--active' : ''}`}
                    >
                        Contact
                    </Link>
                </div>

                {/* Search */}
                <div className="navbar__search">
                    <span className="material-symbols-outlined navbar__search-icon">search</span>
                    <input type="text" placeholder="Search services..." className="navbar__search-input" />
                </div>

                {/* CTA Buttons */}
                <div className="navbar__actions">
                    <button className="navbar__btn navbar__btn--outline navbar-login">Login</button>
                    <button className="navbar__btn navbar__btn--filled">Sign Up</button>
                </div>

                {/* Hamburger */}
                <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="navbar__mobile-menu">
                    <Link 
                        to="/" 
                        className={`navbar__mobile-link ${isActive('/') ? 'navbar__mobile-link--active' : ''}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/how-it-works" 
                        className={`navbar__mobile-link ${isActive('/how-it-works') ? 'navbar__mobile-link--active' : ''}`}
                    >
                        How it Works
                    </Link>
                    <Link 
                        to="/about-us" 
                        className={`navbar__mobile-link ${isActive('/about-us') ? 'navbar__mobile-link--active' : ''}`}
                    >
                        About
                    </Link>
                    <Link 
                        to="/contact-us" 
                        className={`navbar__mobile-link ${isActive('/contact-us') ? 'navbar__mobile-link--active' : ''}`}
                    >
                        Contact
                    </Link>
                    <div className="navbar__mobile-actions">
                        <button className="navbar__btn navbar__btn--outline">Login</button>
                        <button className="navbar__btn navbar__btn--filled">Sign Up</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;