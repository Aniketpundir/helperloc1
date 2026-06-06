import './FilterChips.css';

const FILTERS = ['All Services', 'Completed', 'Cancelled', 'Rescheduled'];

export default function FilterChips({ activeFilter = 'All Services', onFilterChange }) {
    const handleClick = (filter) => {
        if (onFilterChange) onFilterChange(filter);
    };

    return (
        <div className="past-filters">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    className={`past-filters__chip ${activeFilter === filter ? 'past-filters__chip--active' : ''}`}
                    onClick={() => handleClick(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
