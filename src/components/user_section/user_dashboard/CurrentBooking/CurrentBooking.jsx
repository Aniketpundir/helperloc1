import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CurrentBooking.css';
import BookingsHeader from './BookingsHeader/BookingsHeader';
import BookingsList from './BookingsList/BookingsList';
import LiveTrackingMap from './LiveTrackingMap/LiveTrackingMap';
import { fetchCurrentBookings } from '../../../../Redux/Slice/currentBookingSlice';

export default function CurrentBooking() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Active');
  const { bookings, counts, loading, error } = useSelector((state) => state.currentBookings);

  useEffect(() => {
    dispatch(fetchCurrentBookings());
  }, [dispatch]);

  return (
    <>
      <BookingsHeader activeTab={activeTab} counts={counts} onTabChange={setActiveTab} />

      <main className="bookings-page">
        <div className="bookings-page__grid">
          <div className="bookings-page__left">
            <BookingsList
              activeTab={activeTab}
              bookings={bookings}
              loading={loading}
              error={error}
            />
          </div>

          <div className="bookings-page__right">
            <LiveTrackingMap booking={bookings[0]} />
          </div>
        </div>
      </main>
    </>
  );
}
