import React, { useState, useEffect } from 'react';
import './Services.css';

const services = [
    {
        id: 1,
        title: 'Plumber',
        description: 'Leaks, repairs & installations',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsHbzAillDahs_7xzfVbeaYRLspAToGd9BrUHPh2N-Ko_j8iFcHj2ex7EtgpddUp1znGYA9lMWiENQ_DGlyDLKxKgVdYeIR6ZB25I2C1MNUoWAT__J7dZlUL-Zt0ce0NuAWOYnvfmb52lpo-s4z5LmJFHrcWu202cFPB-BCgIWgbl907IhekRZT_8UwHVOiCUI5WSXfy_EyUH64b-A1eW4YYJH8CCQVzk5V2SXkNBxR4BoQSCBNQ7aLRkSgBt2a6H9tHiym2fkb27n',
    },
    {
        id: 2,
        title: 'Electrician',
        description: 'Wiring, fixtures & safety checks',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb5d3AvB8DH2rVGuRDzsaxNMH7SXYKsRnVmE9VCAdrsrWveQg1ZIF0tqt1jsegnvs4hA0Xf-BDE7q7kapHV-wnWXOXOcHGzu9PrBvRsXfjml5zap4_MlhndZIRb-ejwnV9z-ZSu9gndo9CA3gm5Dl2d0Ibqid5TaU-9xQcZye-WwRt5a2437WFSid-WOOwrc3Y8kg0LSxkdMDUFJd4Uki1cgZtpKZAKgly3G1tVSO04fFFCqhirGR1emsGjR9UwQRZGiHGJ_nIOZLG',
    },
    {
        id: 3,
        title: 'House Cleaning',
        description: 'Deep cleaning & regular maintenance',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJUxvG8Q4UbX814GOhMuL8yICyL7_DfHQahWXU35orblktiXKjJrMj3N1zEmn__i1JcQXSR4C8QDfW5k6y8L9fUVpyLsGxLmompBVAPvj5pzgdbGyeRx_pk07Lbcxvzmw6ToqjtWHgl92jQAz9GjbsOMscYmH3l_yG6o_DUiuq1DnN3S3Qgp4Gf6XKEcclmtI9Ghdrv_gQREVU20Pd85WA5W1flRYG56C-0YUEDS22pcXy2-yV5inAH2ltprcOdHguxOafNDjMsRer',
    },
    {
        id: 4,
        title: 'AC Repair',
        description: 'Cooling solutions & servicing',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSCb5MApRph80z9HiOzQbw1TQYwe-3kuYvgnOe9gL3-iqHN2ogRwlELy_wBmaaJrGqeKGdEwk-VEiXgA87wtPaIJ3t-zJn7c0zHrmrkCEvSzAQhHKNEe5V4_9IqUiA06dgoPv3P4ay0IZeZRb9oWPUN_9fzgVhY79FGUeAELzBYvDgqiPM_C1uQVGt4z_aXhH_diyYfLR-CrinzZPvJbDTxLoVxZ4DYiQs2tXr87VC7TsOIE0pNWI2xf_-j8-ARjLQPI6w0E8OrC5x',
    },
    {
        id: 5,
        title: 'Carpentry',
        description: 'Furniture repair & woodwork',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsHbzAillDahs_7xzfVbeaYRLspAToGd9BrUHPh2N-Ko_j8iFcHj2ex7EtgpddUp1znGYA9lMWiENQ_DGlyDLKxKgVdYeIR6ZB25I2C1MNUoWAT__J7dZlUL-Zt0ce0NuAWOYnvfmb52lpo-s4z5LmJFHrcWu202cFPB-BCgIWgbl907IhekRZT_8UwHVOiCUI5WSXfy_EyUH64b-A1eW4YYJH8CCQVzk5V2SXkNBxR4BoQSCBNQ7aLRkSgBt2a6H9tHiym2fkb27n',
    },
    {
        id: 6,
        title: 'Painting',
        description: 'Interior & exterior painting',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb5d3AvB8DH2rVGuRDzsaxNMH7SXYKsRnVmE9VCAdrsrWveQg1ZIF0tqt1jsegnvs4hA0Xf-BDE7q7kapHV-wnWXOXOcHGzu9PrBvRsXfjml5zap4_MlhndZIRb-ejwnV9z-ZSu9gndo9CA3gm5Dl2d0Ibqid5TaU-9xQcZye-WwRt5a2437WFSid-WOOwrc3Y8kg0LSxkdMDUFJd4Uki1cgZtpKZAKgly3G1tVSO04fFFCqhirGR1emsGjR9UwQRZGiHGJ_nIOZLG',
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