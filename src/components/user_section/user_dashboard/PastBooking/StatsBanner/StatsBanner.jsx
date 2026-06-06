import './StatsBanner.css';

const formatMoney = (amount = 0) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);

export default function StatsBanner({ stats }) {
    const items = [
        { label: 'Total Completed', value: stats?.completed || 0 },
        { label: 'Total Spent', value: formatMoney(stats?.totalSpent || 0) },
        { label: 'Average Rating', value: stats?.averageRating || 0, isStar: true },
        { label: 'Unique Workers', value: stats?.uniqueWorkers || 0 },
    ];

    return (
        <div className="past-stats">
            {items.map((stat, i) => (
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
