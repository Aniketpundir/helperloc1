import ReviewCard from "../ReviewCard/ReviewCard";
import "./ReviewList.css";

// Filter logic
function filterReviews(reviews, filter) {
    switch (filter) {
        case "5 Stars":
            return reviews.filter((r) => r.rating === 5);
        case "4 Stars":
            return reviews.filter((r) => r.rating === 4);
        case "3 Stars & Under":
            return reviews.filter((r) => r.rating <= 3);
        default:
            return reviews;
    }
}

// Paginate helper
function paginate(reviews, page, perPage) {
    const start = (page - 1) * perPage;
    return reviews.slice(start, start + perPage);
}

const PER_PAGE = 5;

export default function ReviewList({
    activeFilter,
    currentPage,
    loading = false,
    reviews = [],
}) {
    const filtered = filterReviews(reviews, activeFilter);
    const paged = paginate(filtered, currentPage, PER_PAGE);

    if (loading) {
        return (
            <div className="review-list">
                <div className="review-list__empty">
                    <div className="review-list__empty-icon">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                    </div>
                    <p className="review-list__empty-text">Loading client reviews...</p>
                </div>
            </div>
        );
    }

    if (paged.length === 0) {
        return (
            <div className="review-list">
                <div className="review-list__empty">
                    <div className="review-list__empty-icon">
                        <span className="material-symbols-outlined">reviews</span>
                    </div>
                    <p className="review-list__empty-text">
                        No reviews found for this filter.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="review-list">
            {paged.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    );
}

export { filterReviews, PER_PAGE };
