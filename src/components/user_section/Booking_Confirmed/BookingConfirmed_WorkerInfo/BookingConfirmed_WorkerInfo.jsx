import React from 'react';
import './BookingConfirmed_WorkerInfo.css';

const BookingConfirmed_WorkerInfo = ({ worker }) => {
    return (
        <>
            {/* Worker Card */}
            <div className="booking-confirmed__worker-card">
                <h2 className="booking-confirmed__worker-card-heading">
                    <span className="material-symbols-outlined">person</span>
                    Your Worker
                </h2>

                {/* Avatar */}
                <div className="booking-confirmed__worker-avatar-wrap">
                    <div className="booking-confirmed__worker-avatar-inner">
                        <img
                            src={worker.image}
                            alt={worker.name}
                            className="booking-confirmed__worker-avatar"
                        />
                        {worker.verified && (
                            <div className="booking-confirmed__worker-verified">
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    verified
                                </span>
                            </div>
                        )}
                    </div>
                    <h3 className="booking-confirmed__worker-name">{worker.name}</h3>
                    <div className="booking-confirmed__worker-badges">
                        {worker.badges.map((badge, i) => (
                            <span key={i} className="booking-confirmed__worker-badge">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Worker Info Rows */}
                <div className="booking-confirmed__worker-info-list">
                    <div className="booking-confirmed__worker-info-row">
                        <span className="booking-confirmed__worker-info-key">Service</span>
                        <span className="booking-confirmed__worker-info-val">{worker.service}</span>
                    </div>
                    <div className="booking-confirmed__worker-info-row">
                        <span className="booking-confirmed__worker-info-key">Rating</span>
                        <span className="booking-confirmed__worker-info-val booking-confirmed__worker-info-val--rating">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontVariationSettings: "'FILL' 1", color: '#F59E0B', fontSize: '18px' }}
                            >
                                star
                            </span>
                            {worker.rating} ({worker.reviews} reviews)
                        </span>
                    </div>
                    <div className="booking-confirmed__worker-info-row">
                        <span className="booking-confirmed__worker-info-key">Location</span>
                        <span className="booking-confirmed__worker-info-val">{worker.location}</span>
                    </div>
                    <div className="booking-confirmed__worker-info-row">
                        <span className="booking-confirmed__worker-info-key">Experience</span>
                        <span className="booking-confirmed__worker-info-val">{worker.experience}</span>
                    </div>
                    <div className="booking-confirmed__worker-info-row">
                        <span className="booking-confirmed__worker-info-key">Rate</span>
                        <span className="booking-confirmed__worker-info-val booking-confirmed__worker-info-val--rate">
                            {worker.rate}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="booking-confirmed__worker-actions">
                    <button className="booking-confirmed__worker-btn booking-confirmed__worker-btn--primary">
                        <span className="material-symbols-outlined">chat</span>
                        Message
                    </button>
                    <button className="booking-confirmed__worker-btn booking-confirmed__worker-btn--outline">
                        <span className="material-symbols-outlined">call</span>
                        Call
                    </button>
                </div>

                {/* Cancellation Policy */}
                <div className="booking-confirmed__worker-policy">
                    <p>
                        <strong>Cancellation Policy:</strong> Free cancellation up to 4 hours before the scheduled time.
                        Cancellations within 4 hours may incur a convenience fee of ₹100.
                    </p>
                </div>
            </div>

            {/* Notifications Card */}
            <div className="booking-confirmed__notifications">
                <h4 className="booking-confirmed__notifications-title">
                    <span className="material-symbols-outlined">notifications_active</span>
                    Notifications Confirmed
                </h4>
                <div className="booking-confirmed__notifications-badges">
                    <span className="booking-confirmed__notifications-badge">SMS Sent</span>
                    <span className="booking-confirmed__notifications-badge">Email Sent</span>
                    <span className="booking-confirmed__notifications-badge">App Push</span>
                </div>
            </div>
        </>
    );
};

export default BookingConfirmed_WorkerInfo;