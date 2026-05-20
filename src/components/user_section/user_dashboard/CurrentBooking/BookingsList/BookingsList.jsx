import './BookingsList.css';
import BookingCard from '../BookingCard/BookingCard';

/* ── All bookings data ── */
const allBookings = {
    Active: [
        {
            id: 'HL-9921',
            status: 'In Progress',
            statusColor: 'tertiary',
            statusIcon: 'pulse',
            title: 'Electrical Repairs',
            orderId: 'HL-9921',
            location: 'Bangalore, KA',
            etaLabel: 'Est. Completion',
            etaValue: '3:45 PM',
            etaColor: 'primary',
            progress: 85,
            worker: {
                name: 'Ramesh Kumar',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8YkEhEPjgAPP3BAIhJRlO0wF5tnUhxb6n-lh_2i8wmMOucTx_cQ9WxyI2VVtj5IWd1FmPJRw7vTZUR4cMNaNDW_Kpu34agGs6Q2btSIXWYRi8td-tLQMQOZGyAByUsd331_xu7nIWux1mKWu8CcUxyKBtEJCf0viXe8LpLWCf-Tu0f2vGtfzfA-3mbz3H0S5sKg-dVOifD5ALiHBUZDCiHGAm1eIQpzY9_MPGv8fPehI9iDeW-IKDFTdy1sfmBFZzCxGckAbXKOQK',
                rating: '4.9',
                services: '• 420+ services',
                online: true,
                showCall: true,
                showChat: true,
            },
            details: {
                scope: [
                    { text: 'Main circuit board diagnostic', done: true },
                    { text: 'Replace faulty kitchen wiring', done: true },
                    { text: 'Final load testing', done: false },
                ],
                pricing: [
                    { label: 'Labor (2 hrs)', amount: '₹1,200' },
                    { label: 'Materials', amount: '₹450' },
                ],
                total: '₹1,650',
            },
        },
        {
            id: 'HL-9925',
            status: 'Arriving Soon',
            statusColor: 'secondary',
            statusIcon: 'speed',
            title: 'House Cleaning',
            orderId: 'HL-9925',
            location: 'Indiranagar',
            etaLabel: 'ETA',
            etaValue: '15 Minutes',
            etaColor: 'secondary',
            progress: undefined,
            worker: {
                name: 'Sunita Devi',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIHyjb2EATEtbEv9RmYj53xImfNIve_pmhYjqQmMxEHNjw6lrutDWTFCwxlMcso-3eEKFYEnJuL9AaWNSAFZW1c4w1s9Dq2raei1eOQYTds1aueeGx-fhqpMkkKWHKrrw7jrWlMSu0U1haTfoLGJPzNCaBYd0ICEdEvquSOM_bzaYiDId8bGBb7d296tbLoFR1sNGlzMYqRzkuqQc0E0ODckSAF-98xCtzir2vXv2mnIS5wwCQCNw3jSAKkC5aD3Dsax61JRIVB1FZ',
                role: 'Deep Cleaning Expert',
                online: false,
                showCall: false,
                showChat: false,
            },
            primaryAction: 'Track Order',
            details: null,
        },
    ],

    Upcoming: [
        {
            id: 'HL-9930',
            status: 'Scheduled',
            statusColor: 'primary',
            statusIcon: 'pulse',
            title: 'AC Servicing',
            orderId: 'HL-9930',
            location: 'Koramangala, Bangalore',
            etaLabel: 'Scheduled For',
            etaValue: 'Tomorrow 11 AM',
            etaColor: 'primary',
            progress: undefined,
            worker: {
                name: 'Vijay Singh',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8YkEhEPjgAPP3BAIhJRlO0wF5tnUhxb6n-lh_2i8wmMOucTx_cQ9WxyI2VVtj5IWd1FmPJRw7vTZUR4cMNaNDW_Kpu34agGs6Q2btSIXWYRi8td-tLQMQOZGyAByUsd331_xu7nIWux1mKWu8CcUxyKBtEJCf0viXe8LpLWCf-Tu0f2vGtfzfA-3mbz3H0S5sKg-dVOifD5ALiHBUZDCiHGAm1eIQpzY9_MPGv8fPehI9iDeW-IKDFTdy1sfmBFZzCxGckAbXKOQK',
                rating: '4.7',
                services: '• 180+ services',
                online: false,
                showCall: true,
                showChat: true,
            },
            details: {
                scope: [
                    { text: 'Filter cleaning & replacement', done: false },
                    { text: 'Gas refill check', done: false },
                    { text: 'Thermostat calibration', done: false },
                ],
                pricing: [
                    { label: 'Service charge', amount: '₹800' },
                    { label: 'Parts (est.)', amount: '₹300' },
                ],
                total: '₹1,100',
            },
        },
    ],

    Rescheduled: [],
};

export default function BookingsList({ activeTab }) {
    const bookings = allBookings[activeTab] || [];

    return (
        <section className="bookings-list">
            {bookings.length === 0 ? (
                <div className="bookings-list__empty">
                    <span className="material-symbols-outlined bookings-list__empty-icon">event_busy</span>
                    <p className="bookings-list__empty-text">No {activeTab.toLowerCase()} bookings right now.</p>
                </div>
            ) : (
                bookings.map((b) => <BookingCard key={b.id} booking={b} />)
            )}
        </section>
    );
}