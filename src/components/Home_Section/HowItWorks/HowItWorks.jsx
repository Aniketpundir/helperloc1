import React from 'react';
import './HowItWorks.css';

const steps = [
    {
        number: '01',
        icon: 'touch_app',
        title: 'Select a Service',
        description: 'Choose from a wide range of verified home services tailored to your specific needs.',
    },
    {
        number: '02',
        icon: 'event_available',
        title: 'Schedule Your Service',
        description: 'Pick a date and time that works best for you. Our taskers are flexible and prompt.',
    },
    {
        number: '03',
        icon: 'task_alt',
        title: 'Get the Job Done',
        description: 'Relax while our professional expert delivers high-quality service at your doorstep.',
    },
];

const HowItWorks = () => {
    return (
        <section className="how" id="how-it-works">
            <div className="how__inner container">
                <div className="how__header">
                    <h2 className="how__title">How it works for Users</h2>
                    <p className="how__subtitle">
                        Getting your tasks done is as easy as 1, 2, 3. We handle the heavy lifting while you enjoy the results.
                    </p>
                </div>

                <div className="how__steps">
                    {steps.map((step, index) => (
                        <div key={step.number} className={`how__step ${index < steps.length - 1 ? 'how__step--connector' : ''}`}>
                            <div className="how__step-icon-wrap">
                                <span className="material-symbols-outlined how__step-icon">{step.icon}</span>
                            </div>
                            <div className="how__step-badge">{step.number}</div>
                            <h3 className="how__step-title">{step.title}</h3>
                            <p className="how__step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;