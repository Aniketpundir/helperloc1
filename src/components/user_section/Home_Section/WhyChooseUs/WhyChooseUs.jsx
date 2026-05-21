import React from 'react';
import './WhyChooseUs.css';
import HelperLoc_why_Image from "../../../../assets/HelperLoc_why_Image.png"

const features = [
    {
        icon: 'verified_user',
        title: 'Verified Professionals',
        description: 'Strict background checks for safety.',
    },
    {
        icon: 'payments',
        title: 'Transparent Pricing',
        description: 'No hidden fees, upfront estimates.',
    },
    {
        icon: 'bolt',
        title: 'Same-day Service',
        description: 'Book and get help within hours.',
    },
    {
        icon: 'lock',
        title: 'Safe Payments',
        description: 'Secure online payment gateways.',
    },
    {
        icon: 'reviews',
        title: 'Ratings & Reviews',
        description: 'Real feedback from real users.',
    },
    {
        icon: 'support_agent',
        title: '24/7 Support',
        description: 'Always here to assist you.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="why" id="about">
            <div className="why__inner container">
                {/* Left Content */}
                <div className="why__content">
                    <h2 className="why__title">Why Choose HelperLoc?</h2>
                    <p className="why__subtitle">
                        We are committed to providing the highest quality home services through our
                        network of skilled and background-checked professionals.
                    </p>

                    <div className="why__features">
                        {features.map((feature) => (
                            <div key={feature.title} className="why__feature">
                                <div className="why__feature-icon-wrap">
                                    <span
                                        className="material-symbols-outlined why__feature-icon"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        {feature.icon}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="why__feature-title">{feature.title}</h4>
                                    <p className="why__feature-desc">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="why__image-wrap">
                    <img
                        src={HelperLoc_why_Image}
                        alt="Professional cleaner"
                        className="why__image"
                    />
                    <div className="why__stat-badge">
                        <p className="why__stat-number">10k+</p>
                        <p className="why__stat-label">HAPPY CLIENTS</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;