import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <header className="hero">
            <div className="hero__inner container">
                {/* Left Content */}
                <div className="hero__content">
                    <div className="hero__badge">
                        <span className="material-symbols-outlined hero__badge-icon" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                        <span className="hero__badge-text">Trusted by 10,000+ customers</span>
                    </div>

                    <h1 className="hero__title">
                        Book Trusted Home <br />
                        <span className="hero__title-accent">Services Near You</span>
                    </h1>

                    <p className="hero__subtitle">
                        Access verified professionals for plumbing, cleaning, and more.
                        Affordable rates with same-day availability across your city.
                    </p>

                    {/* Search Bar */}
                    <div className="hero__search-bar">
                        <div className="hero__search-field">
                            <span className="material-symbols-outlined hero__search-field-icon">build</span>
                            <input type="text" placeholder="What do you need help with?" />
                        </div>
                        <div className="hero__search-field">
                            <span className="material-symbols-outlined hero__search-field-icon">location_on</span>
                            <input type="text" placeholder="Enter your location" />
                        </div>
                        <button className="hero__search-btn">
                            Find Taskers
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="hero__trust">
                        <div className="hero__trust-item">
                            <span className="material-symbols-outlined hero__trust-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            Verified Workers
                        </div>
                        <div className="hero__trust-item">
                            <span className="material-symbols-outlined hero__trust-icon" style={{ fontVariationSettings: "'FILL' 1" }}>today</span>
                            Same-day Availability
                        </div>
                        <div className="hero__trust-item">
                            <span className="material-symbols-outlined hero__trust-icon" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                            Secure Payments
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="hero__image-wrap">
                    <div className="hero__image-container">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF1v3mEBe6Nv37eZ13WubujA8raXRntZ-BMRfJ44_qz9DXJHLqZnTkDMWgF3uqQMb5s_PR-3zqx2_Jxw4h_k_i5rVSKPqtLxHn50BlsjhZso_78bEWV5_GLNc8J7h-QkCr6W-5JcWz0br46LValOCTUADLejS2dQYKyUl6_uoYUgERMW1ANLLY3q1_88z0Jx9TEq__uiLiJ6xPwlGVb5thd-A0yp649exNA1FllNyd7qhnvPHB_uIQC7zONW4oOKwwFPrETyeEoBJB"
                            alt="Professional home service provider"
                            className="hero__image"
                        />
                        <div className="hero__image-overlay"></div>
                    </div>

                    {/* Floating Card 1 */}
                    <div className="hero__float-card hero__float-card--bottom">
                        <div className="hero__float-card-icon">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--color-primary)' }}>check_circle</span>
                        </div>
                        <div>
                            <p className="hero__float-card-title">Trusted Professionals</p>
                            <p className="hero__float-card-sub">100% Background Checked</p>
                        </div>
                    </div>

                    {/* Floating Card 2 */}
                    <div className="hero__float-card hero__float-card--top">
                        <div className="hero__float-card-stars">
                            {[1, 2, 3, 4].map(i => (
                                <span key={i} className="material-symbols-outlined hero__star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                            <span className="material-symbols-outlined hero__star" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                        </div>
                        <p className="hero__float-card-rating">
                            4.8★ <span className="hero__float-card-rating-label">Rating</span>
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;