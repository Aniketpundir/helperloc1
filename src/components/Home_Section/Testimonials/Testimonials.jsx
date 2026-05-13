import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        stars: 5,
        text: '"HelperLoc is a lifesaver. The electrician arrived within an hour and fixed our short circuit issue perfectly. Very professional!"',
        name: 'Rahul Sharma',
        label: 'Verified Customer',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2iwA1txF0isr5jK_tnnBUzu_QrD3VN1L5gL3AmraBKDa86VJtgJ0Dgpq43O-cC1iDO-7zSzQbdF-tR1IqvoBaZJdQuq9ETOzh0-i-5yma1miNoCvjxwcsfTZGeqYQiNWw8Hg8F9GyYZTjPexG2YFuMV4Gs-BPpVSO5vQwz3U1476WrJWn712gWpSid3h2XHSNwmigDju89QsHJY9iEgWdcEVveuVhqFnPA1ffLaLPCteUOcShqUFUi0xK1zS91cugv9J9-ovQDakV',
    },
    {
        id: 2,
        stars: 5,
        text: '"I\'ve used several cleaning services, but the quality provided by HelperLoc was unmatched. The team was thorough and extremely polite."',
        name: 'Priya Mehta',
        label: 'Verified Customer',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe1oYnKCYrmt3l_2Un8gCjcPuz8pAjY01Z_ANg3j8tVZ8P-XBjspFDli0yAwwn2Pj4bsrWfQ4jblOOdJCKYZd4WmIxeh9-n1ZKIAIkty7c4SdsbTcioSE7nSHuRehvB54rXtxsn2KUeTVLD3y04yvAt_5IFnS-mK_bp_SaV8or3JPOgH0lbdd8CcXmPyyBLCYged97vLd3jXd6qDV8r3LpJVYI0Ifel9MpdnKDql9Hvv__xI4qFoMzSChABdNyAknUvG7RwhNiHQGE',
    },
    {
        id: 3,
        stars: 5,
        text: '"Finding a reliable plumber in my area was always a challenge until I found HelperLoc. Transparent pricing and great service every time."',
        name: 'Arjun Singh',
        label: 'Verified Customer',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgV6OCH309ZaEWmxPhlEBiZCN5Zfu7U23OH1rKjdHbPn5jSOZ4I34AWyXOThCNta7iisOfA8RgwE3fQG0tUIAI3K6RBJCm9Q_xC2TMNfxJza9Td-RrBFANImrhOSZ6GmCmT76uDquFAdzwW85LOQ06phABphjD5sDUdPTDcU6geiw3foD4VdMVpOicLQeBrcPXeQ3NiXOcfrqdgEQZjIvanegr14EYvz-E7Mxq9lIXlf2Lu1SqrugxehYNhmwVJ8tLg8TYatcB7z_E',
    },
];

const Testimonials = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    // Get responsive card width
    const getCardWidth = () => {
        if (windowWidth >= 1440) return 420;
        if (windowWidth > 768) return 380;
        if (windowWidth > 480) return 340;
        return 300; // Mobile
    };

    const cardWidth = getCardWidth();
    const gap = 24;
    const cardWithGap = cardWidth + gap;
    const totalWidth = testimonials.length * cardWithGap;

    // Track window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-scroll marquee effect
    useEffect(() => {
        if (!isAutoScrolling) return;

        const interval = setInterval(() => {
            setScrollPosition((prev) => {
                const newPos = prev + 1;
                if (newPos >= totalWidth) {
                    return 0;
                }
                return newPos;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isAutoScrolling, totalWidth]);

    const handlePrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAutoScrolling(false);
        setScrollPosition((prev) => Math.max(0, prev - cardWithGap));
    };

    const handleNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAutoScrolling(false);
        setScrollPosition((prev) => {
            const newPos = prev + cardWithGap;
            return newPos >= totalWidth ? 0 : newPos;
        });
    };

    // const handleDotClick = (index) => {
    //     setIsAutoScrolling(false);
    //     setScrollPosition(index * cardWithGap);
    // };

    return (
        <section className="testimonials">
            <div className="testimonials__inner container">
                <div className="testimonials__header">
                    <h2 className="testimonials__title">What our customers say</h2>
                    
                    {/* Nav Buttons */}
                    <div className="testimonials__nav-btns">
                        <button 
                            className="testimonials__nav-btn" 
                            onClick={handlePrev} 
                            aria-label="Previous testimonial"
                            type="button"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button 
                            className="testimonials__nav-btn" 
                            onClick={handleNext} 
                            aria-label="Next testimonial"
                            type="button"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="testimonials__carousel-wrapper">
                    <div 
                        className="testimonials__carousel"
                        style={{
                            transform: `translateX(-${scrollPosition}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        {testimonials.map((t) => (
                            <div key={t.id} className="testimonials__card">
                                {/* Stars */}
                                <div className="testimonials__stars">
                                    {Array.from({ length: t.stars }).map((_, i) => (
                                        <span key={i} className="material-symbols-outlined testimonials__star" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                    ))}
                                </div>
                                {/* Text */}
                                <p className="testimonials__text">{t.text}</p>
                                {/* Author */}
                                <div className="testimonials__author">
                                    <img src={t.image} alt={t.name} className="testimonials__avatar" />
                                    <div>
                                        <p className="testimonials__name">{t.name}</p>
                                        <p className="testimonials__label">{t.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots
                <div className="testimonials__dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`testimonials__dot ${i * cardWithGap === Math.round(scrollPosition / cardWithGap) * cardWithGap ? 'testimonials__dot--active' : ''}`}
                            onClick={() => handleDotClick(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            type="button"
                        />
                    ))}
                </div> */}
            </div>
        </section>
    );
};

export default Testimonials;