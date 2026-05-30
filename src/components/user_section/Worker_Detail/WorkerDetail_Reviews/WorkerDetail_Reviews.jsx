import React from 'react';
import './WorkerDetail_Reviews.css';

const StarRating = ({ rating }) => {
    return (
        <div className="worker-detail__reviews-stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className="material-symbols-outlined worker-detail__reviews-star"
                    style={{
                        fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
                    }}
                >
                    star
                </span>
            ))}
        </div>
    );
};

const WorkerDetail_Reviews = ({ reviews, workerName, rating }) => {
    return (
        <div className="worker-detail__reviews">
            <div className="worker-detail__reviews-header">
                <h2 className="worker-detail__reviews-title">
                    What clients say about {workerName.split(' ')[0]}
                </h2>
                <div className="worker-detail__reviews-overall">
                    <span className="worker-detail__reviews-overall-val">{rating}</span>
                    <span
                        className="material-symbols-outlined worker-detail__reviews-overall-star"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        star
                    </span>
                </div>
            </div>

            <div className="worker-detail__reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="worker-detail__reviews-card">
                        <div className="worker-detail__reviews-card-top">
                            <div className="worker-detail__reviews-user">
                                <div
                                    className="worker-detail__reviews-avatar"
                                    style={{
                                        backgroundColor: review.avatarColor,
                                        color: review.avatarTextColor,
                                    }}
                                >
                                    {review.initials}
                                </div>
                                <div className="worker-detail__reviews-user-info">
                                    <p className="worker-detail__reviews-user-name">{review.name}</p>
                                    <p className="worker-detail__reviews-user-time">{review.time}</p>
                                </div>
                            </div>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="worker-detail__reviews-text">"{review.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkerDetail_Reviews;