import { useState } from 'react';
import './CurrentBooking.css';
import BookingsHeader  from './BookingsHeader/BookingsHeader';
import BookingsList    from './BookingsList/BookingsList';
import LiveTrackingMap from './LiveTrackingMap/LiveTrackingMap';

export default function CurrentBooking() {
  const [activeTab, setActiveTab] = useState('Active');

  return (
    <>
      <BookingsHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="bookings-page">
        <div className="bookings-page__grid">
          {/* Left — booking cards */}
          <div className="bookings-page__left">
            <BookingsList activeTab={activeTab} />
          </div>

          {/* Right — live map */}
          <div className="bookings-page__right">
            <LiveTrackingMap />
          </div>
        </div>
      </main>
    </>
  );
}