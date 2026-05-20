import './QuickStats.css';

const stats = [
    { label: 'Total Bookings', value: '24', color: 'primary', icon: 'calendar_month' },
    { label: 'Completed Services', value: '22', color: 'secondary', icon: 'task_alt' },
    { label: 'Average Rating', value: '4.8', color: 'tertiary', icon: 'star', isStar: true },
    { label: 'Total Saved', value: '₹2,840', color: 'primary-container', icon: 'savings' },
];

export default function QuickStats() {
    return (
        <section className="quick-stats">
            {stats.map((s) => (
                <div key={s.label} className={`quick-stat quick-stat--${s.color}`}>
                    <p className="quick-stat__label">{s.label}</p>
                    <p className={`quick-stat__value quick-stat__value--${s.color}`}>
                        {s.value}
                        {s.isStar && (
                            <span className="material-symbols-outlined quick-stat__star">star</span>
                        )}
                    </p>
                </div>
            ))}
        </section>
    );
}