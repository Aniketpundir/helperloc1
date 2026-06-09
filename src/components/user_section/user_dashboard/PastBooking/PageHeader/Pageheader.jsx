import './PageHeader.css';

export default function PageHeader({ searchValue = '', onSearchChange, onExport }) {
    return (
        <div className="past-page-header">
            <div className="past-page-header__left">
                <h1 className="past-page-header__title">Booking History</h1>
                <p className="past-page-header__subtitle">Manage and review your past professional services.</p>
            </div>

            <div className="past-page-header__controls">
                {/* Search */}
                <div className="past-page-header__search-wrap">
                    <span className="material-symbols-outlined past-page-header__search-icon">search</span>
                    <input
                        className="past-page-header__search-input"
                        type="text"
                        placeholder="Search service or pro..."
                        value={searchValue}
                        onChange={(event) => onSearchChange?.(event.target.value)}
                    />
                </div>

                {/* Date Range */}
                <button className="past-page-header__ctrl-btn">
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span className="past-page-header__ctrl-label">Date Range</span>
                </button>

                {/* Export */}
                <button className="past-page-header__ctrl-btn" onClick={onExport}>
                    <span className="material-symbols-outlined">download</span>
                    <span className="past-page-header__ctrl-label">Export</span>
                </button>
            </div>
        </div>
    );
}
