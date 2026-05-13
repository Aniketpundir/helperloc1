import React from 'react';
import './WhyChooseUs.css';

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
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9HRSHaIo-JHFArxPORnhe3XuSeeYKP2Sx8tXft7UJR4sWeAO5lXdjWUdMB4idjSVkTY7-jDb8tLwskt6CW7NEnz7aK7L8OTfq9cQWv0TONi9uR81FmYiqeYPzY-W8xwHoOaOjh9CTitGn4MI9s0OtJN_rsh6KyPMPOeDghyzkszXXnKKSkZNo42gvFprkzmybhHKBJSRy1luYwcwyBh11qoSAtnnro7UJUxTcAZiaM3-v_8dpgSNMkSDWPxsKMM-CGaMhFY7w4vzR"
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