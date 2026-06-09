import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RatingSummary from "./RatingSummary/RatingSummary";
import ReviewFilters from "./ReviewFilters/ReviewFilters";
import ReviewList, { filterReviews, PER_PAGE } from "./ReviewList/ReviewList";
import Pagination from "./Pagination/Pagination";
import { fetchClientReviews } from "../../../Redux/Slice/clientReviewsSlice";
import "./ClientReviews.css";

export default function ClientReviews() {
    const dispatch = useDispatch();
    const { reviews, summary, loading, error } = useSelector((state) => state.clientReviews);
    const [activeFilter, setActiveFilter] = useState("All Reviews");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchClientReviews());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    // When filter changes, reset to page 1
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Compute total pages based on filtered count
    const filteredCount = filterReviews(reviews, activeFilter).length;
    const totalPages = Math.max(1, Math.ceil(filteredCount / PER_PAGE));

    return (
        <div className="client-reviews">
            {/* Page Header */}
            <div className="client-reviews__header">
                <h2 className="client-reviews__title">Client Reviews</h2>
                <p className="client-reviews__subtitle">What your clients are saying about you</p>
            </div>

            {/* Rating Summary Card */}
            <RatingSummary summary={summary} />

            {/* Filter Chips */}
            <ReviewFilters
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />

            {/* Review Cards */}
            <ReviewList
                activeFilter={activeFilter}
                currentPage={currentPage}
                loading={loading}
                reviews={reviews}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
