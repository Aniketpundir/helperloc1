import './PastBooking.css';
import PageHeader from './PageHeader/Pageheader';
import StatsBanner from './StatsBanner/StatsBanner';
import FilterChips from './FilterChips/FilterChips';
import BookingCard from './BookingCard/BookingCard';

const BOOKINGS = [
  {
    id: 1,
    status: 'completed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFBFZc0FG-_odnwsoNnpW9rWHls_iyETayUA-ODQsIcYKhEKI947IHf_CSj-q4P-5X6OFE35TqcIaUJDv010R6q61peyuZZXK8BEk0MVFbBlGatLTw1IuiGYoZziKVzqlwMkB2sYK6sAt86b8qx9CZHFNBB75Ahuwn8tW32sLpgZdaJWMVLXZU6rfCTCyEcwfGmyq4md_lnZpY8d9oqPC6xoBOXa7LH5bXeWPEER1iFuLqu77NqMlHMiM75QSqEUZ6J0bOTB8csb63',
    imageAlt: 'House Cleaning',
    title: 'House Cleaning - Deep Scrub',
    date: 'Oct 12, 2023 • 10:00 AM',
    price: '₹550',
    paymentNote: 'Paid via UPI',
    review: 'Excellent work, the house is spotless!',
  },
  {
    id: 2,
    status: 'pending',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvIwvGNwkIkV1dZxjDpKtpSSSm3vNtUf1shuTapxGyk_07Kxa1c_fFQrME31D21WbkXYDi2k2Uz6kuLXtXQZvX8pRqTeScCpyLnVivJ8RPg4YLuku4TE2srbZx0vvqNSQd3cX9WxxSkfP16_npE0eg7n6tDtB13Fs_QEqLaghbC0d84IWCSussYhjpIIozqqmIM3uIzgTs7tmgiCT2oQWEZp0-btvIMWh2wamaXqzz3flxazpCgtB40CQnbVfRKBzqmZjGUY11MfOl',
    imageAlt: 'Electrical Repair',
    title: 'Electrical Repair - Circuit Fix',
    date: 'Oct 28, 2023 • 03:30 PM',
    price: '₹890',
    paymentNote: 'Pending Verification',
  },
  {
    id: 3,
    status: 'cancelled',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBng25rxW8Cog993Uuf5WDF3VAev6BE76DAtYjSsmK7ag-YqYcavmiA8fhogWSirvrxirTLY9O2VqnF1l1S2gGuuHHzLTDH0WhMw_dIxQbzuP1c5pIfsJyMvr0QUC9c60CyXCvm2z2Glmo1eNwroD310E8DmfMKXEivU9nqECruwOR1tLG18H4svJ3TTDxLJkGR5x78I60j1nH_Gr6SdZd7Ct4808pVxpIzZ_iDRR0St69u-RM5MSO1h7oxxQuIL1pkEJZFGXdudUYN',
    imageAlt: 'Painting Service',
    title: 'Home Painting - Feature Wall',
    date: 'Oct 30, 2023 • 09:00 AM',
    price: '₹1,200',
    cancelReason: 'Service professional unavailable at selected time.',
    refundStatus: 'Processed to original payment method.',
  },
];

export default function PastBooking() {
  const handleHire = (id) => console.log('Hire Again:', id);
  const handleRate = (id) => console.log('Rate Now:', id);
  const handleShare = (id) => console.log('Share:', id);
  const handleFilter = (filter) => console.log('Filter:', filter);

  return (
    <div className="past-booking">
      {/* Header + search + export */}
      <PageHeader />

      {/* Stats banner */}
      <StatsBanner />

      {/* Filter chips */}
      <FilterChips onFilterChange={handleFilter} />

      {/* Cards list */}
      <div className="past-booking__list">
        {BOOKINGS.map((booking) => (
          <BookingCard
            key={booking.id}
            {...booking}
            onHire={() => handleHire(booking.id)}
            onRate={() => handleRate(booking.id)}
            onShare={() => handleShare(booking.id)}
          />
        ))}
      </div>
    </div>
  );
}