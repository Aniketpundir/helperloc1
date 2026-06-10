import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBooking } from '../../../../Redux/Slice/bookingCreateSlice';
import Addresses from '../../user_dashboard/UserProfile/Addresses/Addresses';
import './WorkerDetail_BookingForm.css';

const makeDateSlots = () => {
    const labels = ['Today', 'Tomorrow', 'Day After'];

    return labels.map((label, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        return {
            label,
            value: date.toISOString(),
            date: date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
            }),
        };
    });
};

const timeSlots = [
    { label: 'Morning', time: '7:00 AM' },
    { label: 'Morning', time: '10:00 AM' },
    { label: 'Afternoon', time: '1:00 PM' },
    { label: 'Evening', time: '4:00 PM' },
];

const getAddressId = (address) => address._id || address.id;

const WorkerDetail_BookingForm = ({
    worker,
    addresses = [],
    onAddAddress,
    onUpdateAddress,
    onDeleteAddress,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.bookingCreate);
    const { authMode } = useSelector((state) => state.auth);
    const dateSlots = useMemo(() => makeDateSlots(), []);
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(1);
    const [workerCount, setWorkerCount] = useState(1);
    const [estimatedHours] = useState(2);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [workDescription, setWorkDescription] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');

    const selectedAddress = addresses.find((address) => getAddressId(address) === selectedAddressId);
    const estimatedAmount = (worker.hourlyRate || 0) * workerCount * estimatedHours;

    const updateCounter = (value) => {
        setWorkerCount((prev) => Math.max(1, prev + value));
    };

    const handleSubmit = async (event) => {
        event?.preventDefault();

        if (authMode === 'worker') {
            toast.info('Please login as user first to book a worker.');
            return;
        }

        if (!selectedAddress) {
            toast.error('Please select a service address.');
            return;
        }

        const payload = {
            workerId: worker.id,
            serviceName: worker.category,
            workDescription,
            specialInstructions,
            scheduledDate: dateSlots[selectedDate].value,
            timeSlot: timeSlots[selectedTime].time,
            workerCount,
            estimatedHours,
            address: {
                label: selectedAddress.label,
                address: selectedAddress.address,
                city: selectedAddress.city || null,
                state: selectedAddress.state || null,
                pincode: selectedAddress.pincode || null,
            },
        };

        try {
            const booking = await dispatch(createBooking(payload)).unwrap();
            toast.success(`Booking confirmed with ${worker.name}.`);
            navigate(`/booking-confirmed?bookingId=${booking._id}`);
        } catch (message) {
            toast.error(message || 'Failed to confirm booking.');
        }
    };

    return (
        <div className="worker-detail__booking-card">
            <h2 className="worker-detail__booking-title">Book {worker.name}</h2>

            <div className="worker-detail__booking-form">
                <div className="worker-detail__booking-field">
                    <Addresses
                        addresses={addresses}
                        onAddAddress={onAddAddress}
                        onUpdateAddress={onUpdateAddress}
                        onDeleteAddress={onDeleteAddress}
                        selectedAddressId={selectedAddressId}
                        onSelect={setSelectedAddressId}
                        isBookingMode={true}
                        allowManageInBooking={true}
                    />
                </div>

                <div className="worker-detail__booking-field">
                    <label className="worker-detail__booking-label">Work Needed</label>
                    <textarea
                        className="worker-detail__booking-textarea"
                        placeholder="Describe the issue or task..."
                        rows={3}
                        value={workDescription}
                        onChange={(event) => setWorkDescription(event.target.value)}
                    />
                </div>

                <div className="worker-detail__booking-field">
                    <label className="worker-detail__booking-label">Select Date</label>
                    <div className="worker-detail__booking-date-row">
                        {dateSlots.map((slot, index) => (
                            <button
                                key={slot.label}
                                type="button"
                                className={`worker-detail__booking-date-pill${selectedDate === index ? ' worker-detail__booking-date-pill--active' : ''}`}
                                onClick={() => setSelectedDate(index)}
                            >
                                <span className="worker-detail__booking-date-day">{slot.label}</span>
                                <span className="worker-detail__booking-date-num">{slot.date}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="worker-detail__booking-field">
                    <label className="worker-detail__booking-label">Select Time Slot</label>
                    <div className="worker-detail__booking-time-grid">
                        {timeSlots.map((slot, index) => (
                            <button
                                key={slot.time}
                                type="button"
                                className={`worker-detail__booking-time-pill${selectedTime === index ? ' worker-detail__booking-time-pill--active' : ''}`}
                                onClick={() => setSelectedTime(index)}
                            >
                                {slot.label} {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

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
                            value={specialInstructions}
                            onChange={(event) => setSpecialInstructions(event.target.value)}
                        />
                    </div>
                </div>

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
                                    {selectedAddress.label} - {selectedAddress.address}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="worker-detail__booking-summary-total">
                        <span className="worker-detail__booking-summary-total-label">Est. Budget</span>
                        <span className="worker-detail__booking-summary-total-val">Rs.{estimatedAmount}</span>
                    </div>
                    <div className="worker-detail__booking-summary-note">
                        <span className="material-symbols-outlined">info</span>
                        <p>Payment will be held in escrow and released only after job completion.</p>
                    </div>
                </div>

                <button className="worker-detail__booking-submit" type="button" onClick={handleSubmit} disabled={loading}>
                    <span className="material-symbols-outlined">calendar_today</span>
                    {loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
};

export default WorkerDetail_BookingForm;
