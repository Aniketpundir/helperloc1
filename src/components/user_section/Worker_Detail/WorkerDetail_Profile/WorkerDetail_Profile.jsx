import React from 'react';
import './WorkerDetail_Profile.css';

const WorkerDetail_Profile = ({ worker }) => {
    return (
        <div className="worker-detail__profile-card">

            {/* --- Top: Avatar & Name --- */}
            <div className="worker-detail__profile-top">
                <div className="worker-detail__profile-avatar-wrap">
                    <img
                        src={worker.image}
                        alt={worker.name}
                        className="worker-detail__profile-avatar"
                    />
                    {worker.verified && (
                        <div className="worker-detail__profile-verified">
                            <span
                                className="material-symbols-outlined"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                verified
                            </span>
                        </div>
                    )}
                </div>

                <div className="worker-detail__profile-name-wrap">
                    <h1 className="worker-detail__profile-name">{worker.name}</h1>
                    <span className="worker-detail__profile-badge">
                        <span className="material-symbols-outlined">bolt</span>
                        {worker.category}
                    </span>
                </div>

                <div className="worker-detail__profile-meta">
                    <div className="worker-detail__profile-rating">
                        <span
                            className="material-symbols-outlined worker-detail__profile-star"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            star
                        </span>
                        <span className="worker-detail__profile-rating-val">{worker.rating}</span>
                    </div>
                    <span className="worker-detail__profile-meta-sep">|</span>
                    <span className="worker-detail__profile-reviews">({worker.reviews} reviews)</span>
                    <span className="worker-detail__profile-meta-sep">|</span>
                    <div className="worker-detail__profile-location">
                        <span className="material-symbols-outlined">location_on</span>
                        <span>{worker.location}</span>
                    </div>
                </div>
            </div>

            {/* --- Middle: Stats & Info --- */}
            <div className="worker-detail__profile-body">

                {/* Stats Grid */}
                <div className="worker-detail__profile-stats">
                    <div className="worker-detail__profile-stat">
                        <p className="worker-detail__profile-stat-label">Experience</p>
                        <p className="worker-detail__profile-stat-value">{worker.experience}</p>
                    </div>
                    <div className="worker-detail__profile-stat">
                        <p className="worker-detail__profile-stat-label">Rate</p>
                        <p className="worker-detail__profile-stat-value">{worker.rate}</p>
                    </div>
                    <div className="worker-detail__profile-stat">
                        <p className="worker-detail__profile-stat-label">Avg Time</p>
                        <p className="worker-detail__profile-stat-value">{worker.avgTime}</p>
                    </div>
                    <div className="worker-detail__profile-stat">
                        <p className="worker-detail__profile-stat-label">Jobs Done</p>
                        <p className="worker-detail__profile-stat-value">{worker.jobsDone}</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="worker-detail__profile-skills-wrap">
                    <h3 className="worker-detail__profile-section-label">Skills &amp; Expertise</h3>
                    <div className="worker-detail__profile-skills">
                        {worker.skills.map((skill, index) => (
                            <span key={index} className="worker-detail__profile-skill-tag">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* About */}
                <div className="worker-detail__profile-about">
                    <h3 className="worker-detail__profile-section-label">About {worker.name.split(' ')[0]}</h3>
                    <p className="worker-detail__profile-about-text">{worker.about}</p>
                </div>

                {/* Message Button */}
                <button className="worker-detail__profile-msg-btn" type="button">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    Message Before Booking
                </button>
            </div>
        </div>
    );
};

export default WorkerDetail_Profile;