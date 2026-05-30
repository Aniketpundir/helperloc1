import React from 'react';
import './BookingConfirmed_Suggestions.css';

const BookingConfirmed_Suggestions = ({ suggestions }) => {
    return (
        <section className="booking-confirmed__suggestions">
            <h2 className="booking-confirmed__suggestions-title">You might also need</h2>
            <div className="booking-confirmed__suggestions-grid">
                {suggestions.map((item) => (
                    <div key={item.id} className="booking-confirmed__suggestion-card">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="booking-confirmed__suggestion-img"
                        />
                        <div className="booking-confirmed__suggestion-body">
                            <div className="booking-confirmed__suggestion-row">
                                <h3 className="booking-confirmed__suggestion-name">{item.title}</h3>
                                <span className="booking-confirmed__suggestion-rating">
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontVariationSettings: "'FILL' 1", color: '#F59E0B', fontSize: '16px' }}
                                    >
                                        star
                                    </span>
                                    {item.rating}
                                </span>
                            </div>
                            <p className="booking-confirmed__suggestion-desc">{item.desc}</p>
                            <button className="booking-confirmed__suggestion-btn">Book Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BookingConfirmed_Suggestions;