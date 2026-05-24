import { useState } from 'react';
import './ProjectCard.css';

const StarRating = ({ count, total = 5 }) => (
    <div className="complete-project-card__stars">
        {Array.from({ length: total }).map((_, i) => (
            <span
                key={i}
                className="material-symbols-outlined complete-project-card__star"
                style={{
                    fontVariationSettings: "'FILL' 1",
                    opacity: i < count ? 1 : 0.2,
                }}
            >
                star
            </span>
        ))}
    </div>
);

const ProjectCard = ({
    title,
    client,
    location,
    completedDate,
    duration,
    workers,
    jobDescription,
    amountPaid,
    starCount,
    review,
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="complete-project-card">

            {/* Left — Status Icon */}
            <div className="complete-project-card__icon-col">
                <div className="complete-project-card__icon-wrap">
                    <span
                        className="material-symbols-outlined complete-project-card__icon"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        check_circle
                    </span>
                </div>
            </div>

            {/* Right — Content Grid */}
            <div className="complete-project-card__body">

                {/* ── Left Info ── */}
                <div className="complete-project-card__info">
                    <h4 className="complete-project-card__title">{title}</h4>

                    <ul className="complete-project-card__meta">
                        <li className="complete-project-card__meta-item">
                            <span className="material-symbols-outlined complete-project-card__meta-icon">person</span>
                            Client: <span className="complete-project-card__meta-highlight">{client}</span>
                        </li>
                        <li className="complete-project-card__meta-item">
                            <span className="material-symbols-outlined complete-project-card__meta-icon">location_on</span>
                            {location}
                        </li>
                        <li className="complete-project-card__meta-item">
                            <span className="material-symbols-outlined complete-project-card__meta-icon">calendar_month</span>
                            Completed: {completedDate}
                        </li>
                        <li className="complete-project-card__meta-row">
                            <span className="complete-project-card__meta-chip">
                                <span className="material-symbols-outlined complete-project-card__meta-icon">schedule</span>
                                {duration}
                            </span>
                            <span className="complete-project-card__meta-chip">
                                <span className="material-symbols-outlined complete-project-card__meta-icon">group</span>
                                {workers} {workers === 1 ? 'Worker' : 'Workers'}
                            </span>
                        </li>
                    </ul>

                    <p className="complete-project-card__job-desc">{jobDescription}</p>

                    {/* Expand / Collapse */}
                    <button
                        className="complete-project-card__expand-btn"
                        onClick={() => setExpanded((p) => !p)}
                    >
                        {expanded ? 'Show Less' : 'Show More'}
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: 16,
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: '0.2s',
                            }}
                        >
                            expand_more
                        </span>
                    </button>

                    {expanded && (
                        <div className="complete-project-card__expanded">
                            <p className="complete-project-card__expanded-row">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>payments</span>
                                Payment method: UPI / Cash on Delivery
                            </p>
                            <p className="complete-project-card__expanded-row">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
                                Work verified by HelperLoc Quality Team
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Right: Badge, Amount, Stars, Review, Link ── */}
                <div className="complete-project-card__right">

                    {/* Status Badge */}
                    <span className="complete-project-card__badge">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}
                        >
                            check_circle
                        </span>
                        Completed
                    </span>

                    {/* Amount + Stars + Review */}
                    {/* <div className="complete-project-card__amount-block">
                        <p className="complete-project-card__amount">
                            Paid: ₹{amountPaid.toLocaleString('en-IN')}
                        </p>
                        <StarRating count={starCount} />
                        <p className="complete-project-card__review">"{review}"</p>
                    </div> */}

                    {/* View Details */}
                    <a href="#" className="complete-project-card__details-link">
                        View Details
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                            arrow_forward
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;