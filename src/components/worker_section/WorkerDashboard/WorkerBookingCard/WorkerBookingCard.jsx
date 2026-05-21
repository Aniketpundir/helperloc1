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
    onViewDetails,
}) {
    const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.soon;
    const isCancelled = status === 'cancelled';

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
                </div>
            </div>
        </div>
    );
}