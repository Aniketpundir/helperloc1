// src/components/user_section/Home_Section/Testimonials/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { StarIcon } from '../homeServices';

const testimonials = [
    { id: 1, stars: 5, text: 'HelperLoc is a lifesaver. The electrician arrived within an hour and fixed our short circuit issue perfectly. Very professional!', name: 'Rahul Sharma', location: 'Delhi', initials: 'RS' },
    { id: 2, stars: 5, text: 'Booked a plumber for a leaking pipe and he arrived same day. Excellent service at a very reasonable price. Highly recommended!', name: 'Priya Mehta', location: 'Mumbai', initials: 'PM' },
    { id: 3, stars: 4, text: 'The cleaning team was thorough and efficient. My home has never looked so clean. Will definitely book again!', name: 'Anita Singh', location: 'Bangalore', initials: 'AS' },
    { id: 4, stars: 5, text: 'AC repair done in under 2 hours. The technician was very knowledgeable and fixed the issue quickly. Great experience!', name: 'Vikram Patel', location: 'Ahmedabad', initials: 'VP' },
    { id: 5, stars: 5, text: 'Painting service was outstanding. The painters were neat, punctual, and the quality is amazing. 10/10 would recommend!', name: 'Sunita Rao', location: 'Hyderabad', initials: 'SR' },
];

const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const visibleCount = 3;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const getVisible = () => {
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            items.push(testimonials[(current + i) % testimonials.length]);
        }
        return items;
    };

    return (
        <section className="testi">
            <div className="testi__inner container">
                <div className="testi__header">
                    <h2 className="testi__title">What Our Customers Say</h2>
                    <p className="testi__subtitle">Trusted by thousands across India</p>
                </div>

                <div className="testi__grid">
                    {getVisible().map((t) => (
                        <div key={t.id} className="testi-card">
                            {/* Stars */}
                            <div className="testi-card__stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`testi-card__star ${i < t.stars ? 'testi-card__star--filled' : ''}`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="testi-card__text">{t.text}</p>
                            <div className="testi-card__user">
                                <div className="testi-card__avatar">{t.initials}</div>
                                <div>
                                    <p className="testi-card__name">{t.name}</p>
                                    <p className="testi-card__location">{t.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots */}
                <div className="testi__dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`testi__dot ${i === current ? 'testi__dot--active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
