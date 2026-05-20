import { useState } from 'react';
import './BookingCard.css';

export default function BookingCard({ booking }) {
    const [expanded, setExpanded] = useState(false);

    const {
        status, statusColor, statusBg, statusIcon,
        title, orderId, location,
        etaLabel, etaValue, etaColor,
        progress,
        worker,
        details,
        primaryAction,
    } = booking;

    return (
        <div className={`booking-card booking-card--${statusColor}`}>

            {/* ── Top row ── */}
            <div className="booking-card__top">
                <div>
                    <span className={`booking-card__badge booking-card__badge--${statusColor}`}>
                        {statusIcon === 'pulse' ? (
                            <span className={`booking-card__pulse booking-card__pulse--${statusColor}`} />
                        ) : (
                            <span className="material-symbols-outlined booking-card__badge-icon">{statusIcon}</span>
                        )}
                        {status}
                    </span>
                    <h3 className="booking-card__title">{title}</h3>
                    <p className="booking-card__meta">Order #{orderId} • {location}</p>
                </div>

                <div className="booking-card__eta">
                    <p className="booking-card__eta-label">{etaLabel}</p>
                    <p className={`booking-card__eta-value booking-card__eta-value--${etaColor}`}>{etaValue}</p>
                </div>
            </div>

            {/* ── Worker info ── */}
            <div className="booking-card__worker">
                <div className="booking-card__worker-left">
                    <div className="booking-card__worker-avatar-wrap">
                        <img className="booking-card__worker-avatar" src={worker.img} alt={worker.name} />
                        {worker.online && <span className="booking-card__worker-online" />}
                    </div>
                    <div>
                        <h4 className="booking-card__worker-name">{worker.name}</h4>
                        {worker.rating ? (
                            <div className="booking-card__worker-rating">
                                <span className="material-symbols-outlined booking-card__star">star</span>
                                <span className="booking-card__worker-rating-val">{worker.rating}</span>
                                <span className="booking-card__worker-services">{worker.services}</span>
                            </div>
                        ) : (
                            <p className="booking-card__worker-role">{worker.role}</p>
                        )}
                    </div>
                </div>

                <div className="booking-card__worker-actions">
                    {worker.showCall && (
                        <button className="booking-card__icon-btn booking-card__icon-btn--outline" aria-label="Call">
                            <span className="material-symbols-outlined">call</span>
                        </button>
                    )}
                    {worker.showChat && (
                        <button className="booking-card__icon-btn booking-card__icon-btn--filled" aria-label="Chat">
                            <span className="material-symbols-outlined">chat</span>
                        </button>
                    )}
                    {primaryAction && (
                        <button className={`booking-card__action-btn booking-card__action-btn--${statusColor}`}>
                            {primaryAction}
                        </button>
                    )}
                </div>
            </div>

            {/* ── Expandable details ── */}
            {details && (
                <div className="booking-card__details-section">
                    <button
                        className="booking-card__details-toggle"
                        onClick={() => setExpanded((p) => !p)}
                        aria-expanded={expanded}
                    >
                        <span>VIEW SERVICE DETAILS</span>
                        <span className={`material-symbols-outlined booking-card__chevron${expanded ? ' booking-card__chevron--open' : ''}`}>
                            expand_more
                        </span>
                    </button>

                    {expanded && (
                        <div className="booking-card__details-body">
                            <div className="booking-card__details-grid">
                                {/* Scope */}
                                <div>
                                    <p className="booking-card__details-heading">SERVICE SCOPE</p>
                                    <ul className="booking-card__scope-list">
                                        {details.scope.map((item) => (
                                            <li key={item.text} className={`booking-card__scope-item${item.done ? '' : ' booking-card__scope-item--pending'}`}>
                                                <span className="material-symbols-outlined">
                                                    {item.done ? 'check_circle' : 'radio_button_unchecked'}
                                                </span>
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Pricing */}
                                <div>
                                    <p className="booking-card__details-heading">PRICING BREAKDOWN</p>
                                    <div className="booking-card__pricing">
                                        {details.pricing.map((row) => (
                                            <div key={row.label} className="booking-card__pricing-row">
                                                <span>{row.label}</span>
                                                <span>{row.amount}</span>
                                            </div>
                                        ))}
                                        <div className="booking-card__pricing-total">
                                            <span>Total</span>
                                            <span>{details.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}