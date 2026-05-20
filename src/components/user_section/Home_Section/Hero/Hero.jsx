import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <header className="heroh">
            <div className="heroh__inner container">
                {/* Left Content */}
                <div className="heroh__content">
                    <div className="heroh__badge">
                        <span className="material-symbols-outlined heroh__badge-icon" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                        <span className="heroh__badge-text">Trusted by 10,000+ customers</span>
                    </div>

                    <h1 className="heroh__title">
                        Book Trusted Home <br />
                        <span className="heroh__title-accent">Services Near You</span>
                    </h1>

                    <p className="heroh__subtitle">
                        Access verified professionals for plumbing, cleaning, and more.
                        Affordable rates with same-day availability across your city.
                    </p>

                    {/* Search Bar */}
                    <div className="heroh__search-bar">
                        <div className="heroh__search-field">
                            <span className="material-symbols-outlined heroh__search-field-icon">build</span>
                            <input type="text" placeholder="What do you need help with?" />
                        </div>
                        <div className="heroh__search-field">
                            <span className="material-symbols-outlined heroh__search-field-icon">location_on</span>
                            <input type="text" placeholder="Enter your location" />
                        </div>
                        <button className="heroh__search-btn">
                            Find Taskers
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="heroh__trust">
                        <div className="heroh__trust-item">
                            <span className="material-symbols-outlined heroh__trust-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            Verified Workers
                        </div>
                        <div className="heroh__trust-item">
                            <span className="material-symbols-outlined heroh__trust-icon" style={{ fontVariationSettings: "'FILL' 1" }}>today</span>
                            Same-day Availability
                        </div>
                        <div className="heroh__trust-item">
                            <span className="material-symbols-outlined heroh__trust-icon" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                            Secure Payments
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="heroh__image-wrap">
                    <div className="heroh__image-container">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF1v3mEBe6Nv37eZ13WubujA8raXRntZ-BMRfJ44_qz9DXJHLqZnTkDMWgF3uqQMb5s_PR-3zqx2_Jxw4h_k_i5rVSKPqtLxHn50BlsjhZso_78bEWV5_GLNc8J7h-QkCr6W-5JcWz0br46LValOCTUADLejS2dQYKyUl6_uoYUgERMW1ANLLY3q1_88z0Jx9TEq__uiLiJ6xPwlGVb5thd-A0yp649exNA1FllNyd7qhnvPHB_uIQC7zONW4oOKwwFPrETyeEoBJB"
                            alt="Professional home service provider"
                            className="heroh__image"
                        />
                        <div className="heroh__image-overlay"></div>
                    </div>

                    {/* Floating Card 1 */}
                    <div className="heroh__float-card heroh__float-card--bottom">
                        <div className="heroh__float-card-icon">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--color-primary)' }}>check_circle</span>
                        </div>
                        <div>
                            <p className="heroh__float-card-title">Trusted Professionals</p>
                            <p className="heroh__float-card-sub">100% Background Checked</p>
                        </div>
                    </div>

                    {/* Floating Card 2 */}
                    <div className="heroh__float-card heroh__float-card--top">
                        <div className="heroh__float-card-stars">
                            {[1, 2, 3, 4].map(i => (
                                <span key={i} className="material-symbols-outlined heroh__star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                            <span className="material-symbols-outlined heroh__star" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                        </div>
                        <p className="heroh__float-card-rating">
                            4.8★ <span className="heroh__float-card-rating-label">Rating</span>
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;