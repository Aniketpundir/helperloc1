import { useState } from 'react';
import './MyPostedJobs.css';

const MOCK_JOBS = [
    {
        id: 1,
        workerType: 'Plumber',
        icon: 'plumbing',
        title: 'Fix leaking tap in kitchen',
        address: 'Sector 12, Noida, UP',
        urgency: 'urgent',
        postedAt: '2 hours ago',
        status: 'active',
        applicants: [
            {
                id: 101,
                name: 'Ramesh Kumar',
                rating: 4.8,
                reviews: 124,
                experience: '6 years',
                image: 'https://ui-avatars.com/api/?name=Ramesh+Kumar&background=1565c0&color=fff&size=128&bold=true',
                skills: ['Pipe Repair', 'Tap Fitting', 'Drainage'],
                available: 'Today, 3 PM onwards',
                verified: true,
            },
            {
                id: 102,
                name: 'Sunil Verma',
                rating: 4.5,
                reviews: 87,
                experience: '4 years',
                image: 'https://ui-avatars.com/api/?name=Sunil+Verma&background=006493&color=fff&size=128&bold=true',
                skills: ['Tap Fitting', 'Bathroom Plumbing'],
                available: 'Tomorrow, 10 AM',
                verified: true,
            },
            {
                id: 103,
                name: 'Mohan Das',
                rating: 4.2,
                reviews: 45,
                experience: '3 years',
                image: 'https://ui-avatars.com/api/?name=Mohan+Das&background=813900&color=fff&size=128&bold=true',
                skills: ['General Plumbing', 'Pipe Repair'],
                available: 'Today, 6 PM',
                verified: false,
            },
        ],
    },
    {
        id: 2,
        workerType: 'Electrician',
        icon: 'electric_bolt',
        title: 'Install ceiling fan in bedroom',
        address: 'Rajouri Garden, Delhi',
        urgency: 'soon',
        postedAt: '1 day ago',
        status: 'active',
        applicants: [
            {
                id: 201,
                name: 'Ajay Singh',
                rating: 4.9,
                reviews: 210,
                experience: '8 years',
                image: 'https://ui-avatars.com/api/?name=Ajay+Singh&background=004d99&color=fff&size=128&bold=true',
                skills: ['Fan Installation', 'Wiring', 'MCB Fitting'],
                available: 'Today, 5 PM',
                verified: true,
            },
            {
                id: 202,
                name: 'Vijay Sharma',
                rating: 4.6,
                reviews: 98,
                experience: '5 years',  
                image: 'https://ui-avatars.com/api/?name=Vijay+Sharma&background=00affe&color=fff&size=128&bold=true',
                skills: ['Fan Installation', 'Switch Repair'],
                available: 'Tomorrow, 9 AM',
                verified: true,
            },
        ],
    },
    {
        id: 3,
        workerType: 'Cleaner',
        icon: 'cleaning_services',
        title: 'Deep cleaning of 2BHK flat',
        address: 'Indirapuram, Ghaziabad',
        urgency: 'flexible',
        postedAt: '3 days ago',
        status: 'closed',
        applicants: [],
    },
];

const urgencyConfig = {
    urgent: { label: 'Urgent', color: '#ba1a1a', bg: '#ffdad6' },
    soon: { label: 'Soon', color: '#7d5700', bg: '#ffefd4' },
    flexible: { label: 'Flexible', color: '#1a6830', bg: '#d4f5dc' },
};

const FILTERS = ['All', 'Active', 'Closed'];

/* ── Star Rating ── */
function Stars({ rating }) {
    return (
        <span className="mpj-stars">
            <span className="material-symbols-outlined mpj-star-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="mpj-star-val">{rating}</span>
        </span>
    );
}

/* ── Applicant Card ── */
function ApplicantCard({ applicant, onChat }) {
    return (
        <div className="mpj-applicant">
            <div className="mpj-applicant__top">
                <img src={applicant.image} alt={applicant.name} className="mpj-applicant__avatar" />
                <div className="mpj-applicant__info">
                    <div className="mpj-applicant__name-row">
                        <span className="mpj-applicant__name">{applicant.name}</span>
                        {applicant.verified && (
                            <span className="mpj-applicant__verified">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '15px' }}>verified</span>
                                Verified
                            </span>
                        )}
                    </div>
                    <div className="mpj-applicant__meta">
                        <Stars rating={applicant.rating} />
                        <span className="mpj-applicant__reviews">({applicant.reviews})</span>
                        <span className="mpj-applicant__dot">·</span>
                        <span className="mpj-applicant__exp">{applicant.experience} exp.</span>
                    </div>
                </div>
                {/* <div className="mpj-applicant__price">{applicant.price}</div> */}
            </div>

            <div className="mpj-applicant__skills">
                {applicant.skills.map((s) => (
                    <span key={s} className="mpj-skill-chip">{s}</span>
                ))}
            </div>

            <div className="mpj-applicant__bottom">
                <span className="mpj-applicant__avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>schedule</span>
                    {applicant.available}
                </span>
                <button className="mpj-chat-btn" onClick={() => onChat(applicant)}>
                    <span className="material-symbols-outlined">chat</span>
                    Chat
                </button>
            </div>
        </div>
    );
}

