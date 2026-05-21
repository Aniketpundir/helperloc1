import "./ReviewFilters.css";

const FILTERS = ["All Reviews", "5 Stars", "4 Stars", "3 Stars & Under"];

export default function ReviewFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="review-filters">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`review-filters__btn ${
            activeFilter === filter
              ? "review-filters__btn--active"
              : "review-filters__btn--inactive"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}