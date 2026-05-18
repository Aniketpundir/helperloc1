import React from 'react';
import './CTABanner.css';

const CTABanner = () => {
    return (
        <section className="cta">
            <div className="cta__inner container">
                <div className="cta__card">
                    {/* Background Blobs */}
                    <div className="cta__blob cta__blob--top-right" />
                    <div className="cta__blob cta__blob--bottom-left" />

                    <h2 className="cta__title">Ready to get help today?</h2>
                    <p className="cta__subtitle">
                        Join thousands of happy customers across India and experience professional
                        home services like never before.
                    </p>

                    <div className="cta__actions">
                        <button className="cta__btn cta__btn--primary">
                            Book a Service
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                        <button className="cta__btn cta__btn--outline">
                            Become a Tasker
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;