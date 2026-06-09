import { useEffect, useState } from 'react';
import './RateBookingModal.css';

export default function RateBookingModal({ booking, loading, onClose, onSubmit }) {
    const [rating, setRating] = useState(booking?.rating || 5);
    const [comment, setComment] = useState(booking?.review || '');

    useEffect(() => {
        if (!booking) return;
        setRating(booking.rating || 5);
        setComment(booking.review || '');
    }, [booking]);

    if (!booking) return null;

    return (
        <div className="rate-modal" onClick={onClose}>
            <div className="rate-modal__card" onClick={(event) => event.stopPropagation()}>
                <button className="rate-modal__close" onClick={onClose} aria-label="Close">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <p className="rate-modal__eyebrow">{booking.isRated ? 'Edit Review' : 'Rate Completed Work'}</p>
                <h2 className="rate-modal__title">{booking.title}</h2>
                <p className="rate-modal__worker">Worker: {booking.workerName}</p>

                <div className="rate-modal__stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`rate-modal__star${star <= rating ? ' rate-modal__star--active' : ''}`}
                            onClick={() => setRating(star)}
                            aria-label={`${star} star`}
                        >
                            <span className="material-symbols-outlined">star</span>
                        </button>
                    ))}
                </div>

                <textarea
                    className="rate-modal__textarea"
                    rows={4}
                    maxLength={500}
                    placeholder="Tell us about the service..."
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <p className="rate-modal__counter">{comment.length}/500</p>

                <div className="rate-modal__actions">
                    <button className="rate-modal__btn rate-modal__btn--ghost" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button
                        className="rate-modal__btn rate-modal__btn--primary"
                        onClick={() => onSubmit({ rating, comment })}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : booking.isRated ? 'Update Review' : 'Submit Rating'}
                    </button>
                </div>
            </div>
        </div>
    );
}
