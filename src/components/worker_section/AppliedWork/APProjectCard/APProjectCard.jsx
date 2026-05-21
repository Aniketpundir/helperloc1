import { useState } from "react";
import "./APProjectCard.css";

export default function APProjectCard({
  card,
  onViewBooking,
  onMessageClient,
  onWithdraw,
  onFindSimilar,
}) {
  const [withdrawn, setWithdrawn] = useState(false);

  const handleWithdraw = () => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setWithdrawn(true);
      onWithdraw && onWithdraw(card);
    }
  };

  const statusConfig = {
    accepted: {
      borderClass: "ap-project-card--accepted",
      badgeClass: "ap-badge--accepted",
      badgeIcon: "check_circle",
      badgeLabel: card?.successLabel || "Project Mila",
      footerClass: "ap-project-card__footer--accepted",
      footerIcon: "verified",
      footerText: "SUCCESS: PROJECT MILA CONFIRMED!",
    },
    pending: {
      borderClass: "ap-project-card--pending",
      badgeClass: "ap-badge--pending",
      badgeIcon: "pending",
      badgeLabel: "Pending",
    },
    rejected: {
      borderClass: "ap-project-card--rejected",
      badgeClass: "ap-badge--rejected",
      badgeIcon: "block",
      badgeLabel: "Nahi Mila",
      muted: true,
    },
  };

  const cfg = statusConfig[card.status] || statusConfig.pending;

  return (
    <div
      className={`ap-project-card ${cfg.borderClass} ${
        cfg.muted ? "ap-project-card--muted" : ""
      } ${withdrawn ? "ap-project-card--withdrawn" : ""}`}
    >
      {/* Muted overlay for rejected */}
      {cfg.muted && <div className="ap-project-card__overlay" />}

      <div className="ap-project-card__body">
        {/* Top Row */}
        <div className="ap-project-card__top-row">
          <div className="ap-project-card__category">
            <div className="ap-project-card__cat-icon">
              <span className="material-symbols-outlined">{card.categoryIcon}</span>
            </div>
            <span
              className={`ap-category-chip ${
                cfg.muted ? "ap-category-chip--muted" : "ap-category-chip--active"
              }`}
            >
              {card.category}
            </span>
          </div>

          <div className={`ap-badge ${cfg.badgeClass}`}>
            <span
              className="material-symbols-outlined ap-badge__icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {cfg.badgeIcon}
            </span>
            {cfg.badgeLabel}
          </div>
        </div>

        {/* Content Grid */}
        <div className="ap-project-card__grid">
          {/* Left: Info */}
          <div className="ap-project-card__info">
            <h3 className="ap-project-card__title">{card.title}</h3>
            <p className="ap-project-card__desc">{card.description}</p>

            <div className="ap-project-card__meta">
              <div className="ap-meta-item">
                <span className="material-symbols-outlined ap-meta-item__icon">location_on</span>
                <span>{card.location}</span>
              </div>
              <div className="ap-meta-item">
                <span className="material-symbols-outlined ap-meta-item__icon">event</span>
                <span>{card.date}</span>
              </div>
              <div className="ap-meta-item">
                <span className="material-symbols-outlined ap-meta-item__icon">group</span>
                <span>Workers Needed: {card.workersNeeded}</span>
              </div>
              <div className="ap-meta-item">
                <span className="material-symbols-outlined ap-meta-item__icon">schedule</span>
                <span>Applied: {card.appliedDate}</span>
              </div>
            </div>
          </div>

          {/* Right: Budget + Actions */}
          <div className="ap-project-card__actions">
            <p className="ap-project-card__budget-label">Estimated Budget</p>
            <p className="ap-project-card__budget">
              ₹{card.budgetMin} – ₹{card.budgetMax}
            </p>

            {/* ACCEPTED actions */}
            {card.status === "accepted" && (
              <div className="ap-actions-row">
                <button
                  className="ap-btn ap-btn--outline"
                  onClick={() => onViewBooking && onViewBooking(card)}
                >
                  View Booking Details
                </button>
                <button
                  className="ap-btn ap-btn--primary"
                  onClick={() => onMessageClient && onMessageClient(card)}
                >
                  <span className="material-symbols-outlined">chat</span>
                  Message Client
                </button>
              </div>
            )}

            {/* PENDING actions */}
            {card.status === "pending" && !withdrawn && (
              <div className="ap-actions-row ap-actions-row--pending">
                <button
                  className="ap-btn ap-btn--withdraw"
                  onClick={handleWithdraw}
                >
                  Withdraw Application
                </button>
                <span className="ap-awaiting-chip">Awaiting Client</span>
              </div>
            )}

            {withdrawn && (
              <div className="ap-actions-row">
                <span className="ap-awaiting-chip ap-awaiting-chip--withdrawn">
                  Application Withdrawn
                </span>
              </div>
            )}

            {/* REJECTED actions */}
            {card.status === "rejected" && (
              <div className="ap-actions-row ap-actions-row--rejected">
                <span className="ap-not-selected">
                  <span className="material-symbols-outlined">sentiment_dissatisfied</span>
                  Not Selected
                </span>
                <button
                  className="ap-btn ap-btn--find-similar"
                  onClick={() => onFindSimilar && onFindSimilar(card)}
                >
                  Find Similar Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer banner — accepted only */}
      {card.status === "accepted" && (
        <div className={`ap-project-card__footer ${cfg.footerClass}`}>
          <span className="material-symbols-outlined ap-footer__icon">verified</span>
          SUCCESS: PROJECT MILA CONFIRMED!
        </div>
      )}
    </div>
  );
}