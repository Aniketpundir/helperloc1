import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './CTABanner.css';

const CTABanner = () => {
    return (
        <section className="cta">
            <div className="cta__inner container">
                <div className="cta__card">
                    <h2 className="cta__title">Ready to get help today?</h2>
                    <p className="cta__subtitle">
                        Join thousands of happy customers across India and experience professional
                        home services like never before.
                    </p>

                    <div className="cta__actions">
                        <button className="cta__btn cta__btn--primary">
                            Book a Service
                            <FaArrowRight aria-hidden="true" />
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
