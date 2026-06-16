import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './HowItWorks.css';
import { howSteps } from '../homeServices';

const HowItWorks = () => {
    return (
        <section className="how" id="how-it-works">
            <div className="how__inner container">
                <div className="how__header">
                    <h2 className="how__title">How It Works</h2>
                    <p className="how__subtitle">Book a service in 3 easy steps</p>
                </div>
                <div className="how__steps">
                    {howSteps.map((step, index) => {
                        const StepIcon = step.Icon;
                        return (
                            <React.Fragment key={step.number}>
                                <div className="how__step">
                                    <div className="how__step-icon-wrap">
                                        <StepIcon className="how__step-icon" aria-hidden="true" />
                                        <span className="how__step-badge">{step.number}</span>
                                    </div>
                                    <h3 className="how__step-title">{step.title}</h3>
                                    <p className="how__step-desc">{step.description}</p>
                                </div>
                                {index < howSteps.length - 1 && (
                                    <div className="how__connector">
                                        <FaArrowRight aria-hidden="true" />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
