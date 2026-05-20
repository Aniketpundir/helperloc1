import { useState } from 'react';
import './FilterChips.css';

const FILTERS = ['All Services', 'Completed', 'Cancelled', 'Rescheduled'];

export default function FilterChips({ onFilterChange }) {
    const [active, setActive] = useState('All Services');

    const handleClick = (filter) => {
        setActive(filter);
        if (onFilterChange) onFilterChange(filter);
    };

    return (
        <div className="past-filters">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    className={`past-filters__chip ${active === filter ? 'past-filters__chip--active' : ''}`}
                    onClick={() => handleClick(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}