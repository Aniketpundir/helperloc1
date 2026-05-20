import './BookingsHeader.css';

const tabs = [
    { label: 'Active', count: 2 },
    { label: 'Upcoming', count: 1 },
    { label: 'Rescheduled', count: 0 },
];

export default function BookingsHeader({ activeTab, onTabChange }) {
    return (
        <header className="bookings-header">
            <div className="bookings-header__inner">
                <div className="bookings-header__text">
                    <h1 className="bookings-header__heading">Current Bookings</h1>
                    <p className="bookings-header__sub">Track your active services in real-time</p>
                </div>

                <div className="bookings-tabs">
                    {tabs.map((t) => (
                        <button
                            key={t.label}
                            className={`bookings-tabs__btn${activeTab === t.label ? ' bookings-tabs__btn--active' : ''}`}
                            onClick={() => onTabChange(t.label)}
                        >
                            {t.label} ({t.count})
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}