import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/worker-category/listed-worker/${encodeURIComponent(service.title)}`);
    };

    return (
        <div className="services__card">
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
                    onClick={handleBookNow}
                >
                    Book Now
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;