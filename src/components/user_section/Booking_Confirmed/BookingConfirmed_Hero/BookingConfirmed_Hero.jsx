import React from 'react';
import './BookingConfirmed_Hero.css';

const BookingConfirmed_Hero = ({ bookingId, workerName }) => {
    return (
        <section className="booking-confirmed__hero">
            <div className="booking-confirmed__hero-icon-wrap">
                <div className="booking-confirmed__hero-pulse"></div>
                <div className="booking-confirmed__hero-icon">
                    <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        check_circle
                    </span>
                </div>
            </div>

            <h1 className="booking-confirmed__hero-title">Booking Confirmed!</h1>
            <p className="booking-confirmed__hero-subtitle">
                Your booking with {workerName} has been successfully placed. Get ready!
            </p>

            <div className="booking-confirmed__hero-badges">
                <span className="booking-confirmed__hero-badge booking-confirmed__hero-badge--id">
                    {bookingId}
                </span>
                <span className="booking-confirmed__hero-badge booking-confirmed__hero-badge--confirmed">
                    <span className="material-symbols-outlined">verified</span>
                    Confirmed
                </span>
                <span className="booking-confirmed__hero-badge booking-confirmed__hero-badge--sms">
                    <span className="material-symbols-outlined">sms</span>
                    SMS Sent
                </span>
                <span className="booking-confirmed__hero-badge booking-confirmed__hero-badge--payment">
                    <span className="material-symbols-outlined">lock</span>
                    Payment Secured
                </span>
            </div>
        </section>
    );
};

export default BookingConfirmed_Hero;