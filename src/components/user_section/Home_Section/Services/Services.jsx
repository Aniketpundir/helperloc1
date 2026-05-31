import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import ServiceCard from '../../ServiceCard/ServiceCard';
import Plumber from "../../../../assets/Plumber.png";
import Electrician from "../../../../assets/Electrician.png";
import House_Cleaning from "../../../../assets/House_Cleaning.png";
import AC_Repair from "../../../../assets/AC_Repair.png";
import Carpentry from "../../../../assets/Carpentry.png";
import Painting from "../../../../assets/Painting.png";
import { Link } from 'react-router-dom';

const services = [
    { id: 1, title: 'Plumber', description: 'Leaks, repairs & installations', image: Plumber },
    { id: 2, title: 'Electrician', description: 'Wiring, fixtures & safety checks', image: Electrician },
    { id: 3, title: 'House Cleaning', description: 'Deep cleaning & regular maintenance', image: House_Cleaning },
    { id: 4, title: 'AC Repair', description: 'Cooling solutions & servicing', image: AC_Repair },
    { id: 5, title: 'Carpentry', description: 'Furniture repair & woodwork', image: Carpentry },
    { id: 6, title: 'Painting', description: 'Interior & exterior painting', image: Painting },
];

const infiniteServices = [...services, ...services, ...services];

const Services = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    const scrollRef = useRef(null);
    const autoScrollRef = useRef(null);
    const isManual = useRef(false);
    const manualTimer = useRef(null);

    const getCardWidth = () => {
        if (windowWidth >= 1440) return 350;
        if (windowWidth > 480) return 280;
        return 250;
    };

    const navigate = useNavigate()

    const gap = 16;
    const cardWidth = getCardWidth();
    const cardWithGap = cardWidth + gap;
    const setLength = services.length * cardWithGap; // width of ONE set

    // Track resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Jump to the MIDDLE set on mount (silently, no animation)
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.style.transition = 'none';
        el.style.transform = `translateX(-${setLength}px)`;
    }, [setLength]);

    // Auto-scroll: move 1px every 20ms
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let currentX = setLength; // start from middle set

        const tick = () => {
            if (isManual.current) return;

            currentX += 1.5;

            // When we've scrolled past the middle set into the 3rd set,
            // silently jump back to the same position in the 1st set
            if (currentX >= setLength * 2) {
                currentX -= setLength;
                el.style.transition = 'none';
                el.style.transform = `translateX(-${currentX}px)`;
                // Force reflow so next frame picks up no-transition
                void el.offsetHeight;
            } else {
                el.style.transition = 'none';
                el.style.transform = `translateX(-${currentX}px)`;
            }

            autoScrollRef.current = requestAnimationFrame(tick);
        };

        autoScrollRef.current = requestAnimationFrame(tick);

        // Store currentX so manual buttons can read it
        scrollRef._currentX = () => currentX;
        scrollRef._setX = (v) => { currentX = v; };

        return () => cancelAnimationFrame(autoScrollRef.current);
    }, [setLength]);

    const getX = () => {
        const el = scrollRef.current;
        if (!el) return setLength;
        const match = el.style.transform.match(/translateX\(-?(\d+(?:\.\d+)?)px\)/);
        return match ? parseFloat(match[1]) : setLength;
    };

    const scrollTo = (targetX) => {
        const el = scrollRef.current;
        if (!el) return;

        // Clamp within safe range
        let x = targetX;
        if (x < 0) x += setLength;
        if (x >= setLength * 2) x -= setLength;

        el.style.transition = 'transform 0.4s ease-out';
        el.style.transform = `translateX(-${x}px)`;

        // Update internal tracker
        if (scrollRef._setX) scrollRef._setX(x);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isManual.current = true;
        clearTimeout(manualTimer.current);

        const x = getX() - cardWithGap;
        scrollTo(x);

        manualTimer.current = setTimeout(() => {
            isManual.current = false;
        }, 3000);
    };

    const handleNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isManual.current = true;
        clearTimeout(manualTimer.current);

        const x = getX() + cardWithGap;
        scrollTo(x);

        manualTimer.current = setTimeout(() => {
            isManual.current = false;
        }, 3000);
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

                {/* Carousel */}
                <div className="services__carousel-wrapper">
                    <div
                        ref={scrollRef}
                        className="services__carousel"
                    >
                        {infiniteServices.map((service, index) => (
                            <ServiceCard key={`${service.id}-${index}`} service={service} />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="services__footer">
                    <Link to="/worker-category" className="services__more-link" onClick={(e) => {e.preventDefault(), navigate("/worker-category")}}>
                        More Services
                        <span className="material-symbols-outlined">trending_flat</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;