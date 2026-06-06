import { useState } from 'react';
import './WorkerBookingCard.css';

const STATUS_CONFIG = {
    pending: { label: 'Pending', className: 'worker-booking-card__status--pending' },
    confirmed: { label: 'Confirmed', className: 'worker-booking-card__status--confirmed' },
    cancelled: { label: 'Cancelled', className: 'worker-booking-card__status--cancelled' },
};

const PRIORITY_CONFIG = {
    urgent: { label: 'Urgent', className: 'worker-booking-card__priority--urgent' },
    soon: { label: 'Soon', className: 'worker-booking-card__priority--soon' },
    flexible: { label: 'Flexible', className: 'worker-booking-card__priority--flexible' },
};

export default function WorkerBookingCard({
    icon = 'work',
    title,
    customerName,
    location,
    dateTime,
    status = 'pending',
    priority = 'soon',
    completionLoading = false,
    completed = false,
    onViewDetails,
    onRequestCompletion,
    onVerifyCompletion,
}) {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [otp, setOtp] = useState('');
    const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.soon;
    const isCancelled = status === 'cancelled';

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
        <div className={`worker-booking-card ${isCancelled ? 'worker-booking-card--cancelled' : ''}`}>
            {/* Top row */}
            <div className="worker-booking-card__top">
                <div className="worker-booking-card__left">
                    <div className="worker-booking-card__icon-wrap">
                        <span className="material-symbols-outlined worker-booking-card__icon">{icon}</span>
                    </div>
                    <div>
                        <h3 className="worker-booking-card__title">{title}</h3>
                        <div className="worker-booking-card__meta">
                            <span className="worker-booking-card__meta-item">
                                <span className="material-symbols-outlined worker-booking-card__meta-icon">person</span>
                                {customerName}
                            </span>
                            <span className="worker-booking-card__meta-item">
                                <span className="material-symbols-outlined worker-booking-card__meta-icon">location_on</span>
                                {location}
                            </span>
                        </div>
                    </div>
                </div>
                <span className={`worker-booking-card__priority ${priorityCfg.className}`}>
                    {priorityCfg.label}
                </span>
            </div>

            {/* Bottom row */}
            <div className="worker-booking-card__bottom">
                <span className="worker-booking-card__datetime">🗓️ {dateTime}</span>
                <div className="worker-booking-card__actions">
                    <span className={`worker-booking-card__status ${statusCfg.className}`}>
                        {statusCfg.label}
                    </span>
                    <button className="worker-booking-card__view-btn" onClick={onViewDetails}>
                        View Details
                    </button>
                    {status === 'confirmed' && !completed && (
                        <button className="worker-booking-card__view-btn" onClick={handleRequestOtp} disabled={completionLoading}>
                            {completionLoading ? 'Sending OTP...' : 'Mark Complete'}
                        </button>
                    )}
                    {completed && (
                        <span className="worker-booking-card__status worker-booking-card__status--confirmed">
                            Completed
                        </span>
                    )}
                </div>
            </div>

            {showOtpBox && status === 'confirmed' && !completed && (
                <div className="worker-booking-card__otp-box">
                    <div>
                        <p className="worker-booking-card__otp-title">Enter client OTP</p>
                        <p className="worker-booking-card__otp-help">
                            Ask the client for the OTP sent to their email, then verify here.
                        </p>
                    </div>
                    <div className="worker-booking-card__otp-actions">
                        <input
                            className="worker-booking-card__otp-input"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="6-digit OTP"
                            value={otp}
                            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                        />
                        <button
                            className="worker-booking-card__otp-btn"
                            onClick={handleVerifyOtp}
                            disabled={completionLoading || otp.trim().length < 4}
                        >
                            {completionLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button
                            className="worker-booking-card__otp-cancel"
                            onClick={() => {
                                setOtp('');
                                setShowOtpBox(false);
                            }}
                            disabled={completionLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
