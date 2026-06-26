import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__grid">
                <div className="footer__col">
                    <div className="footer__brand">
                        <img
                            className="footer__logo"
                            src="/logo.svg"
                            alt="HelperLoc Logo"
                            width="32"
                            height="32"
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="footer__brand-name">HelperLoc</span>
                    </div>

                    <p className="footer__tagline">
                        Professional home services at your fingertips. We connect you with
                        verified experts for all your domestic needs.
                    </p>

                    <div className="footer__socials">
                        <a href="https://www.facebook.com/helperloc" className="footer__social-link" aria-label="Facebook">
                            <span className="material-symbols-outlined">Notebook</span>
                        </a>
                        <a href="https://www.linkedin.com/company/helperloc" className="footer__social-link" aria-label="LinkedIn">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                    </div>
                </div>

                <div className="footer__col">
                    <h4 className="footer__col-title">Quick Links</h4>
                    <ul className="footer__list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/how-it-works">How it Works</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact-us">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__col-title">Popular Services</h4>
                    <ul className="footer__list">
                        <li><Link to="/electrician/dehradun">Electrician in Dehradun</Link></li>
                        <li><Link to="/plumber/dehradun">Plumber in Dehradun</Link></li>
                        <li><Link to="/carpenter/roorkee">Carpenter in Roorkee</Link></li>
                        <li><Link to="/cleaner/muzaffarnagar">Cleaner in Muzaffarnagar</Link></li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h4 className="footer__col-title">Contact Us</h4>

                    <div className="footer__contact-item">
                        <span className="material-symbols-outlined">mail</span>
                        hello@helperloc.in
                    </div>

                    <div className="footer__contact-item">
                        <span className="material-symbols-outlined">call</span>
                        +91 98765 43210
                    </div>

                    <div className="footer__legal-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                &copy; 2026 HelperLoc. All Rights Reserved. Professional Home Services Across India.
            </div>
        </footer>
    );
};

export default Footer;
