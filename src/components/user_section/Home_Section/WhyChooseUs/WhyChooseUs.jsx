import React from 'react';
import './WhyChooseUs.css';
import { whyFeatures } from '../homeServices';

const WhyChooseUs = () => {
    return (
        <section className="why" id="about">
            <div className="why__inner container">
                <div className="why__header">
                    <h2 className="why__title">Why Choose HelperLoc?</h2>
                    <p className="why__subtitle">India's most trusted home service platform</p>
                </div>

                <div className="why__grid">
                    {whyFeatures.map((feature) => {
                        const FeatureIcon = feature.Icon;
                        return (
                            <div key={feature.title} className="why-card">
                                <div className="why-card__icon-wrap">
                                    <FeatureIcon className="why-card__icon" aria-hidden="true" />
                                </div>
                                <div className="why-card__text">
                                    <h4 className="why-card__title">{feature.title}</h4>
                                    <p className="why-card__desc">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
