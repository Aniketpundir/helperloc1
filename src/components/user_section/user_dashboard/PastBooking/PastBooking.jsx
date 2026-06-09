import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './PastBooking.css';
import PageHeader from './PageHeader/Pageheader';
import StatsBanner from './StatsBanner/StatsBanner';
import FilterChips from './FilterChips/FilterChips';
import BookingCard from './BookingCard/BookingCard';
import RateBookingModal from './RateBookingModal/RateBookingModal';
import {
  fetchPastBookings,
  setPastBookingFilter,
  setPastBookingSearch,
  submitBookingReview,
  updateBookingReview,
} from '../../../../Redux/Slice/pastBookingSlice';

export default function PastBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, stats, loading, reviewLoading, error, filter, search } = useSelector((state) => state.pastBookings);
  const [ratingBooking, setRatingBooking] = useState(null);

  useEffect(() => {
    dispatch(fetchPastBookings());
  }, [dispatch, filter, search]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleHire = (booking) => {
    navigate(`/worker-category/listed-worker/${encodeURIComponent(booking.serviceName || 'All Services')}`);
  };

  const handleRate = (booking) => {
    setRatingBooking(booking);
  };

  const handleSubmitRating = async ({ rating, comment }) => {
    if (!ratingBooking) return;

    try {
      const reviewAction = ratingBooking.isRated ? updateBookingReview : submitBookingReview;

      await dispatch(reviewAction({
        bookingId: ratingBooking.id,
        rating,
        comment,
      })).unwrap();
      toast.success(ratingBooking.isRated ? 'Review updated successfully.' : 'Review submitted successfully.');
      setRatingBooking(null);
    } catch (message) {
      toast.error(message || 'Failed to save review.');
    }
  };

  const handleShare = async (booking) => {
    const text = `I booked ${booking.title} on HelperLoc.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'HelperLoc booking', text });
        return;
      }

      await navigator.clipboard.writeText(text);
      toast.success('Booking info copied.');
    } catch {
      toast.info('Sharing cancelled.');
    }
  };

  const handleFilter = (nextFilter) => {
    dispatch(setPastBookingFilter(nextFilter));
  };

  const handleExport = () => {
    if (!bookings.length) {
      toast.info('No booking history to export.');
      return;
    }

    const rows = [
      ['Service', 'Worker', 'Date', 'Status', 'Amount', 'Payment'],
      ...bookings.map((booking) => [
        booking.title,
        booking.workerName,
        booking.date,
        booking.rawStatus,
        booking.price,
        booking.paymentNote,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'helperloc-booking-history.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="past-booking">
      <PageHeader
        searchValue={search}
        onSearchChange={(value) => dispatch(setPastBookingSearch(value))}
        onExport={handleExport}
      />
      <StatsBanner stats={stats} />
      <FilterChips activeFilter={filter} onFilterChange={handleFilter} />

      <div className="past-booking__list">
        {loading ? (
          <div className="past-booking__state">
            <span className="material-symbols-outlined">hourglass_empty</span>
            Loading booking history...
          </div>
        ) : bookings.length === 0 ? (
          <div className="past-booking__state">
            <span className="material-symbols-outlined">history</span>
            No past bookings found for this filter.
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              {...booking}
              onHire={() => handleHire(booking)}
              onRate={() => handleRate(booking)}
              onShare={() => handleShare(booking)}
            />
          ))
        )}
      </div>

      <RateBookingModal
        booking={ratingBooking}
        loading={reviewLoading}
        onClose={() => setRatingBooking(null)}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}
