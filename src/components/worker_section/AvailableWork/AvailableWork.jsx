import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    applyToAvailableWork,
    clearAvailableWorkDetails,
    fetchAvailableWork,
    fetchAvailableWorkDetails,
    resetAvailableWorkFilters,
    setAvailableWorkFilters,
    setAvailableWorkPage,
    withdrawAvailableWorkApplication,
} from "../../../Redux/Slice/availableWorkSlice";
import AWPFilterBar from "./AWPFilterBar/AWPFilterBar";
import AWPStatsStrip from "./AWPStatsStrip/AWPStatsStrip";
import AWPWorkCard from "./AWPWorkCard/AWPWorkCard";
import AWPPagination from "./AWPPagination/AWPPagination";
import "./AvailableWork.css";

export default function AvailableWork() {
    const dispatch = useDispatch();
    const {
        posts,
        counts,
        pagination,
        page,
        loading,
        detailsLoading,
        actionLoadingId,
        selectedPost,
        error,
    } = useSelector((state) => state.availableWork);

    useEffect(() => {
        dispatch(fetchAvailableWork());
    }, [dispatch, page]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleApply = (filters) => {
        dispatch(setAvailableWorkFilters(filters));
        dispatch(fetchAvailableWork());
    };

    const handleReset = () => {
        dispatch(resetAvailableWorkFilters());
        dispatch(fetchAvailableWork());
    };

    const handleWantJob = async (card) => {
        const result = await dispatch(applyToAvailableWork(card.id));
        if (applyToAvailableWork.fulfilled.match(result)) {
            toast.success("Application sent successfully.");
        }
    };

    const handleWithdrawJob = async (card) => {
        const result = await dispatch(withdrawAvailableWorkApplication(card.id));
        if (withdrawAvailableWorkApplication.fulfilled.match(result)) {
            toast.success("Application withdrawn.");
        }
    };

    const handleViewDetails = (card) => {
        dispatch(fetchAvailableWorkDetails(card.id));
    };

    return (
        <div className="awp-page">
            <div className="awp-page__header">
                <div>
                    <h2 className="awp-page__title">Available Work Posts</h2>
                    <p className="awp-page__subtitle">Browse jobs posted by clients near you</p>
                </div>
                <div className="awp-page__location">
                    <span className="material-symbols-outlined awp-page__location-icon">location_on</span>
                    Delhi, India
                </div>
            </div>

            <AWPFilterBar onApply={handleApply} onReset={handleReset} />

            <AWPStatsStrip
                total={counts.total}
                urgent={counts.urgent}
                nearYou={counts.nearYou}
            />

            <div className="awp-page__cards">
                {loading ? (
                    <div className="awp-page__empty">
                        <span className="material-symbols-outlined awp-page__empty-icon">hourglass_empty</span>
                        <p>Loading available work posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="awp-page__empty">
                        <span className="material-symbols-outlined awp-page__empty-icon">search_off</span>
                        <p>No work posts match your filters.</p>
                    </div>
                ) : (
                    posts.map((card) => (
                        <AWPWorkCard
                            key={card.id}
                            card={card}
                            actionLoading={actionLoadingId}
                            onWantJob={handleWantJob}
                            onWithdrawJob={handleWithdrawJob}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                )}
            </div>

            {pagination.totalPages > 1 && (
                <AWPPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onChange={(nextPage) => dispatch(setAvailableWorkPage(nextPage))}
                />
            )}

            {(selectedPost || detailsLoading) && (
                <div className="awp-detail-modal" onClick={() => dispatch(clearAvailableWorkDetails())}>
                    <div className="awp-detail-modal__card" onClick={(event) => event.stopPropagation()}>
                        <button
                            className="awp-detail-modal__close"
                            onClick={() => dispatch(clearAvailableWorkDetails())}
                            aria-label="Close details"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {detailsLoading ? (
                            <div className="awp-detail-modal__loading">Loading details...</div>
                        ) : (
                            <>
                                <div className="awp-detail-modal__head">
                                    <span className="material-symbols-outlined awp-detail-modal__icon">
                                        {selectedPost.categoryIcon}
                                    </span>
                                    <div>
                                        <p className="awp-detail-modal__category">{selectedPost.category}</p>
                                        <h3 className="awp-detail-modal__title">{selectedPost.title}</h3>
                                    </div>
                                </div>

                                <p className="awp-detail-modal__description">{selectedPost.description}</p>

                                <div className="awp-detail-modal__grid">
                                    <span><strong>Address:</strong> {selectedPost.fullAddress || selectedPost.location}</span>
                                    <span><strong>Date:</strong> {selectedPost.date}</span>
                                    <span><strong>Workers:</strong> {selectedPost.workersNeeded}</span>
                                    <span><strong>Budget:</strong> Rs.{selectedPost.budgetMin} - Rs.{selectedPost.budgetMax}</span>
                                    <span><strong>Urgency:</strong> {selectedPost.urgency}</span>
                                    <span><strong>Status:</strong> {selectedPost.hasApplied ? "Applied" : "Open"}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
