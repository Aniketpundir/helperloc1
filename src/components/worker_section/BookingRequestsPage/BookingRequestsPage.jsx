import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import StatsStrip from './StatsStrip/StatsStrip';
import BookingCard from './BookingCard/BookingCard';
import Pagination from './Pagination/Pagination';
import {
    acceptWorkerBookingRequest,
    declineWorkerBookingRequest,
    fetchWorkerBookingRequests,
    rescheduleWorkerBookingRequest,
    setWorkerBookingFilter,
    setWorkerBookingPage,
} from '../../../Redux/Slice/workerBookingRequestsSlice';
import './BookingRequestsPage.css';

const FILTER_OPTIONS = ['All Requests', 'Pending', 'Confirmed', 'Cancelled', 'Rescheduled'];

const BookingRequestsPage = () => {
    const dispatch = useDispatch();
    const {
        requests,
        counts,
        activeFilter,
        page,
        pagination,
        loading,
        actionLoading,
        error,
    } = useSelector((state) => state.workerBookingRequests);
    const [searchValue, setSearchValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        dispatch(fetchWorkerBookingRequests());
    }, [dispatch, activeFilter, page]);

    const filteredRequests = useMemo(() => {
        if (!searchValue.trim()) return requests;

        const query = searchValue.toLowerCase();
        return requests.filter(
            (booking) =>
                booking.title.toLowerCase().includes(query) ||
                booking.client.toLowerCase().includes(query) ||
                booking.location.toLowerCase().includes(query)
        );
    }, [requests, searchValue]);

    const handlePageChange = (nextPage) => {
        dispatch(setWorkerBookingPage(nextPage));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (filter) => {
        dispatch(setWorkerBookingFilter(filter));
        setShowDropdown(false);
    };

    const handleAccept = async (id) => {
        try {
            await dispatch(acceptWorkerBookingRequest(id)).unwrap();
            toast.success('Booking request accepted.');
            dispatch(fetchWorkerBookingRequests());
        } catch (message) {
            toast.error(message || 'Failed to accept booking request.');
        }
    };

    const handleDecline = async (id) => {
        const reason = window.prompt('Reason for declining this request?') || '';

        try {
            await dispatch(declineWorkerBookingRequest({ requestId: id, reason })).unwrap();
            toast.success('Booking request declined.');
            dispatch(fetchWorkerBookingRequests());
        } catch (message) {
            toast.error(message || 'Failed to decline booking request.');
        }
    };

    const handleReschedule = async (booking) => {
        const scheduledDate = window.prompt('New date (YYYY-MM-DD):');
        if (!scheduledDate) return;

        const timeSlot = window.prompt('New time slot (example: 02:30 PM):', '02:30 PM');
        if (!timeSlot) return;

        const reason = window.prompt('Reason for reschedule?') || '';

        try {
            await dispatch(
                rescheduleWorkerBookingRequest({
                    requestId: booking.id,
                    scheduledDate,
                    timeSlot,
                    reason,
                })
            ).unwrap();
            toast.success('Reschedule request saved.');
            dispatch(fetchWorkerBookingRequests());
        } catch (message) {
            toast.error(message || 'Failed to reschedule booking request.');
        }
    };

    return (
        <div className="request-page">
            <div className="request-page__canvas">
                <div className="request-page__header">
                    <div className="request-page__header-text">
                        <h2 className="request-page__heading">Booking Requests</h2>
                        <p className="request-page__subheading">Clients who have directly booked you</p>
                    </div>

                    <div className="request-page__filter-wrap">
                        <button
                            className="request-page__filter-btn"
                            onClick={() => setShowDropdown((prev) => !prev)}
                        >
                            {activeFilter}
                            <span className="material-symbols-outlined request-page__filter-icon">expand_more</span>
                        </button>
                        {showDropdown && (
                            <div className="request-page__dropdown">
                                {FILTER_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        className={`request-page__dropdown-item${activeFilter === option ? ' request-page__dropdown-item--active' : ''}`}
                                        onClick={() => handleFilterChange(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="request-page__search-wrap">
                    <span className="material-symbols-outlined request-page__search-icon">search</span>
                    <input
                        className="request-page__search-input"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Search by service, client, or location..."
                    />
                </div>

                <StatsStrip total={counts.total} pending={counts.pending} confirmed={counts.confirmed} />

                <div className="request-page__cards">
                    {loading ? (
                        <div className="request-page__empty">
                            <span className="material-symbols-outlined request-page__empty-icon">hourglass_top</span>
                            <p className="request-page__empty-text">Loading booking requests...</p>
                        </div>
                    ) : error ? (
                        <div className="request-page__empty">
                            <span className="material-symbols-outlined request-page__empty-icon">error</span>
                            <p className="request-page__empty-text">{error}</p>
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="request-page__empty">
                            <span className="material-symbols-outlined request-page__empty-icon">search_off</span>
                            <p className="request-page__empty-text">No requests found.</p>
                        </div>
                    ) : (
                        filteredRequests.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                {...booking}
                                onAccept={() => !actionLoading && handleAccept(booking.id)}
                                onDecline={() => !actionLoading && handleDecline(booking.id)}
                                onMessage={() => toast.info(`Message feature for ${booking.client} will be added soon.`)}
                                onReschedule={() => !actionLoading && handleReschedule(booking)}
                            />
                        ))
                    )}
                </div>

                {pagination.totalPages > 1 && !searchValue.trim() && (
                    <Pagination
                        currentPage={pagination.page || page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default BookingRequestsPage;
