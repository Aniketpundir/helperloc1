import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './WorkerCard.css';

export default function WorkerCard({ worker }) {
    const navigate = useNavigate();
    const { category } = useParams();

    const handleBookNow = () => {
        navigate(`/worker-category/listed-worker/${category}/${worker.id}`);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                className={`material-symbols-outlined fill-icon ${i < Math.floor(rating) ? 'Listed_Worker-star-filled' : 'Listed_Worker-star-empty'}`}
            >
                star
            </span>
        ));
    };

    return (
        <div className="Listed_Worker-card">
            <div className="Listed_Worker-card-header">
                {worker.verified && (
                    <div className="Listed_Worker-card-badge">
                        {worker.verificationBadge}
                    </div>
                )}
                <div className="Listed_Worker-card-image">
                    <img src={worker.image} alt={worker.name} />
                </div>
            </div>

            <div className="Listed_Worker-card-content">
                <h3 className="Listed_Worker-card-name">{worker.name}</h3>

                <div className="Listed_Worker-card-category">
                    <span className="Listed_Worker-category-badge">{worker.category}</span>
                </div>

                <div className="Listed_Worker-card-rating">
                    <div className="Listed_Worker-stars">
                        {renderStars(worker.rating)}
                    </div>
                    <span className="Listed_Worker-rating-number">{worker.rating}</span>
                    <span className="Listed_Worker-review-count">({worker.reviews} reviews)</span>
                </div>

                <div className="Listed_Worker-card-location">
                    <span className="material-symbols-outlined">location_on</span>
                    <span>{worker.location} • {worker.experience} yrs Exp.</span>
                </div>

                <hr className="Listed_Worker-card-divider" />

                <div className="Listed_Worker-card-skills">
                    {worker.skills.map((skill, index) => (
                        <span key={index} className="Listed_Worker-skill-tag">{skill}</span>
                    ))}
                </div>

                <div className="Listed_Worker-card-price">
                    <span className="Listed_Worker-price-amount">₹{worker.hourlyRate}</span>
                    <span className="Listed_Worker-price-unit">/hr</span>
                </div>

                <div className="Listed_Worker-card-actions">
                    <button className="Listed_Worker-btn-contact">
                        <span className="material-symbols-outlined">call</span>
                        Contact
                    </button>
                    <button
                        className="Listed_Worker-btn-book"
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}