import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './PastBooking.css';
import PageHeader from './PageHeader/Pageheader';
import StatsBanner from './StatsBanner/StatsBanner';
import FilterChips from './FilterChips/FilterChips';
import BookingCard from './BookingCard/BookingCard';
import {
  fetchPastBookings,
  setPastBookingFilter,
} from '../../../../Redux/Slice/pastBookingSlice';

const filterByChip = (bookings, filter) => {
  const statusMap = {
    Completed: 'completed',
    Cancelled: 'cancelled',
    Rescheduled: 'rescheduled',
  };

  const status = statusMap[filter];
  if (!status) return bookings;

  return bookings.filter((booking) => booking.status === status);
};

export default function PastBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, stats, loading, error, filter } = useSelector((state) => state.pastBookings);
  const visibleBookings = filterByChip(bookings, filter);

  useEffect(() => {
    dispatch(fetchPastBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleHire = (booking) => {
    navigate(`/worker-category/listed-worker/${encodeURIComponent(booking.serviceName || 'All Services')}`);
  };

  const handleRate = () => {
    toast.info('Rating API is not added yet. We can build that next.');
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

  return (
    <div className="past-booking">
      <PageHeader />
      <StatsBanner stats={stats} />
      <FilterChips activeFilter={filter} onFilterChange={handleFilter} />

      <div className="past-booking__list">
        {loading ? (
          <div className="past-booking__state">
            <span className="material-symbols-outlined">hourglass_empty</span>
            Loading booking history...
          </div>
        ) : visibleBookings.length === 0 ? (
          <div className="past-booking__state">
            <span className="material-symbols-outlined">history</span>
            No past bookings found for this filter.
          </div>
        ) : (
          visibleBookings.map((booking) => (
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
    </div>
  );
}
