import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import WorkPostChatModal from '../../../common/WorkPostChatModal/WorkPostChatModal';
import { openWorkPostChat } from '../../../../Redux/Slice/workPostChatSlice';
import {
    acceptPostedJobApplicant,
    fetchMyPostedJobs,
    setMyPostedJobsFilter,
} from '../../../../Redux/Slice/myPostedJobsSlice';
import './MyPostedJobs.css';

const urgencyConfig = {
    urgent: { label: 'Urgent', color: '#ba1a1a', bg: '#ffdad6' },
    soon: { label: 'Soon', color: '#7d5700', bg: '#ffefd4' },
    flexible: { label: 'Flexible', color: '#1a6830', bg: '#d4f5dc' },
};

const FILTERS = ['All', 'Active', 'Completed', 'Closed'];

const statusLabel = {
    active: 'Active',
    completed: 'Completed',
    closed: 'Closed',
};

function Stars({ rating }) {
    return (
        <span className="mpj-stars">
            <span className="material-symbols-outlined mpj-star-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="mpj-star-val">{Number(rating || 0).toFixed(1)}</span>
        </span>
    );
}

function ApplicantCard({ applicant, job, actionLoadingId, onAccept, onChat }) {
    const isAccepted = applicant.status === 'accepted';
    const isRejected = applicant.status === 'rejected';
    const canAccept = job.rawStatus === 'open' && !isAccepted && !isRejected;
    const isBusy = actionLoadingId === applicant.id;

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
                        {isAccepted && <span className="mpj-applicant__status mpj-applicant__status--accepted">Accepted</span>}
                        {isRejected && <span className="mpj-applicant__status mpj-applicant__status--rejected">Rejected</span>}
                    </div>
                    <div className="mpj-applicant__meta">
                        <Stars rating={applicant.rating} />
                        <span className="mpj-applicant__reviews">({applicant.reviews})</span>
                        <span className="mpj-applicant__dot">-</span>
                        <span className="mpj-applicant__exp">{applicant.experience} exp.</span>
                    </div>
                </div>
            </div>

            <div className="mpj-applicant__skills">
                {applicant.skills.map((skill) => (
                    <span key={skill} className="mpj-skill-chip">{skill}</span>
                ))}
            </div>

            <div className="mpj-applicant__bottom">
                <span className="mpj-applicant__avail">
                    <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>schedule</span>
                    {applicant.available}
                </span>
                <div className="mpj-applicant__actions">
                    {canAccept && (
                        <button
                            className="mpj-accept-btn"
                            onClick={() => onAccept(job, applicant)}
                            disabled={isBusy}
                        >
                            <span className="material-symbols-outlined">task_alt</span>
                            {isBusy ? 'Giving Work...' : 'Give Work'}
                        </button>
                    )}
                    {isAccepted && (
                        <button className="mpj-accept-btn mpj-accept-btn--done" disabled>
                            <span className="material-symbols-outlined">check_circle</span>
                            Work Given
                        </button>
                    )}
                    <button className="mpj-chat-btn" onClick={() => onChat(job, applicant)}>
                        <span className="material-symbols-outlined">chat</span>
                        Chat
                    </button>
                </div>
            </div>
        </div>
    );
}

function JobCard({ job, actionLoadingId, onAccept, onChat }) {
    const [open, setOpen] = useState(false);
    const urg = urgencyConfig[job.urgency] || urgencyConfig.flexible;
    const applicantCount = job.applicantsCount ?? job.applicants.length;

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
                            {statusLabel[job.status] || 'Closed'}
                        </span>
                    </div>
                    <div className="mpj-card__meta">
                        <span className="mpj-card__type">{job.workerType}</span>
                        <span className="mpj-card__dot">-</span>
                        <span className="material-symbols-outlined mpj-card__meta-icon">location_on</span>
                        <span className="mpj-card__address">{job.address}</span>
                        <span className="mpj-card__dot">-</span>
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
                            {applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>

            {applicantCount > 0 ? (
                <button
                    className={`mpj-toggle-btn${open ? ' mpj-toggle-btn--open' : ''}`}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <span className="material-symbols-outlined mpj-toggle-btn__icon">group</span>
                    {open ? 'Hide Applicants' : `View ${applicantCount} Applicant${applicantCount !== 1 ? 's' : ''}`}
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
                    {job.applicants.length > 0 ? job.applicants.map((applicant) => (
                        <ApplicantCard
                            key={applicant.id}
                            applicant={applicant}
                            job={job}
                            actionLoadingId={actionLoadingId}
                            onAccept={onAccept}
                            onChat={onChat}
                        />
                    )) : (
                        <div className="mpj-no-applicants">
                            Applicant details are not available yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function MyPostedJobs() {
    const dispatch = useDispatch();
    const { jobs, counts, activeFilter, loading, actionLoadingId, error } = useSelector((state) => state.myPostedJobs);

    useEffect(() => {
        dispatch(fetchMyPostedJobs());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const filteredJobs = jobs.filter((job) => {
        if (activeFilter === 'All') return true;
        return job.status === activeFilter.toLowerCase();
    });

    const countFor = (filter) => {
        if (filter === 'All') return counts.total ?? jobs.length;
        if (filter === 'Active') return counts.active ?? jobs.filter((job) => job.status === 'active').length;
        if (filter === 'Completed') return counts.completed ?? jobs.filter((job) => job.status === 'completed').length;
        return counts.closed ?? jobs.filter((job) => job.status === 'closed').length;
    };

    const handleAcceptApplicant = async (job, applicant) => {
        const result = await dispatch(acceptPostedJobApplicant({
            jobId: job.id,
            applicationId: applicant.id,
        }));

        if (acceptPostedJobApplicant.fulfilled.match(result)) {
            toast.success(`${applicant.name} accepted for this work.`);
        }
    };

    const openChat = (job, applicant) => {
        dispatch(openWorkPostChat({
            workPostId: job.id,
            participantUserId: applicant.workerUserId,
        }));
    };

    return (
        <div className="mpj-page">
            <div className="mpj-page__header">
                <div>
                    <h1 className="mpj-page__heading">My Posted Jobs</h1>
                    <p className="mpj-page__sub">
                        {countFor('All')} jobs posted - {countFor('Active')} active - {countFor('Completed')} completed
                    </p>
                </div>
            </div>

            <div className="mpj-filters">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        className={`mpj-filter-btn${activeFilter === filter ? ' mpj-filter-btn--active' : ''}`}
                        onClick={() => dispatch(setMyPostedJobsFilter(filter))}
                    >
                        {filter}
                        <span className="mpj-filter-btn__count">{countFor(filter)}</span>
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="mpj-empty">
                    <span className="material-symbols-outlined mpj-empty__icon">hourglass_empty</span>
                    <p>Loading your posted jobs...</p>
                </div>
            ) : error ? (
                <div className="mpj-empty">
                    <span className="material-symbols-outlined mpj-empty__icon">error</span>
                    <p>{error}</p>
                    <button className="mpj-retry-btn" onClick={() => dispatch(fetchMyPostedJobs())}>
                        Try Again
                    </button>
                </div>
            ) : (
                <div className="mpj-list">
                    {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            actionLoadingId={actionLoadingId}
                            onAccept={handleAcceptApplicant}
                            onChat={openChat}
                        />
                    )) : (
                        <div className="mpj-empty">
                            <span className="material-symbols-outlined mpj-empty__icon">inbox</span>
                            <p>No {activeFilter.toLowerCase()} jobs found</p>
                        </div>
                    )}
                </div>
            )}

            <WorkPostChatModal />
        </div>
    );
}
