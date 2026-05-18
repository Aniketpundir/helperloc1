// StatsRow.jsx
import './StatsRow.css';

const stats = [
    { icon: 'task_alt', number: '10,000+', label: 'Tasks Completed', filled: false },
    { icon: 'badge', number: '5,000+', label: 'Verified Workers', filled: false },
    { icon: 'map', number: '15+', label: 'Cities Covered', filled: false },
    { icon: 'star', number: '4.8★', label: 'Average Rating', filled: true },
];

const StatsRow = () => {
    return (
        <section className="stats-row">
            <div className="stats-row__grid">
                {stats.map((stat) => (
                    <div className="stats-row__item" key={stat.label}>
                        <span
                            className={`material-symbols-outlined stats-row__icon ${stat.filled ? 'stats-row__icon--filled' : ''}`}
                        >
                            {stat.icon}
                        </span>
                        <div className="stats-row__number">{stat.number}</div>
                        <div className="stats-row__label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsRow;