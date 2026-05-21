import { useState } from "react";
import "./ReviewCard.css";

function StarRow({ rating, size = "card" }) {
    return (
        <div className="review-card__stars">
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={`material-symbols-outlined review-card__star ${i <= rating ? "review-card__star--filled" : ""
                        }`}
                >
                    star
                </span>
            ))}
        </div>
    );
}

export default function ReviewCard({ review }) {
    const {
        name,
        location,
        avatar,
        time,
        rating,
        tag,
        text,
        jobFor,
        initialReply = null,
    } = review;

    const [reply, setReply] = useState(initialReply);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState(initialReply || "");

    const handleReplyClick = () => {
        setInputValue(reply || "");
        setShowInput(true);
    };

    const handleSubmit = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setReply(trimmed);
        setShowInput(false);
    };

    const handleCancel = () => {
        setInputValue(reply || "");
        setShowInput(false);
    };

    return (
        <article className="review-card">
            {/* Header */}
            <div className="review-card__header">
                <div className="review-card__user">
                    <img
                        src={avatar}
                        alt={`${name} Avatar`}
                        className="review-card__avatar"
                    />
                    <div>
                        <p className="review-card__name">{name}</p>
                        <p className="review-card__location">{location}</p>
                    </div>
                </div>
                <time className="review-card__time">{time}</time>
            </div>

            {/* Stars + Tag */}
            <div className="review-card__meta">
                <StarRow rating={rating} />
                <span className="review-card__tag">{tag}</span>
            </div>

            {/* Review text */}
            <p className="review-card__text">"{text}"</p>
            <p className="review-card__job">For: {jobFor}</p>

            {/* Reply Section */}
            {!showInput ? (
                reply ? (
                    // Existing reply shown
                    <div className="review-card__reply-box">
                        <div className="review-card__reply-box-header">
                            <span className="review-card__reply-box-title">Your Reply:</span>
                            <button
                                className="review-card__reply-box-edit"
                                onClick={handleReplyClick}
                            >
                                Edit Reply
                            </button>
                        </div>
                        <p className="review-card__reply-box-text">"{reply}"</p>
                    </div>
                ) : (
                    // No reply yet
                    <div className="review-card__footer">
                        <button
                            className="review-card__reply-btn"
                            onClick={handleReplyClick}
                        >
                            Reply to Review
                        </button>
                    </div>
                )
            ) : (
                // Input shown for new reply or edit
                <div className="review-card__reply-input-wrap">
                    <textarea
                        className="review-card__reply-textarea"
                        placeholder="Write your reply..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                    />
                    <div className="review-card__reply-actions">
                        <button className="review-card__reply-submit" onClick={handleSubmit}>
                            {reply ? "Save Changes" : "Submit Reply"}
                        </button>
                        <button className="review-card__reply-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}