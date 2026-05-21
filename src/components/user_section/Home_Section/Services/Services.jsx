import React, { useState, useEffect } from 'react';
import './Services.css';
import Plumber from "../../../../assets/Plumber.png"
import Electrician from "../../../../assets/Electrician.png"
import House_Cleaning from "../../../../assets/House_Cleaning.png"
import AC_Repair from "../../../../assets/AC_Repair.png"
import Carpentry from "../../../../assets/Carpentry.png"
import Painting from "../../../../assets/Painting.png"

const services = [
    {
        id: 1,
        title: 'Plumber',
        description: 'Leaks, repairs & installations',
        image: Plumber,
    },
    {
        id: 2,
        title: 'Electrician',
        description: 'Wiring, fixtures & safety checks',
        image: Electrician,
    },
    {
        id: 3,
        title: 'House Cleaning',
        description: 'Deep cleaning & regular maintenance',
        image: House_Cleaning,
    },
    {
        id: 4,
        title: 'AC Repair',
        description: 'Cooling solutions & servicing',
        image: AC_Repair,
    },
    {
        id: 5,
        title: 'Carpentry',
        description: 'Furniture repair & woodwork',
        image: Carpentry,
    },
    {
        id: 6,
        title: 'Painting',
        description: 'Interior & exterior painting',
        image: Painting,
    },
];

const Services = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    // Get responsive card width based on screen size
    const getCardWidth = () => {
        if (windowWidth >= 1440) return 350;
        if (windowWidth > 768) return 280;
        if (windowWidth > 480) return 280;
        return 250; // Mobile < 480px
    };

    const cardWidth = getCardWidth();
    const gap = 16; // Gap between cards
    const cardWithGap = cardWidth + gap;
    const totalWidth = services.length * cardWithGap;

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
                const newPos = prev + 2; // Scroll speed
                // Reset to start when reaching the end
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

    return (
        <section className="services" id="services">
            <div className="services__inner container">
                {/* Header */}
                <div className="services__header">
                    <div>
                        <h2 className="services__title">What do you need help with?</h2>
                        <p className="services__subtitle">Explore our most popular home service categories</p>
                    </div>
                    <div className="services__nav-btns">
                        <button
                            className="services__nav-btn"
                            onClick={handlePrev}
                            aria-label="Previous services"
                            type="button"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button
                            className="services__nav-btn"
                            onClick={handleNext}
                            aria-label="Next services"
                            type="button"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="services__carousel-wrapper">
                    <div
                        className="services__carousel"
                        style={{
                            transform: `translateX(-${scrollPosition}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        {services.map((service) => (
                            <div key={service.id} className="services__card">
                                <div className="services__card-img-wrap">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="services__card-img"
                                    />
                                </div>
                                <div className="services__card-body">
                                    <h3 className="services__card-title">{service.title}</h3>
                                    <p className="services__card-desc">{service.description}</p>
                                    <button
                                        className="services__card-btn"
                                        type="button"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Book Now
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="services__footer">
                    <a href="#" className="services__more-link" onClick={(e) => e.preventDefault()}>
                        More Services
                        <span className="material-symbols-outlined">trending_flat</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;