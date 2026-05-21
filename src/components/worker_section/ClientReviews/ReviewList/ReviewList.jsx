import ReviewCard from "../ReviewCard/ReviewCard";
import "./ReviewList.css";

const ALL_REVIEWS = [
    {
        id: 1,
        name: "Rajesh Kumar",
        location: "Delhi",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBZRyKrzHzipL5VsnJz6-l2eaeWozacCBZLFIYOh5ZkT-xbQmqiZssz-r0D5aVJV5eZLW1gQnu5LiZtHZcAMa50HsfQs7P7pHJUBXpOqyZXhOo8JJT4m-JD32m19j3vX8qHrAXBFYcbmty5AFA8Rvo494t3_mUU1C7-bBB3iHV84cpIOTxrIdijWveF81pY3zHmq-opmR40zlSZf1-16W1i2vQi-dveiMqNnznlGDp-b-cNvKsYz5oidHmkjaMCtxG2aRqAqb9q5fMW",
        time: "2 days ago",
        rating: 5,
        tag: "Electrician",
        text: "Very professional, arrived on time. Fixed the issue quickly. Highly recommend!",
        jobFor: "Fix leaking tap in kitchen",
        initialReply: null,
    },
    {
        id: 2,
        name: "Priya Mehta",
        location: "Noida",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDciQ5Sy9iaP9Fm629bRv423YjYqCpstqYgaB4RrYeaPmcwOacXrfJ0zVW5uo8zgOREFQlb5vOaFJrtc9kuKhoREU3vgzqAy35ewmmXNbeaEPJ7hhGKEr4JMx_6W0QXvwg_SATsKxAGf2bbnkygsxTEjbaHABpJqZN9dmMjDV4slsm9tqQq1eHcT4LCbbmc5H9lXYTX_JNBPZR6pPknYeIGccRlS6L2_BsJFxjuq-u53R3Jck5MMapPffvq8sVo45eYwhcuU5NmqWJs",
        time: "5 days ago",
        rating: 5,
        tag: "Electrician",
        text: "Excellent work. Clean and efficient. Will book again for sure.",
        jobFor: "Living room wiring repair",
        initialReply:
            "Thank you Priya! It was a pleasure helping you out. Let me know if you need anything else.",
    },
    {
        id: 3,
        name: "Sunita Sharma",
        location: "Gurgaon",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCYIUnDr27SuYas5cqf401KWjVsv7NeWHxD68JXPQAEUPd4-rZJnUGWSRKpldyZ8SiXgQGrHWDbXCvY85FrmZ9A663ZnIz2csFjvGbbxXdBFjFU7oPbTKwIlL-K_50GNB1ytFac8jXmSPi4VWPs-pAgE6xmj2Hcb1R1L8X2yBhmhX1UcpkXH_2W4vgRxFBUbc20rPauoG5woQ21B0LDYjiU3Rf-MH8UHpVDcGloEhE2pFXtmgUaIaUcXqC8KWFDb_7aIAlWf3o9C0XS",
        time: "1 week ago",
        rating: 4,
        tag: "Electrician",
        text: "Good work overall. Slight delay in arrival but quality of work was great.",
        jobFor: "Ceiling fan installation",
        initialReply: null,
    },
    {
        id: 4,
        name: "Arjun Singh",
        location: "Delhi",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuChDijQlzO_AHBZ3WM51w9K0zCZZBJmAa0OjzvlHKpXBI_btzAPJKpIyxinPuPagXxJAkLy7Th7jR3HiUyuy9b851Md6dwoDM3Y_iz3JDP803pBq7c5JNTKn1ATR0N19yBlyWML1b6hFbOTU7LvOdjLe6rtbOMTkI1_hX9L8Zm3GjD2fYsGtBgNPMZuqC68rYOb1zE_TFeXZP7UJBkfpCdSQRCuqLhqPxsfz--kIwjP6wJTM5mK4BLya4j4GhrHnpGDhtmpcCArwa3u",
        time: "2 weeks ago",
        rating: 5,
        tag: "Electrician",
        text: "Best electrician I've hired via HelperLoc. Transparent pricing, no hidden costs.",
        jobFor: "Distribution board replacement",
        initialReply:
            "Thank you for the kind words Arjun! I believe in complete transparency for all my clients.",
    },
    {
        id: 5,
        name: "Meena Gupta",
        location: "Faridabad",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAM1-R0CWnMlHFXXgJVDuP2mbmTqR7z_vuf7sdTSGDz7YnG3mI8f3QFMV0Tuy68ebaKdNebpYYyDdITfanQ1gkQCUK_UuFcIGg2_gnMLFZVCBS-YyR_5FlGG5QK5AJ5t1hbfY4rVwlSqsPdWz7x-htysQfvZkUvjbDhwN760XaN_M7dclwhQKguLw7ffEM0b0NrSJAVqgXFpw5llKfCyDi0QVDhPXSHR11I7B4vkSFLB3aCuqkdhuG7iJd51_3HRWHkStnH6hPvZU_n",
        time: "3 weeks ago",
        rating: 3,
        tag: "Electrician",
        text: "Work was okay but took longer than expected.",
        jobFor: "Multiple switch replacement",
        initialReply: null,
    },
];

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

export default function ReviewList({ activeFilter, currentPage }) {
    const filtered = filterReviews(ALL_REVIEWS, activeFilter);
    const paged = paginate(filtered, currentPage, PER_PAGE);

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

export { ALL_REVIEWS, filterReviews, PER_PAGE };