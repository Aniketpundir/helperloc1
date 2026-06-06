import { useState } from 'react';
import './BookingCard.css';

const BookingCard = ({
    title,
    priority,
    status,
    completed = false,
    icon,
    iconVariant,
    client,
    location,
    date,
    workers,
    amountRange,
    description,
    onAccept,
    onDecline,
    onMessage,
    onReschedule,
    completionLoading = false,
    onRequestCompletion,
    onVerifyCompletion,
}) => {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [otp, setOtp] = useState('');
    const isCancelled = status === 'cancelled';
    const isPending = status === 'pending';
    const isConfirmed = status === 'confirmed';

    const priorityLabel = {
        urgent: 'Urgent',
        soon: 'Soon',
        flexible: 'Flexible',
    }[priority];

    const statusLabel = {
        pending: 'Pending',
        confirmed: completed ? 'Completed' : 'Confirmed',
        cancelled: 'Cancelled',
    }[status];

    const handleRequestOtp = async () => {
        const sent = await onRequestCompletion?.();
        if (sent) setShowOtpBox(true);
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) return;

        const verified = await onVerifyCompletion?.(otp.trim());
        if (verified) {
            setOtp('');
            setShowOtpBox(false);
        }
    };

    return (
        <div className={`request-bookingcard${isCancelled ? ' request-bookingcard--cancelled' : ''}`}>

            {isCancelled && <div className="request-bookingcard__overlay" />}

            {/* Icon */}
            <div className={`request-bookingcard__icon-wrap request-bookingcard__icon-wrap--${iconVariant}`}>
                <span
                    className={`material-symbols-outlined request-bookingcard__icon request-bookingcard__icon--${iconVariant}`}
                    style={{ fontVariationSettings: "'FILL' 0" }}
                >
                    {icon}
                </span>
            </div>

            {/* Body */}
            <div className="request-bookingcard__body">

                {/* Title + Priority */}
                <div className="request-bookingcard__title-row">
                    <h3 className="request-bookingcard__title">{title}</h3>
                    <span className={`request-bookingcard__priority-badge request-bookingcard__priority-badge--${priority}`}>
                        {priorityLabel}
                    </span>
                </div>

                {/* Meta Grid */}
                <div className="request-bookingcard__meta-grid">
                    <p className={`request-bookingcard__meta-item${isCancelled ? ' request-bookingcard__meta-item--cancelled' : ''}`}>
                        <span className="material-symbols-outlined request-bookingcard__meta-icon">person</span>
                        {client}
                    </p>
                    <p className={`request-bookingcard__meta-item${isCancelled ? ' request-bookingcard__meta-item--cancelled' : ''}`}>
                        <span className="material-symbols-outlined request-bookingcard__meta-icon">location_on</span>
                        {location}
                    </p>
                    <p className={`request-bookingcard__meta-item${!isCancelled ? ' request-bookingcard__meta-item--date' : ' request-bookingcard__meta-item--cancelled'}`}>
                        <span className="material-symbols-outlined request-bookingcard__meta-icon">event</span>
                        {date}
                    </p>
                    <p className={`request-bookingcard__meta-item${isCancelled ? ' request-bookingcard__meta-item--cancelled' : ''}`}>
                        <span className="material-symbols-outlined request-bookingcard__meta-icon">group</span>
                        Workers Needed: {workers}
                    </p>
                </div>

                {/* Amount */}
                <p className={`request-bookingcard__amount${isCancelled ? ' request-bookingcard__amount--cancelled' : ''}`}>
                    {amountRange}
                </p>

                {/* Description */}
                <p className="request-bookingcard__desc">"{description}"</p>

            </div>

            {/* Right Column */}
            <div className="request-bookingcard__right">

                {/* Status Badge */}
                <span className={`request-bookingcard__status-badge request-bookingcard__status-badge--${status}`}>
                    {statusLabel}
                </span>

                {/* Actions */}
                {isPending && (
                    <div className="request-bookingcard__actions">
                        <button className="request-bookingcard__btn request-bookingcard__btn--accept" onClick={onAccept}>
                            Accept
                        </button>
                        <button className="request-bookingcard__btn request-bookingcard__btn--decline" onClick={onDecline}>
                            Decline
                        </button>
                        <button className="request-bookingcard__btn request-bookingcard__btn--message" onClick={onMessage}>
                            Message Client
                        </button>
                    </div>
                )}

                {isConfirmed && (
                    <div className="request-bookingcard__actions">
                        <button className="request-bookingcard__btn request-bookingcard__btn--message" onClick={onMessage}>
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chat</span>
                            Message
                        </button>
                        {!completed && (
                            <button className="request-bookingcard__btn request-bookingcard__btn--accept" onClick={handleRequestOtp} disabled={completionLoading}>
                                {completionLoading ? 'Sending OTP...' : 'Mark Complete'}
                            </button>
                        )}
                        {!completed && (
                            <button className="request-bookingcard__btn request-bookingcard__btn--outline" onClick={onReschedule}>
                            Reschedule
                            </button>
                        )}
                        {completed && (
                            <span className="request-bookingcard__complete-note">
                                Work completed
                            </span>
                        )}
                        {showOtpBox && !completed && (
                            <div className="request-bookingcard__otp-box">
                                <p className="request-bookingcard__otp-title">Enter client OTP</p>
                                <p className="request-bookingcard__otp-help">
                                    OTP was sent to the user email. Ask user and verify here.
                                </p>
                                <input
                                    className="request-bookingcard__otp-input"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    placeholder="6-digit OTP"
                                    value={otp}
                                    onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                                />
                                <button
                                    className="request-bookingcard__btn request-bookingcard__btn--accept"
                                    onClick={handleVerifyOtp}
                                    disabled={completionLoading || otp.trim().length < 4}
                                >
                                    {completionLoading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                                <button
                                    className="request-bookingcard__btn request-bookingcard__btn--outline"
                                    onClick={() => {
                                        setOtp('');
                                        setShowOtpBox(false);
                                    }}
                                    disabled={completionLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {isCancelled && (
                    <p className="request-bookingcard__cancel-note">Cancelled by Client</p>
                )}

            </div>
        </div>
    );
};

export default BookingCard;
