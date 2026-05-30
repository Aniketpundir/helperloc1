import React from 'react';
import './BookingConfirmed_Actions.css';

const BookingConfirmed_Actions = () => {
    return (
        <div className="booking-confirmed__actions">
            <div className="booking-confirmed__actions-left">
                <button className="booking-confirmed__actions-btn booking-confirmed__actions-btn--primary">
                    View My Bookings
                </button>
                <button className="booking-confirmed__actions-btn booking-confirmed__actions-btn--outline">
                    Message Worker
                </button>
                <button className="booking-confirmed__actions-btn booking-confirmed__actions-btn--neutral">
                    Book Another Worker
                </button>
            </div>
            <button className="booking-confirmed__actions-btn booking-confirmed__actions-btn--danger">
                Cancel Booking
            </button>
        </div>
    );
};

export default BookingConfirmed_Actions;