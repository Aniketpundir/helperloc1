import './BookingCard.css';

const STATUS_CONFIG = {
    completed: {
        label: 'Completed',
        className: 'past-card__badge--completed',
    },
    pending: {
        label: 'Completed',
        className: 'past-card__badge--completed',
    },
    cancelled: {
        label: 'Cancelled',
        className: 'past-card__badge--cancelled',
    },
};

function Stars({ count = 5 }) {
    return (
        <div className="past-card__stars">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="material-symbols-outlined past-card__star">star</span>
            ))}
        </div>
    );
}

export default function BookingCard({
    status = 'completed',
    image,
    imageAlt,
    title,
    date,
    price,
    paymentNote,
    review,
    cancelReason,
    refundStatus,
    onHire,
    onRate,
    onShare,
}) {
    const badgeCfg = STATUS_CONFIG[status] || STATUS_CONFIG.completed;
    const isCancelled = status === 'cancelled';

    return (
        <div className={`past-card ${isCancelled ? 'past-card--cancelled' : ''}`}>

            {/* Image */}
            <div className="past-card__img-wrap">
                <img src={image} alt={imageAlt} className="past-card__img" />
            </div>

            {/* Content */}
            <div className="past-card__content">

                {/* Top row: info + price */}
                <div className="past-card__top">
                    <div>
                        <span className={`past-card__badge ${badgeCfg.className}`}>
                            {badgeCfg.label}
                        </span>
                        <h3 className="past-card__title">{title}</h3>
                        <p className="past-card__date">
                            <span className="material-symbols-outlined past-card__date-icon">calendar_today</span>
                            {date}
                        </p>
                    </div>
                    <div className="past-card__price-wrap">
                        {/* <p className={`past-card__price ${isCancelled ? 'past-card__price--cancelled' : ''}`}>
                            {price}
                        </p> */}
                        {/* {paymentNote && (
                            <p className="past-card__payment-note">{paymentNote}</p>
                        )} */}
                    </div>
                </div>

                {/* Review box */}
                {review && (
                    <div className="past-card__review">
                        <div className="past-card__review-top">
                            <Stars />
                            <span className="past-card__review-text">"{review}"</span>
                        </div>
                    </div>
                )}

                {/* Cancel info */}
                {isCancelled && (
                    <div className="past-card__cancel-info">
                        <div className="past-card__cancel-reason">
                            <span className="material-symbols-outlined past-card__cancel-icon">info</span>
                            Reason: {cancelReason}
                        </div>
                        {refundStatus && (
                            <div className="past-card__refund">
                                <span className="material-symbols-outlined past-card__refund-icon">payments</span>
                                Refund Status: {refundStatus}
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons — har card mein */}
                <div className="past-card__actions">
                    <button className="past-card__btn past-card__btn--hire" onClick={onHire}>
                        <span className="material-symbols-outlined">replay</span>
                        Hire Again
                    </button>
                    <button className="past-card__btn past-card__btn--rate" onClick={onRate}>
                        <span className="material-symbols-outlined">rate_review</span>
                        Rate Now
                    </button>
                    <button className="past-card__btn past-card__btn--share" onClick={onShare}>
                        <span className="material-symbols-outlined">share</span>
                        Share
                    </button>
                </div>

            </div>
        </div>
    );
}