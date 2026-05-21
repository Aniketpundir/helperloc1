import './WorkerStatsRow.css';

const STATS = [
    { icon: 'assignment', label: 'Total Bookings', value: '12', color: 'blue' },
    { icon: 'check_circle', label: 'Completed Jobs', value: '9', color: 'green' },
    { icon: 'star', label: 'Average Rating', value: '4.8', color: 'orange' },
    { icon: 'payments', label: 'Total Earned', value: '₹18,500', color: 'blue' },
];

export default function WorkerStatsRow() {
    return (
        <div className="worker-stats">
            {STATS.map((stat) => (
                <div key={stat.label} className={`worker-stats__card worker-stats__card--${stat.color}`}>
                    <div className={`worker-stats__icon-wrap worker-stats__icon-wrap--${stat.color}`}>
                        <span className="material-symbols-outlined worker-stats__icon">{stat.icon}</span>
                    </div>
                    <div>
                        <p className={`worker-stats__value worker-stats__value--${stat.color}`}>{stat.value}</p>
                        <p className="worker-stats__label">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}