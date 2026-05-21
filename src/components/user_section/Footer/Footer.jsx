import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">

            {/* ── Main Grid ── */}
            <div className="footer__grid">

                {/* ── Column 1: Brand & Social ── */}
                <div className="footer__col">
                    <div className="footer__brand">
                        {/* Replace src with your actual logo path */}
                        <img
                            className="footer__logo"
                            src="/logo.svg"
                            alt="HelperLoc Logo"
                        />
                        <span className="footer__brand-name">HelperLoc</span>
                    </div>

                    <p className="footer__tagline">
                        Professional home services at your fingertips. We connect you with
                        verified experts for all your domestic needs.
                    </p>

                    <div className="footer__socials">
                        <a href="#" className="footer__social-link" aria-label="Facebook">
                            <span className="material-symbols-outlined">Notebook</span>
                        </a>
                        <a href="#" className="footer__social-link" aria-label="Share">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                    </div>
                </div>

                {/* ── Column 2: Quick Links ── */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Quick Links</h4>
                    <ul className="footer__list">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">How it Works</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                
                {/* ── Column 4: Contact & Legal ── */}
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
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>

            </div>

            {/* ── Bottom Bar ── */}
            <div className="footer__bottom">
                © 2026 HelperLoc. All Rights Reserved. Professional Home Services Across India.
            </div>

        </footer>
    );
};

export default Footer;