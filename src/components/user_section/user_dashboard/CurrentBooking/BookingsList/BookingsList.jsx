import './BookingsList.css';
import BookingCard from '../BookingCard/BookingCard';

export default function BookingsList({ activeTab, bookings = [], loading, error }) {
    const filteredBookings = bookings.filter((booking) => booking.tab === activeTab);

    if (loading) {
        return (
            <section className="bookings-list">
                <div className="bookings-list__empty">
                    <span className="material-symbols-outlined bookings-list__empty-icon">hourglass_top</span>
                    <p className="bookings-list__empty-text">Loading current bookings...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bookings-list">
                <div className="bookings-list__empty">
                    <span className="material-symbols-outlined bookings-list__empty-icon">error</span>
                    <p className="bookings-list__empty-text">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bookings-list">
            {filteredBookings.length === 0 ? (
                <div className="bookings-list__empty">
                    <span className="material-symbols-outlined bookings-list__empty-icon">event_busy</span>
                    <p className="bookings-list__empty-text">No {activeTab.toLowerCase()} bookings right now.</p>
                </div>
            ) : (
                filteredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            )}
        </section>
    );
}
