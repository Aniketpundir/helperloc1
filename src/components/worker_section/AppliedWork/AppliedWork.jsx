import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WorkPostChatModal from "../../common/WorkPostChatModal/WorkPostChatModal";
import {
  fetchAppliedWork,
  requestWorkPostCompletionOtp,
  setAppliedWorkFilter,
  verifyWorkPostCompletionOtp,
  withdrawAppliedWork,
} from "../../../Redux/Slice/appliedWorkSlice";
import { openWorkPostChat } from "../../../Redux/Slice/workPostChatSlice";
import APStatsStrip from "./APStatsStrip/APStatsStrip";
import APProjectCard from "./APProjectCard/APProjectCard";
import APFilterDropdown from "./APFilterDropdown/APFilterDropdown";
import APFAB from "./APFAB/APFAB";
import "./AppliedWork.css";

export default function AppliedWork() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detailCard, setDetailCard] = useState(null);
  const {
    cards,
    counts,
    filter,
    loading,
    actionLoadingId,
    completionLoadingId,
    error,
  } = useSelector((state) => state.appliedWork);

  useEffect(() => {
    dispatch(fetchAppliedWork());
  }, [dispatch, filter]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const stats = [
    { id: "all", icon: "folder", count: counts.total, label: "Applied", colorClass: "ap-stats__icon--applied" },
    { id: "accepted", icon: "check_circle", count: counts.accepted, label: "Accepted", colorClass: "ap-stats__icon--accepted" },
    { id: "rejected", icon: "cancel", count: counts.rejected, label: "Rejected", colorClass: "ap-stats__icon--rejected" },
    { id: "pending", icon: "hourglass_top", count: counts.pending, label: "Pending", colorClass: "ap-stats__icon--pending" },
  ];

  const handleWithdraw = async (card) => {
    const result = await dispatch(withdrawAppliedWork(card.id));
    if (withdrawAppliedWork.fulfilled.match(result)) {
      toast.success("Application withdrawn.");
    }
  };

  const handleViewBooking = (card) => {
    setDetailCard(card);
  };

  const handleMessageClient = (card) => {
    dispatch(openWorkPostChat({
      workPostId: card.id,
      participantUserId: card.clientUserId,
    }));
  };

  const handleRequestWorkPostCompletionOtp = async (card) => {
    const sent = await dispatch(requestWorkPostCompletionOtp(card.id));
    if (!requestWorkPostCompletionOtp.fulfilled.match(sent)) return false;

    toast.success(sent.payload || "Completion OTP sent to client email.");
    return true;
  };

  const handleVerifyWorkPostCompletionOtp = async (card, otp) => {
    const verified = await dispatch(verifyWorkPostCompletionOtp({ postId: card.id, otp }));
    if (verifyWorkPostCompletionOtp.fulfilled.match(verified)) {
      toast.success("Project marked as completed.");
      return true;
    }

    return false;
  };

  const handleFindSimilar = (card) => {
    navigate(`/worker/available-work?type=${encodeURIComponent(card.category)}`);
  };

  const handleFilterChange = (nextFilter) => {
    dispatch(setAppliedWorkFilter(nextFilter));
  };

  return (
    <div className="ap-page">
      <div className="ap-page__header">
        <div>
          <h2 className="ap-page__title">Applied Projects</h2>
          <p className="ap-page__subtitle">Jobs you've shown interest in</p>
        </div>
        <APFilterDropdown value={filter} onChange={handleFilterChange} />
      </div>

      <APStatsStrip
        stats={stats}
        onStatClick={(statId) => dispatch(setAppliedWorkFilter(statId))}
      />

      <div className="ap-page__cards">
        {loading ? (
          <div className="ap-page__empty">
            <span className="material-symbols-outlined ap-page__empty-icon">
              hourglass_empty
            </span>
            <p>Loading applied projects...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="ap-page__empty">
            <span className="material-symbols-outlined ap-page__empty-icon">
              folder_open
            </span>
            <p>No projects found for this filter.</p>
          </div>
        ) : (
          cards.map((card) => (
            <APProjectCard
              key={card.id}
              card={card}
              actionLoadingId={actionLoadingId}
              completionLoadingId={completionLoadingId}
              onViewBooking={handleViewBooking}
              onMessageClient={handleMessageClient}
              onRequestCompletion={handleRequestWorkPostCompletionOtp}
              onVerifyCompletion={handleVerifyWorkPostCompletionOtp}
              onWithdraw={handleWithdraw}
              onFindSimilar={handleFindSimilar}
            />
          ))
        )}
      </div>

      <APFAB
        icon="add"
        tooltip="Find New Jobs"
        onClick={() => navigate("/worker/available-work")}
      />

      {detailCard && (
        <div className="ap-detail-modal" onClick={() => setDetailCard(null)}>
          <div className="ap-detail-modal__card" onClick={(event) => event.stopPropagation()}>
            <button
              className="ap-detail-modal__close"
              onClick={() => setDetailCard(null)}
              aria-label="Close details"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="ap-detail-modal__head">
              <div className="ap-detail-modal__icon">
                <span className="material-symbols-outlined">{detailCard.categoryIcon}</span>
              </div>
              <div>
                <p className="ap-detail-modal__category">{detailCard.category}</p>
                <h3 className="ap-detail-modal__title">{detailCard.title}</h3>
              </div>
            </div>

            <p className="ap-detail-modal__description">{detailCard.description}</p>

            <div className="ap-detail-modal__grid">
              <span><strong>Application Status:</strong> {detailCard.status}</span>
              <span><strong>Original Status:</strong> {detailCard.applicationStatus || "applied"}</span>
              <span><strong>Location:</strong> {detailCard.fullAddress || detailCard.location}</span>
              <span><strong>Preferred Date:</strong> {detailCard.date}</span>
              <span><strong>Applied On:</strong> {detailCard.appliedDate}</span>
              <span><strong>Workers Needed:</strong> {detailCard.workersNeeded}</span>
              <span><strong>Budget:</strong> Rs.{detailCard.budgetMin} - Rs.{detailCard.budgetMax}</span>
              <span><strong>Work ID:</strong> {detailCard.id}</span>
            </div>

            <div className="ap-detail-modal__actions">
              <button className="ap-btn ap-btn--outline" onClick={() => setDetailCard(null)}>
                Close
              </button>
              {detailCard.status === "accepted" && (
                <button
                  className="ap-btn ap-btn--primary"
                  onClick={() => {
                    handleMessageClient(detailCard);
                    setDetailCard(null);
                  }}
                >
                  <span className="material-symbols-outlined">chat</span>
                  Message Client
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <WorkPostChatModal />
    </div>
  );
}
