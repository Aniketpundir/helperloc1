import React from 'react';
import './TrustBanner.css';

const trustItems = [
    {
        id: 1,
        icon: 'verified_user',
        title: 'Vetted Professionals',
        description: 'Every service provider undergoes a rigorous background check.',
    },
    {
        id: 2,
        icon: 'calendar_month',
        title: 'Instant Booking',
        description: 'Schedule a professional in less than 60 seconds.',
    },
    {
        id: 3,
        icon: 'payments',
        title: 'Transparent Pricing',
        description: 'No hidden fees. Pay securely after the job is completed.',
    },
];

const TrustBanner = () => {
    return (
        <section className="worker-category-trust">
            <div className="worker-category-trust__inner container">
                <div className="worker-category-trust__grid">
                    {trustItems.map((item) => (
                        <div key={item.id} className="worker-category-trust__item">
                            <div className="worker-category-trust__icon-wrap">
                                <span
                                    className="material-symbols-outlined worker-category-trust__icon"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    {item.icon}
                                </span>
                            </div>
                            <h4 className="worker-category-trust__item-title">{item.title}</h4>
                            <p className="worker-category-trust__item-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBanner;