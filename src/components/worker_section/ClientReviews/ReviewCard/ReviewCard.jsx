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
    } = review;

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
        </article>
    );
}
