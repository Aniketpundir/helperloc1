import React from 'react';
import './Safety.css';
import { safetyItems } from '../homeServices';

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
                    {safetyItems.map((item) => {
                        const SafetyIcon = item.Icon;
                        return (
                            <div key={item.title} className="safety__card">
                                <SafetyIcon className="safety__card-icon" aria-hidden="true" />
                                <h4 className="safety__card-title">{item.title}</h4>
                                <p className="safety__card-desc">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Safety;
