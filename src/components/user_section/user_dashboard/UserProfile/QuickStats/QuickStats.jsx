import './QuickStats.css';

export default function QuickStats({ stats }) {
    const items = [
        { label: 'Total Bookings', value: stats?.totalBookings ?? 0, color: 'primary' },
        { label: 'Completed Services', value: stats?.completedServices ?? 0, color: 'secondary' },
    ];

    return (
        <section className="quick-stats">
            {items.map((item) => (
                <div key={item.label} className={`quick-stat quick-stat--${item.color}`}>
                    <p className="quick-stat__label">{item.label}</p>
                    <p className={`quick-stat__value quick-stat__value--${item.color}`}>
                        {item.value}
                    </p>
                </div>
            ))}
        </section>
    );
}
