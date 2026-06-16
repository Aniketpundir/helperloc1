// src/components/user_section/Home_Section/Services/Services.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Services.css';
import Plumber from "../../../../assets/Plumber.png";
import Electrician from "../../../../assets/Electrician.png";
import HouseCleaning from "../../../../assets/House_Cleaning.png";
import AcRepair from "../../../../assets/AC_Repair.png";
import Carpentry from "../../../../assets/Carpentry.png";
import Painting from "../../../../assets/Painting.png";
import { StarIcon } from '../homeServices';

const services = [
    { id: 1, title: 'Plumber', image: Plumber, rating: 4.8, discount: '20% OFF', badge: 'Top Pick', category: 'Plumber' },
    { id: 2, title: 'Electrician', image: Electrician, rating: 4.7, discount: '15% OFF', badge: 'Fast Service', category: 'Electrician' },
    { id: 3, title: 'House Cleaning', image: HouseCleaning, rating: 4.9, discount: '25% OFF', badge: 'Best Rated', category: 'Cleaning' },
    { id: 4, title: 'AC Repair', image: AcRepair, rating: 4.6, discount: '10% OFF', badge: 'Summer Deal', category: 'AC Repair' },
    { id: 5, title: 'Carpentry', image: Carpentry, rating: 4.5, discount: '18% OFF', badge: 'Expert Pros', category: 'Carpentry' },
    { id: 6, title: 'Painting', image: Painting, rating: 4.7, discount: '12% OFF', badge: 'Premium', category: 'Painting' },
];

const StarRating = ({ rating }) => (
    <div className="svc-card__stars">
        <span className="svc-card__star-fill">{rating}</span>
        <StarIcon className="svc-card__star-icon" aria-hidden="true" />
        <span className="svc-card__reviews">({rating >= 4.8 ? '2.3k+' : rating >= 4.7 ? '1.8k+' : '1k+'})</span>
    </div>
);

const Services = () => {
    const navigate = useNavigate();
    const trackRef = useRef(null);

    const scroll = (dir) => {
        if (trackRef.current) {
            trackRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
        }
    };

    return (
        <section className="svc">
            <div className="svc__inner container">
                <div className="svc__header">
                    <div className="svc__header-left">
                        <h2 className="svc__title">Best of HelperLoc Services</h2>
                        <p className="svc__subtitle">Trusted professionals for every home need</p>
                    </div>
                    <div className="svc__header-right">
                        <button className="svc__view-all" onClick={() => navigate('/worker-category')}>
                            View All
                            <FaArrowRight aria-hidden="true" />
                        </button>
                        <div className="svc__arrows">
                            <button className="svc__arrow" onClick={() => scroll(-1)} aria-label="Previous">
                                <FaChevronLeft aria-hidden="true" />
                            </button>
                            <button className="svc__arrow" onClick={() => scroll(1)} aria-label="Next">
                                <FaChevronRight aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="svc__track" ref={trackRef}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="svc-card"
                            onClick={() => navigate(`/worker-category/listed-worker/${service.category}`)}
                        >
                            <span className="svc-card__badge">{service.badge}</span>

                            <div className="svc-card__img-wrap">
                                <img src={service.image} alt={service.title} className="svc-card__img" />
                            </div>

                            <div className="svc-card__info">
                                <h3 className="svc-card__title">{service.title}</h3>
                                <StarRating rating={service.rating} />
                                <div className="svc-card__bottom">
                                    <span className="svc-card__discount">{service.discount}</span>
                                    <button
                                        className="svc-card__btn"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigate(`/worker-category/listed-worker/${service.category}`);
                                        }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