/* ── Job Card ── */
function JobCard({ job, onChat }) {
    const [open, setOpen] = useState(false);
    const urg = urgencyConfig[job.urgency];

    return (
        <div className={`mpj-card${open ? ' mpj-card--open' : ''}`}>
            <div className="mpj-card__header">
                <div className="mpj-card__icon-wrap">
                    <span className="material-symbols-outlined mpj-card__icon" style={{ fontVariationSettings: "'FILL' 1" }}>{job.icon}</span>
                </div>
                <div className="mpj-card__info">
                    <div className="mpj-card__title-row">
                        <h3 className="mpj-card__title">{job.title}</h3>
                        <span className="mpj-card__status" data-status={job.status}>
                            {job.status === 'active' ? 'Active' : 'Closed'}
                        </span>
                    </div>
                    <div className="mpj-card__meta">
                        <span className="mpj-card__type">{job.workerType}</span>
                        <span className="mpj-card__dot">·</span>
                        <span className="material-symbols-outlined mpj-card__meta-icon">location_on</span>
                        <span className="mpj-card__address">{job.address}</span>
                        <span className="mpj-card__dot">·</span>
                        <span className="mpj-card__time">{job.postedAt}</span>
                    </div>
                    <div className="mpj-card__tags">
                        <span className="mpj-tag" style={{ color: urg.color, background: urg.bg }}>{urg.label}</span>
                        <span className="mpj-tag mpj-tag--budget">
                            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>payments</span>
                            {job.budget}
                        </span>
                        <span className="mpj-tag mpj-tag--applicants">
                            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>group</span>
                            {job.applicants.length} Applicant{job.applicants.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>

            {job.applicants.length > 0 ? (
                <button
                    className={`mpj-toggle-btn${open ? ' mpj-toggle-btn--open' : ''}`}
                    onClick={() => setOpen((p) => !p)}
                >
                    <span className="material-symbols-outlined mpj-toggle-btn__icon">group</span>
                    {open ? 'Hide Applicants' : `View ${job.applicants.length} Applicant${job.applicants.length !== 1 ? 's' : ''}`}
                    <span className={`material-symbols-outlined mpj-toggle-btn__chevron${open ? ' mpj-toggle-btn__chevron--open' : ''}`}>expand_more</span>
                </button>
            ) : (
                <div className="mpj-no-applicants">
                    <span className="material-symbols-outlined">hourglass_empty</span>
                    No applicants yet
                </div>
            )}

            {open && (
                <div className="mpj-applicants-panel">
                    {job.applicants.map((a) => (
                        <ApplicantCard key={a.id} applicant={a} onChat={onChat} />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Main Component ── */
export default function MyPostedJobs() {
    const [chatWorker, setChatWorker] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredJobs = MOCK_JOBS.filter((job) => {
        if (activeFilter === 'All') return true;
        return job.status === activeFilter.toLowerCase();
    });

    return (
        <div className="mpj-page">

            {/* Page Header */}
            <div className="mpj-page__header">
                <div>
                    <h1 className="mpj-page__heading">My Posted Jobs</h1>
                    <p className="mpj-page__sub">
                        {MOCK_JOBS.length} jobs posted · {MOCK_JOBS.filter(j => j.status === 'active').length} active
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="mpj-filters">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        className={`mpj-filter-btn${activeFilter === f ? ' mpj-filter-btn--active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f}
                        <span className="mpj-filter-btn__count">
                            {f === 'All' ? MOCK_JOBS.length
                                : MOCK_JOBS.filter(j => j.status === f.toLowerCase()).length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Jobs List */}
            <div className="mpj-list">
                {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} onChat={setChatWorker} />
                )) : (
                    <div className="mpj-empty">
                        <span className="material-symbols-outlined mpj-empty__icon">inbox</span>
                        <p>No {activeFilter.toLowerCase()} jobs found</p>
                    </div>
                )}
            </div>

            {/* Chat Modal */}
            {chatWorker && (
                <div className="mpj-modal-overlay" onClick={() => setChatWorker(null)}>
                    <div className="mpj-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="mpj-modal__header">
                            <img src={chatWorker.image} alt={chatWorker.name} className="mpj-modal__avatar" />
                            <div>
                                <p className="mpj-modal__name">{chatWorker.name}</p>
                                <p className="mpj-modal__role">
                                    <span className="mpj-online-dot" />
                                    Online now
                                </p>
                            </div>
                            <button className="mpj-modal__close" onClick={() => setChatWorker(null)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="mpj-chat-area">
                            <div className="mpj-chat-bubble mpj-chat-bubble--worker">
                                Hi! I saw your job posting. I'm available and can help you today. 👋
                            </div>
                        </div>
                        <div className="mpj-chat-input-row">
                            <input className="mpj-chat-input" type="text" placeholder="Type a message…" />
                            <button className="mpj-chat-send">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}