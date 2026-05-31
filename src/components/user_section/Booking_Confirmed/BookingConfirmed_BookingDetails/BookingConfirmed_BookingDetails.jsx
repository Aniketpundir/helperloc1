import React from 'react';
import './BookingConfirmed_BookingDetails.css';

const BookingConfirmed_BookingDetails = ({ bookingId, details, payment, timeline }) => {
    return (
        <div className="booking-confirmed__details-card">
            {/* Header */}
            <div className="booking-confirmed__details-header">
                <h2 className="booking-confirmed__details-title">
                    <span className="material-symbols-outlined">event_available</span>
                    Booking Details
                </h2>
                <span className="booking-confirmed__details-id">ID: {bookingId}</span>
            </div>

            {/* Details Grid */}
            <div className="booking-confirmed__details-grid">
                <div className="booking-confirmed__details-item">
                    <p className="booking-confirmed__details-label">Date</p>
                    <p className="booking-confirmed__details-value booking-confirmed__details-value--primary">{details.date}</p>
                </div>
                <div className="booking-confirmed__details-item">
                    <p className="booking-confirmed__details-label">Time</p>
                    <p className="booking-confirmed__details-value booking-confirmed__details-value--primary">{details.time}</p>
                </div>
                <div className="booking-confirmed__details-item">
                    <p className="booking-confirmed__details-label">Workers</p>
                    <p className="booking-confirmed__details-value">{details.workers}</p>
                </div>
                <div className="booking-confirmed__details-item">
                    <p className="booking-confirmed__details-label">Phone</p>
                    <p className="booking-confirmed__details-value">{details.phone}</p>
                </div>
                <div className="booking-confirmed__details-item booking-confirmed__details-item--full">
                    <p className="booking-confirmed__details-label">Address</p>
                    <p className="booking-confirmed__details-value">{details.address}</p>
                </div>
                <div className="booking-confirmed__details-item booking-confirmed__details-item--full">
                    <p className="booking-confirmed__details-label">Work Needed</p>
                    <p className="booking-confirmed__details-value">{details.workNeeded}</p>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="booking-confirmed__payment">
                <h4 className="booking-confirmed__payment-title">Payment Summary</h4>
                <div className="booking-confirmed__payment-rows">
                    <div className="booking-confirmed__payment-row">
                        <span>{payment.rateLabel}</span>
                        <span>{payment.rateValue}</span>
                    </div>
                    <div className="booking-confirmed__payment-row">
                        <span>{payment.durationLabel}</span>
                        <span>{payment.durationValue}</span>
                    </div>
                </div>
                <div className="booking-confirmed__payment-total">
                    <span className="booking-confirmed__payment-total-label">{payment.totalLabel}</span>
                    <span className="booking-confirmed__payment-total-val">{payment.totalValue}</span>
                </div>
            </div>

            {/* Booking Status Timeline */}
            <div className="booking-confirmed__timeline">
                <h4 className="booking-confirmed__timeline-title">Booking Status</h4>
                <div className="booking-confirmed__timeline-list">
                    {timeline.map((step, i) => (
                        <div key={i} className="booking-confirmed__timeline-item">
                            <div className="booking-confirmed__timeline-line-wrap">
                                <div className={`booking-confirmed__timeline-dot ${step.done ? 'booking-confirmed__timeline-dot--done' : ''}`}></div>
                                {i < timeline.length - 1 && (
                                    <div className={`booking-confirmed__timeline-connector ${step.done ? 'booking-confirmed__timeline-connector--done' : ''}`}></div>
                                )}
                            </div>
                            <div className={`booking-confirmed__timeline-content ${!step.done ? 'booking-confirmed__timeline-content--pending' : ''}`}>
                                <p className={`booking-confirmed__timeline-label ${step.done ? 'booking-confirmed__timeline-label--done' : ''}`}>
                                    {step.label}
                                </p>
                                <p className="booking-confirmed__timeline-desc">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmed_BookingDetails;