import './StatsBanner.css';

const stats = [
    { label: 'Total Completed', value: '24' },
    { label: 'Total Spent', value: '₹12,400' },
    { label: 'Average Rating', value: '4.8', isStar: true },
    { label: 'Unique Workers', value: '12' },
];

export default function StatsBanner() {
    return (
        <div className="past-stats">
            {stats.map((stat, i) => (
                <div key={i} className="past-stats__item">
                    <span className="past-stats__label">{stat.label}</span>
                    <div className="past-stats__value-row">
                        <span className="past-stats__value">{stat.value}</span>
                        {stat.isStar && (
                            <span className="material-symbols-outlined past-stats__star">star</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}