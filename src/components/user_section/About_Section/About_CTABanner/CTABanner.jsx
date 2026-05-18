import './CTABanner.css';

export default function CTABanner() {
    return (
        <section className="cta-banner">
            <div className="cta-banner__inner">

                {/* Card 1 — Book a Service */}
                <div className="cta-card cta-card--primary">
                    <div className="cta-card__content">
                        <h3 className="cta-card__heading">Need a hand?</h3>
                        <p className="cta-card__desc">
                            Experience the most reliable home services in India. Book your first service today.
                        </p>
                        <button className="cta-card__btn cta-card__btn--light">Book a Service</button>
                    </div>
                    {/* Decorative icon */}
                    <span className="cta-card__deco material-symbols-outlined" aria-hidden="true">
                        handyman
                    </span>
                </div>

                {/* Card 2 — Join as Pro */}
                <div className="cta-card cta-card--dark">
                    <div className="cta-card__content">
                        <h3 className="cta-card__heading">Join as a Pro</h3>
                        <p className="cta-card__desc">
                            Grow your business, get insured, and earn more with HelperLoc's massive network.
                        </p>
                        <button className="cta-card__btn cta-card__btn--accent">Register as Partner</button>
                    </div>
                    {/* Decorative icon */}
                    <span className="cta-card__deco material-symbols-outlined" aria-hidden="true">
                        badge
                    </span>
                </div>

            </div>
        </section>
    );
}