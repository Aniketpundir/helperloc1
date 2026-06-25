import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaTimes } from 'react-icons/fa';
import './Hero.css';
import { homeCategories } from '../homeServices';

const banners = [
    {
        id: 1,
        tag: 'Limited Time Offer',
        title: 'Top-Rated Plumbers',
        subtitle: 'Available 24/7 - fixed pipes, zero stress!',
        cta: 'Book Now',
        category: 'Plumber',
        bg: 'linear-gradient(120deg, #1565c0 0%, #42a5f5 100%)',
        iconBg: 'rgba(255,255,255,0.12)',
        Icon: homeCategories[0].Icon,
    },
    {
        id: 2,
        tag: 'Same Day Service',
        title: 'Expert Electricians',
        subtitle: 'Safe, certified, and always on time!',
        cta: 'Book Now',
        category: 'Electrician',
        bg: 'linear-gradient(120deg, #f57f17 0%, #ffca28 100%)',
        iconBg: 'rgba(255,255,255,0.15)',
        Icon: homeCategories[1].Icon,
    },
    {
        id: 3,
        tag: 'Most Booked',
        title: 'Deep House Cleaning',
        subtitle: 'Spotless home, verified professionals!',
        cta: 'Book Now',
        category: 'Cleaning',
        bg: 'linear-gradient(120deg, #2e7d32 0%, #66bb6a 100%)',
        iconBg: 'rgba(255,255,255,0.12)',
        Icon: homeCategories[2].Icon,
    },
    {
        id: 4,
        tag: 'Summer Special',
        title: 'AC Service & Repair',
        subtitle: 'Stay cool - quick AC servicing at your doorstep!',
        cta: 'Book Now',
        category: 'AC Repair',
        bg: 'linear-gradient(120deg, #0277bd 0%, #4fc3f7 100%)',
        iconBg: 'rgba(255,255,255,0.12)',
        Icon: homeCategories[3].Icon,
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [query, setQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [dropdownRect, setDropdownRect] = useState(null);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const goTo = useCallback((index) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent(index);
            setAnimating(false);
        }, 320);
    }, [animating]);

    const next = useCallback(() => {
        goTo((current + 1) % banners.length);
    }, [current, goTo]);

    const prev = () => {
        goTo((current - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
        if (isSearchOpen) return undefined;
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next, isSearchOpen]);

    const updateDropdownPosition = useCallback(() => {
        if (searchRef.current) {
            const rect = searchRef.current.getBoundingClientRect();
            setDropdownRect({
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width,
            });
        }
    }, []);

    useEffect(() => {
        if (!isSearchOpen) return undefined;
        updateDropdownPosition();
        window.addEventListener('scroll', updateDropdownPosition, true);
        window.addEventListener('resize', updateDropdownPosition);
        return () => {
            window.removeEventListener('scroll', updateDropdownPosition, true);
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isSearchOpen, updateDropdownPosition]);

    const banner = banners[current];
    const BannerIcon = banner.Icon;

    const suggestions = homeCategories
        .filter((service) => {
            const term = query.trim().toLowerCase();
            if (!term) return true;
            return [service.label, ...service.aliases].some((item) => item.toLowerCase().includes(term));
        })
        .slice(0, 6);

    const goToService = (service) => {
        if (!service) return;
        setQuery(service.label);
        setIsSearchOpen(false);
        navigate(`/worker-category/listed-worker/${service.label}`);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const term = query.trim().toLowerCase();
        const match = homeCategories.find((service) => (
            service.label.toLowerCase() === term ||
            service.aliases.some((alias) => alias.toLowerCase() === term)
        )) || suggestions[0];

        if (match) goToService(match);
    };

    const showDropdown = isSearchOpen && suggestions.length > 0 && dropdownRect;

    return (
        <>
            <section className="hero-banner">
                <div
                    className={`hero-banner__slide ${animating ? 'hero-banner__slide--exit' : 'hero-banner__slide--enter'}`}
                >
                    <div className="hero-banner__bg" style={{ background: banner.bg }}>
                        <div className="hero-banner__shape hero-banner__shape--1" />
                        <div className="hero-banner__shape hero-banner__shape--2" />
                    </div>

                    <div className="hero-banner__content container">
                        <div className="hero-banner__text">
                            <span className="hero-banner__tag">{banner.tag}</span>
                            <h1 className="hero-banner__title">{banner.title}</h1>
                            <p className="hero-banner__subtitle">{banner.subtitle}</p>

                            <form className="hero-search" ref={searchRef} onSubmit={handleSearchSubmit}>
                                <FaSearch className="hero-search__icon" aria-hidden="true" />
                                <input
                                    className="hero-search__input"
                                    type="search"
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setIsSearchOpen(true);
                                    }}
                                    onFocus={() => setIsSearchOpen(true)}
                                    onClick={() => setIsSearchOpen(true)}
                                    onBlur={() => window.setTimeout(() => setIsSearchOpen(false), 120)}
                                    placeholder="Search services like plumber, cleaning, AC repair"
                                    aria-label="Search services"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        className="hero-search__clear"
                                        onClick={() => {
                                            setQuery('');
                                            setIsSearchOpen(true);
                                        }}
                                        aria-label="Clear search"
                                    >
                                        <FaTimes aria-hidden="true" />
                                    </button>
                                )}
                                <button className="hero-search__submit" type="submit" aria-label="Search">
                                    <FaArrowRight aria-hidden="true" />
                                </button>
                            </form>

                            <button
                                className="hero-banner__cta"
                                onClick={() => navigate(`/worker-category/listed-worker/${banner.category}`)}
                            >
                                {banner.cta}
                                <FaArrowRight aria-hidden="true" />
                            </button>
                        </div>

                        <div className="hero-banner__icon-wrap" style={{ background: banner.iconBg }}>
                            <BannerIcon className="hero-banner__icon" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                <div className="hero-banner__dots">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            className={`hero-banner__dot ${i === current ? 'hero-banner__dot--active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {showDropdown && createPortal(
                <div
                    className="hero-search__suggestions"
                    style={{
                        top: dropdownRect.top,
                        left: dropdownRect.left,
                        width: dropdownRect.width,
                    }}
                >
                    {suggestions.map((service) => {
                        const ServiceIcon = service.Icon;
                        return (
                            <button
                                type="button"
                                className="hero-search__suggestion"
                                key={service.label}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => goToService(service)}
                            >
                                <span className="hero-search__suggestion-icon" style={{ '--service-color': service.color }}>
                                    <ServiceIcon aria-hidden="true" />
                                </span>
                                <span className="hero-search__suggestion-copy">
                                    <strong>{service.label}</strong>
                                    <small>{service.aliases.slice(0, 2).join(' | ')}</small>
                                </span>
                            </button>
                        );
                    })}
                </div>,
                document.body
            )}
        </>
    );
};

export default Hero;