import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './WorkerDashboard.css';
import WorkerTopBar from './WorkerTopBar/WorkerTopBar';
import WorkerStatsRow from './WorkerStatsRow/WorkerStatsRow';
import WorkerBookingCard from './WorkerBookingCard/WorkerBookingCard';
import WorkerJobCard from './WorkerJobCard/WorkerJobCard';
import {
    applyFromWorkerDashboard,
    fetchWorkerDashboard,
    requestBookingCompletionOtp,
    verifyBookingCompletionOtp,
} from '../../../Redux/Slice/workerDashboardSlice';

export default function WorkerDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        worker,
        stats,
        recentBookings,
        availableJobs,
        loading,
        actionLoadingId,
        completionLoadingId,
        error,
    } = useSelector((state) => state.workerDashboard);

    useEffect(() => {
        dispatch(fetchWorkerDashboard());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleApply = async (job) => {
        const result = await dispatch(applyFromWorkerDashboard(job.id));
        if (applyFromWorkerDashboard.fulfilled.match(result)) {
            toast.success('Application sent successfully.');
        }
    };

    const handleRequestBookingOtp = async (booking) => {
        const sent = await dispatch(requestBookingCompletionOtp(booking.id));
        if (!requestBookingCompletionOtp.fulfilled.match(sent)) return false;

        toast.success(sent.payload || 'Completion OTP sent to client email.');
        return true;
    };

    const handleVerifyBookingOtp = async (booking, otp) => {
        const verified = await dispatch(verifyBookingCompletionOtp({ bookingId: booking.id, otp }));
        if (verifyBookingCompletionOtp.fulfilled.match(verified)) {
            toast.success('Booking marked as completed.');
            return true;
        }

        return false;
    };

    return (
        <div className="worker-dashboard">
            <WorkerTopBar workerName={worker?.name?.split(' ')[0] || 'Worker'} />

            <div className="worker-dashboard__content">
                {loading ? (
                    <div className="worker-dashboard__state">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                        Loading dashboard...
                    </div>
                ) : (
                    <>
                        <WorkerStatsRow stats={stats} />

                        <div className="worker-dashboard__middle">
                            <div className="worker-dashboard__bookings">
                                <div className="worker-dashboard__section-header">
                                    <h2 className="worker-dashboard__section-title">Recent Booking Requests</h2>
                                    <Link to="/worker/booking-request" className="worker-dashboard__view-all">
                                        View All
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </Link>
                                </div>
                                <div className="worker-dashboard__bookings-list">
                                    {recentBookings.length ? recentBookings.map((booking) => (
                                        <WorkerBookingCard
                                            key={booking.id}
                                            {...booking}
                                            completionLoading={completionLoadingId === booking.id}
                                            onViewDetails={() => navigate('/worker/booking-request')}
                                            onRequestCompletion={() => handleRequestBookingOtp(booking)}
                                            onVerifyCompletion={(otp) => handleVerifyBookingOtp(booking, otp)}
                                        />
                                    )) : (
                                        <div className="worker-dashboard__empty">
                                            No booking requests yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="worker-dashboard__jobs-section">
                            <div className="worker-dashboard__section-header">
                                <h2 className="worker-dashboard__section-title">Available Work Near You</h2>
                                <Link to="/worker/available-work" className="worker-dashboard__view-all">
                                    View All
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                            <div className="worker-dashboard__jobs-scroll">
                                {availableJobs.length ? availableJobs.map((job) => (
                                    <WorkerJobCard
                                        key={job.id}
                                        {...job}
                                        actionLoading={actionLoadingId === job.id}
                                        onApply={() => handleApply(job)}
                                    />
                                )) : (
                                    <div className="worker-dashboard__empty">
                                        No available work posts found for your services.
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
