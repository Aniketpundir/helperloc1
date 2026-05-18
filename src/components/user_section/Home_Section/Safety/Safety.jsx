import React from 'react';
import './Safety.css';

const safetyItems = [
    {
        icon: 'id_card',
        title: 'Aadhaar Verified',
        description: 'Mandatory identity verification for all service providers.',
    },
    {
        icon: 'policy',
        title: 'Police Verification',
        description: 'Background check conducted by official authorities.',
    },
    {
        icon: 'admin_panel_settings',
        title: 'Secure Escrow',
        description: 'Your payment is held safely until the task is completed.',
    },
    {
        icon: 'emergency_home',
        title: '24/7 Support',
        description: 'Dedicated safety team available around the clock.',
    },
];

const Safety = () => {
    return (
        <section className="safety">
            <div className="safety__inner container">
                <div className="safety__header">
                    <h2 className="safety__title">Your safety is our priority</h2>
                    <p className="safety__subtitle">
                        We've built a robust safety framework to ensure every interaction on HelperLoc is secure and trustworthy.
                    </p>
                </div>

                <div className="safety__grid">
                    {safetyItems.map((item) => (
                        <div key={item.title} className="safety__card">
                            <span
                                className="material-symbols-outlined safety__card-icon"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                {item.icon}
                            </span>
                            <h4 className="safety__card-title">{item.title}</h4>
                            <p className="safety__card-desc">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Safety;