import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Addresses from '../../user_dashboard/UserProfile/Addresses/Addresses';
import './WorkerDetail_BookingForm.css';

const dateSlots = [
    { label: 'Today', date: '24 Oct' },
    { label: 'Tomorrow', date: '25 Oct' },
    { label: 'Day After', date: '26 Oct' },
];

const timeSlots = [
    { emoji: '🌅', time: '7:00 AM' },
    { emoji: '🌅', time: '10:00 AM' },
    { emoji: '🏙️', time: '1:00 PM' },
    { emoji: '🌆', time: '4:00 PM' },
];

const WorkerDetail_BookingForm = ({ worker }) => {
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(1);
    const [workerCount, setWorkerCount] = useState(1);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // Redux se addresses lo
    const addresses = useSelector(state => state.address.addresses);

    const updateCounter = (val) => setWorkerCount(prev => Math.max(1, prev + val));

 const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAddressId) {
        alert('Please select a service address!');
        return;
    }

    // Selected address ka pura data Redux se nikalo
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);

    const bookingData = {
        category: worker.category,
        date: dateSlots[selectedDate],
        time: timeSlots[selectedTime].time,
        workerCount,
        address: {
            id: selectedAddress.id,
            label: selectedAddress.label,
            addressType: selectedAddress.addressType,
            street: selectedAddress.street,
            area: selectedAddress.area,
            city: selectedAddress.city,
            state: selectedAddress.state,
            pincode: selectedAddress.pincode,
        },
    };

    console.log('✅ Booking Data:', bookingData);
    alert(`Booking Confirmed!\n📍 Address: ${selectedAddress.label} — ${selectedAddress.city}`);
};

    const selectedAddress = addresses.find(a => a.id === selectedAddressId);

    return (
        <div className="worker-detail__booking-card">
            <h2 className="worker-detail__booking-title">Book {worker.name}</h2>

            <form className="worker-detail__booking-form" onSubmit={handleSubmit}>

                {/* ── Addresses Component ── */}
                <div className="worker-detail__booking-field">
                    <Addresses
                        selectedAddressId={selectedAddressId}
                        onSelect={setSelectedAddressId}
                        isBookingMode={true}
                    />
                </div>

                {/* ── Work Description ── */}
                <div className="worker-detail__booking-field">
                    <label className="worker-detail__booking-label">Work Needed</label>
                    <textarea
                        className="worker-detail__booking-textarea"
                        placeholder="Describe the electrical issue or task..."
                        rows={3}
                    />
                </div>

                {/* ── Date Selection ── */}
                <div className="worker-detail__booking-field">
                    <label className="worker-detail__booking-label">Select Date</label>
                    <div className="worker-detail__booking-date-row">
                        {dateSlots.map((slot, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`worker-detail__booking-date-pill${selectedDate === i ? ' worker-detail__booking-date-pill--active' : ''}`}
                                onClick={() => setSelectedDate(i)}
                            >
                                <span className="worker-detail__booking-date-day">{slot.label}</span>
                                <span className="worker-detail__booking-date-num">{slot.date}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Time Slots ── */}
                <div className="worker-detail__booking-field">
                    <label className="worker-detail__booking-label">Select Time Slot</label>
                    <div className="worker-detail__booking-time-grid">
                        {timeSlots.map((slot, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`worker-detail__booking-time-pill${selectedTime === i ? ' worker-detail__booking-time-pill--active' : ''}`}
                                onClick={() => setSelectedTime(i)}
                            >
                                {slot.emoji} {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Worker Counter & Instructions ── */}
                <div className="worker-detail__booking-row">
                    <div className="worker-detail__booking-field">
                        <label className="worker-detail__booking-label">Number of Workers</label>
                        <div className="worker-detail__booking-counter">
                            <button type="button" className="worker-detail__booking-counter-btn" onClick={() => updateCounter(-1)}>
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <span className="worker-detail__booking-counter-val">{workerCount}</span>
                            <button type="button" className="worker-detail__booking-counter-btn" onClick={() => updateCounter(1)}>
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </div>
                    <div className="worker-detail__booking-field">
                        <label className="worker-detail__booking-label">Special Instructions</label>
                        <input
                            className="worker-detail__booking-input"
                            type="text"
                            placeholder="E.g. Call before arrival"
                        />
                    </div>
                </div>

                {/* ── Booking Summary ── */}
                <div className="worker-detail__booking-summary">
                    <h3 className="worker-detail__booking-summary-title">Booking Summary</h3>
                    <div className="worker-detail__booking-summary-rows">
                        <div className="worker-detail__booking-summary-row">
                            <span className="worker-detail__booking-summary-key">Worker</span>
                            <span className="worker-detail__booking-summary-val">
                                {worker.name} ({worker.category})
                            </span>
                        </div>
                        <div className="worker-detail__booking-summary-row">
                            <span className="worker-detail__booking-summary-key">Scheduled For</span>
                            <span className="worker-detail__booking-summary-val">
                                {dateSlots[selectedDate].label}, {dateSlots[selectedDate].date} at {timeSlots[selectedTime].time}
                            </span>
                        </div>
                        {selectedAddress && (
                            <div className="worker-detail__booking-summary-row">
                                <span className="worker-detail__booking-summary-key">Address</span>
                                <span className="worker-detail__booking-summary-val">
                                    {selectedAddress.label} — {selectedAddress.city}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="worker-detail__booking-summary-total">
                        <span className="worker-detail__booking-summary-total-label">Est. Budget</span>
                        <span className="worker-detail__booking-summary-total-val">₹600 – ₹800</span>
                    </div>
                    <div className="worker-detail__booking-summary-note">
                        <span className="material-symbols-outlined">info</span>
                        <p>Payment will be held in escrow and released only after job completion.</p>
                    </div>
                </div>

                {/* ── Submit ── */}
                <button className="worker-detail__booking-submit" type="submit">
                    <span className="material-symbols-outlined">calendar_today</span>
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default WorkerDetail_BookingForm;