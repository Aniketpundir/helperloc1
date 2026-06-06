import './WorkerJobCard.css';

const PRIORITY_CONFIG = {
    urgent: { label: 'Urgent', className: 'worker-job-card__priority--urgent' },
    soon: { label: 'Soon', className: 'worker-job-card__priority--soon' },
    flexible: { label: 'Flexible', className: 'worker-job-card__priority--flexible' },
};

export default function WorkerJobCard({
    icon = 'work',
    iconColor = 'blue',
    category,
    title,
    location,
    priceRange,
    priority = 'soon',
    hasApplied = false,
    actionLoading = false,
    onApply,
}) {
    const priorityCfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.soon;

    return (
        <div className="worker-job-card">
            {/* Top: category + priority */}
            <div className="worker-job-card__top">
                <div className="worker-job-card__category-wrap">
                    <div className={`worker-job-card__cat-icon-wrap worker-job-card__cat-icon-wrap--${iconColor}`}>
                        <span className="material-symbols-outlined worker-job-card__cat-icon">{icon}</span>
                    </div>
                    <span className="worker-job-card__category">{category}</span>
                </div>
                <span className={`worker-job-card__priority ${priorityCfg.className}`}>
                    {priorityCfg.label}
                </span>
            </div>

            {/* Title */}
            <h3 className="worker-job-card__title">{title}</h3>

            {/* Info */}
            <div className="worker-job-card__info">
                <p className="worker-job-card__location">
                    <span className="material-symbols-outlined worker-job-card__info-icon">location_on</span>
                    {location}
                </p>
                <p className="worker-job-card__price">{priceRange}</p>
            </div>

            {/* CTA Button */}
            <button
                className={`worker-job-card__btn ${hasApplied ? 'worker-job-card__btn--applied' : ''}`}
                onClick={onApply}
                disabled={hasApplied || actionLoading}
            >
                {hasApplied ? (
                    <>
                        <span className="material-symbols-outlined">check_circle</span>
                        Applied!
                    </>
                ) : actionLoading ? (
                    'Applying...'
                ) : (
                    "I'm Interested"
                )}
            </button>
        </div>
    );
}
