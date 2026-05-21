import './HeroBanner.css';

const HeroBanner = () => {
    return (
        <section className="hero-banner">
            <div className="hero-banner__inner">
                <span className="hero-banner__badge">Simple &amp; Transparent Process</span>
                <h1 className="hero-banner__title">How HelperLoc Works</h1>
                <p className="hero-banner__subtitle">
                    Professional home services delivered with trust and speed. We connect
                    you with verified pros in minutes.
                </p>
                <div className="hero-banner__pills">
                    <div className="hero-banner__pill">
                        <span className="material-symbols-outlined">timer</span>
                        Book in under 2 minutes
                    </div>
                    <div className="hero-banner__pill">
                        <span className="material-symbols-outlined">verified</span>
                        10,000+ Tasks Completed
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;