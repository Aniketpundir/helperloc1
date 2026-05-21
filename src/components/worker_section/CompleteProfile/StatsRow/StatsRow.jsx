import React from 'react';
import './StatsRow.css';

const stats = [
    {
        icon: 'check_circle',
        iconColor: '#4CAF50',
        borderColor: '#4CAF50',
        label: 'Projects',
        value: '9 Jobs Done',
        valueColor: '#4CAF50',
    },
    {
        icon: 'payments',
        iconColor: '#1565c0',
        borderColor: '#1565c0',
        label: 'Earnings',
        value: '₹18,500 Total Earned',
        valueColor: '#1565c0',
    },
    {
        icon: 'star',
        iconColor: '#FF9800',
        borderColor: '#FF9800',
        label: 'Feedback',
        value: '4.8 Average Rating',
        valueColor: '#FF9800',
    },
];

const StatsRow = () => {
    return (
        <div className="complete-stats-row">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="complete-stats-row__card"
                    style={{ borderLeftColor: stat.borderColor }}
                >
                    <div
                        className="complete-stats-row__icon-wrap"
                        style={{ backgroundColor: `${stat.iconColor}18` }}
                    >
                        <span
                            className="material-symbols-outlined complete-stats-row__icon"
                            style={{ color: stat.iconColor, fontVariationSettings: "'FILL' 1" }}
                        >
                            {stat.icon}
                        </span>
                    </div>
                    <div>
                        <p className="complete-stats-row__label">{stat.label}</p>
                        <h3 className="complete-stats-row__value" style={{ color: stat.valueColor }}>
                            {stat.value}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsRow;