import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetListedWorkerFilters,
    setListedWorkerFilter,
} from '../../../../Redux/Slice/listedWorkerSlice';
import './FilterBar.css';

export default function FilterBar() {
    const dispatch = useDispatch();
    const { filters } = useSelector((state) => state.listedWorkers);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleFilterChange = (payload) => {
        dispatch(setListedWorkerFilter(payload));
    };

    const handleReset = () => {
        dispatch(resetListedWorkerFilters());
    };

    const handleApply = () => {
        setMobileOpen(false);
    };

    const FilterContent = () => (
        <>
            <div className="Listed_Worker-filter-group">
                <label className="Listed_Worker-filter-label">Service Type</label>
                <div className="Listed_Worker-select-wrapper">
                    <select
                        className="Listed_Worker-select"
                        value={filters.serviceType}
                        onChange={(e) => handleFilterChange({ serviceType: e.target.value })}
                    >
                        <option value="all">All Services</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumbing">Plumber</option>
                        <option value="cleaning">Cleaner</option>
                        <option value="painting">Painter</option>
                        <option value="ac">AC Repair</option>
                        <option value="carpentry">Carpenter</option>
                    </select>
                    <span className="material-symbols-outlined Listed_Worker-select-icon">expand_more</span>
                </div>
            </div>

            <div className="Listed_Worker-filter-group">
                <label className="Listed_Worker-filter-label">Location</label>
                <div className="Listed_Worker-input-wrapper">
                    <span className="material-symbols-outlined Listed_Worker-input-icon">my_location</span>
                    <input
                        type="text"
                        className="Listed_Worker-input"
                        placeholder="Enter City..."
                        value={filters.location}
                        onChange={(e) => handleFilterChange({ location: e.target.value })}
                    />
                </div>
            </div>

            <div className="Listed_Worker-filter-group">
                <label className="Listed_Worker-filter-label">Availability</label>
                <div className="Listed_Worker-button-group">
                    {['today', 'tomorrow', 'flexible'].map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={`Listed_Worker-availability-btn ${filters.availability === item ? 'Listed_Worker-active' : ''}`}
                            onClick={() => handleFilterChange({ availability: item })}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="Listed_Worker-filter-actions">
                <div className="Listed_Worker-toggle-wrapper">
                    <span className="Listed_Worker-toggle-label">Verified Only</span>
                    <label className="Listed_Worker-toggle">
                        <input
                            type="checkbox"
                            checked={filters.verifiedOnly}
                            onChange={(e) => handleFilterChange({ verifiedOnly: e.target.checked })}
                            className="Listed_Worker-toggle-input"
                        />
                        <div className="Listed_Worker-toggle-slider"></div>
                    </label>
                </div>

                <button className="Listed_Worker-btn-apply" onClick={handleApply}>Apply Filters</button>
                <button className="Listed_Worker-btn-reset" onClick={handleReset}>Reset</button>
            </div>
        </>
    );

    return (
        <>
            <section className="Listed_Worker-filter-bar-section Listed_Worker-desktop-filter">
                <div className="Listed_Worker-filter-container">
                    <div className="Listed_Worker-filter-content">
                        <FilterContent />
                    </div>
                </div>
            </section>

            <div className="Listed_Worker-mobile-filter-trigger">
                <button
                    className="Listed_Worker-mobile-filter-btn"
                    onClick={() => setMobileOpen(true)}
                >
                    <span className="material-symbols-outlined">tune</span>
                    Filters
                </button>
            </div>

            {mobileOpen && (
                <div
                    className="Listed_Worker-modal-overlay"
                    onClick={() => setMobileOpen(false)}
                >
                    <div
                        className="Listed_Worker-modal-sheet"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="Listed_Worker-sheet-handle"></div>

                        <div className="Listed_Worker-modal-header">
                            <h3 className="Listed_Worker-modal-title">Filters</h3>
                            <button
                                className="Listed_Worker-modal-close"
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="Listed_Worker-modal-body">
                            <FilterContent />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
