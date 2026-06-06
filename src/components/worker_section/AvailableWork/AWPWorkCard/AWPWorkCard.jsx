import "./AWPWorkCard.css";

export default function AWPWorkCard({ card, actionLoading, onWantJob, onWithdrawJob, onViewDetails, onChat }) {
    const urgencyConfig = {
        urgent: {
            className: "awp-work-card__urgency-badge--urgent",
            icon: "error",
            label: "URGENT",
            iconFill: true,
        },
        soon: {
            className: "awp-work-card__urgency-badge--soon",
            icon: "schedule",
            label: "SOON",
            iconFill: false,
        },
        flexible: {
            className: "awp-work-card__urgency-badge--flexible",
            icon: "event",
            label: "FLEXIBLE",
            iconFill: false,
        },
    };

    const urgencyCfg = urgencyConfig[card.urgency] || urgencyConfig.flexible;
    const isBusy = actionLoading === card.id;
    const isApplied = card.hasApplied;

    const handleWantJob = () => {
        if (isBusy) return;

        if (isApplied) {
            onWithdrawJob && onWithdrawJob(card);
            return;
        }

        onWantJob && onWantJob(card);
    };

    const handleViewDetails = () => {
        onViewDetails && onViewDetails(card);
    };

    return (
        <div className={`awp-work-card ${isApplied ? "awp-work-card--applied" : ""}`}>
            {/* Top Row */}
            <div className="awp-work-card__top-row">
                <div className="awp-work-card__category">
                    <div className={`awp-work-card__cat-icon awp-work-card__cat-icon--${card.categoryColor}`}>
                        <span className="material-symbols-outlined">{card.categoryIcon}</span>
                    </div>
                    <span className={`awp-work-card__cat-chip awp-work-card__cat-chip--${card.categoryColor}`}>
                        {card.categoryEmoji} {card.category}
                    </span>
                </div>

                <span className={`awp-work-card__urgency-badge ${urgencyCfg.className}`}>
                    <span
                        className="material-symbols-outlined awp-work-card__urgency-icon"
                        style={urgencyCfg.iconFill ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                        {urgencyCfg.icon}
                    </span>
                    {urgencyCfg.label}
                </span>
            </div>

            {/* Content Grid */}
            <div className="awp-work-card__grid">
                {/* Left */}
                <div className="awp-work-card__info">
                    <h3 className="awp-work-card__title">{card.title}</h3>
                    <p className="awp-work-card__desc">{card.description}</p>
                    <div className="awp-work-card__meta">
                        <div className="awp-work-card__meta-item">
                            <span className="material-symbols-outlined awp-work-card__meta-icon">location_on</span>
                            {card.location}
                        </div>
                        <div className="awp-work-card__meta-item">
                            <span className="material-symbols-outlined awp-work-card__meta-icon">calendar_month</span>
                            {card.date}
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="awp-work-card__right">
                    <div className="awp-work-card__workers">
                        <span className="material-symbols-outlined awp-work-card__workers-icon">group</span>
                        {card.workersNeeded} {card.workersNeeded === 1 ? "Worker" : "Workers"} Needed
                    </div>
                    <div className="awp-work-card__budget">
                        {/* <span className="awp-work-card__budget-label">Budget</span> */}
                        {/* <span className="awp-work-card__budget-value">
                            ₹{card.budgetMin} – ₹{card.budgetMax}
                        </span> */}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="awp-work-card__actions">
                <button
                    className={`awp-work-card__btn awp-work-card__btn--primary ${isApplied ? "awp-work-card__btn--applied" : ""
                        }`}
                    onClick={handleWantJob}
                    disabled={isBusy}
                >
                    <span className="material-symbols-outlined">
                        {isApplied ? "check_circle" : "chat_bubble"}
                    </span>
                    {isBusy ? "Please wait..." : isApplied ? "Withdraw Application" : "I Want This Job"}
                </button>

                <button
                    className="awp-work-card__btn awp-work-card__btn--outline"
                    onClick={handleViewDetails}
                >
                    <span className="material-symbols-outlined">visibility</span>
                    View Full Details
                </button>

                {isApplied && (
                    <button
                        className="awp-work-card__btn awp-work-card__btn--outline"
                        onClick={() => onChat && onChat(card)}
                    >
                        <span className="material-symbols-outlined">chat</span>
                        Chat Client
                    </button>
                )}
            </div>
        </div>
    );
}
