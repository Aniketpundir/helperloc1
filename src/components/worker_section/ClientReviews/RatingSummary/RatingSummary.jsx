import { useEffect, useRef, useState } from "react";
import "./RatingSummary.css";

const fallbackSummary = {
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: [5, 4, 3, 2, 1].map((rating) => ({ rating, count: 0, percent: 0 })),
};

const getStarType = (index, averageRating) => {
    if (averageRating >= index) return "filled";
    if (averageRating > index - 1) return "partial";
    return "empty";
};

export default function RatingSummary({ summary = fallbackSummary }) {
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);
    const averageRating = Number(summary.averageRating || 0);
    const bars = summary.ratingCounts?.length ? summary.ratingCounts : fallbackSummary.ratingCounts;

    useEffect(() => {
        setAnimated(false);
        const timer = setTimeout(() => setAnimated(true), 200);
        return () => clearTimeout(timer);
    }, [summary]);

    return (
        <section className="rating-summary" ref={ref}>
            {/* Overall Score */}
            <div className="rating-summary__score-block">
                <span className="rating-summary__big-number">{averageRating.toFixed(1)}</span>
                <div className="rating-summary__stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`material-symbols-outlined rating-summary__star rating-summary__star--${getStarType(star, averageRating)}`}
                        >
                            star
                        </span>
                    ))}
                </div>
                <span className="rating-summary__count">Based on {summary.totalReviews || 0} reviews</span>
            </div>

            {/* Rating Bars */}
            <div className="rating-summary__bars">
                {bars.map((bar) => (
                    <div className="rating-summary__bar-row" key={bar.rating}>
                        <span className="rating-summary__bar-label">{bar.rating} Star</span>
                        <div className="rating-summary__bar-track">
                            <div
                                className="rating-summary__bar-fill"
                                style={{ width: animated ? `${bar.percent}%` : "0%" }}
                            />
                        </div>
                        <span className="rating-summary__bar-count">{bar.count}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
