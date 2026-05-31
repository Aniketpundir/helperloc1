import React, { useState } from 'react';
import './FilterBar.css';

export default function FilterBar() {
    const [serviceType, setServiceType] = useState('all');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState('today');
    const [verifiedOnly, setVerifiedOnly] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleReset = () => {
        setServiceType('all');
        setLocation('');
        setAvailability('today');
        setVerifiedOnly(true);
    };

    const handleApply = () => {
        setMobileOpen(false);
        // Apply filter logic here
    };

    const FilterContent = () => (
        <>
            {/* Service Type */}
            <div className="Listed_Worker-filter-group">
                <label className="Listed_Worker-filter-label">Service Type</label>
                <div className="Listed_Worker-select-wrapper">
                    <select
                        className="Listed_Worker-select"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                    >
                        <option value="all">All Services</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="cleaner">Cleaner</option>
                        <option value="painter">Painter</option>
                        <option value="ac">AC Repair</option>
                    </select>
                    <span className="material-symbols-outlined Listed_Worker-select-icon">expand_more</span>
                </div>
            </div>

            {/* Location */}
            <div className="Listed_Worker-filter-group">
                <label className="Listed_Worker-filter-label">Location</label>
                <div className="Listed_Worker-input-wrapper">
                    <span className="material-symbols-outlined Listed_Worker-input-icon">my_location</span>
                    <input
                        type="text"
                        className="Listed_Worker-input"
                        placeholder="Enter City..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
            </div>

            {/* Availability */}
            <div className="Listed_Worker-filter-group">
                <label className="Listed_Worker-filter-label">Availability</label>
                <div className="Listed_Worker-button-group">
                    <button
                        className={`Listed_Worker-availability-btn ${availability === 'today' ? 'Listed_Worker-active' : ''}`}
                        onClick={() => setAvailability('today')}
                    >
                        Today
                    </button>
                    <button
                        className={`Listed_Worker-availability-btn ${availability === 'tomorrow' ? 'Listed_Worker-active' : ''}`}
                        onClick={() => setAvailability('tomorrow')}
                    >
                        Tomorrow
                    </button>
                    <button
                        className={`Listed_Worker-availability-btn ${availability === 'flexible' ? 'Listed_Worker-active' : ''}`}
                        onClick={() => setAvailability('flexible')}
                    >
                        Flexible
                    </button>
                </div>
            </div>

            {/* Verified Only Toggle */}
            <div className="Listed_Worker-filter-actions">
                <div className="Listed_Worker-toggle-wrapper">
                    <span className="Listed_Worker-toggle-label">Verified Only</span>
                    <label className="Listed_Worker-toggle">
                        <input
                            type="checkbox"
                            checked={verifiedOnly}
                            onChange={(e) => setVerifiedOnly(e.target.checked)}
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
            {/* ── DESKTOP: normal sticky filter bar ── */}
            <section className="Listed_Worker-filter-bar-section Listed_Worker-desktop-filter">
                <div className="Listed_Worker-filter-container">
                    <div className="Listed_Worker-filter-content">
                        <FilterContent />
                    </div>
                </div>
            </section>

            {/* ── MOBILE: floating filter button ── */}
            <div className="Listed_Worker-mobile-filter-trigger">
                <button
                    className="Listed_Worker-mobile-filter-btn"
                    onClick={() => setMobileOpen(true)}
                >
                    <span className="material-symbols-outlined">tune</span>
                    Filters
                </button>
            </div>

            {/* ── MOBILE: Bottom Sheet Modal ── */}
            {mobileOpen && (
                <div
                    className="Listed_Worker-modal-overlay"
                    onClick={() => setMobileOpen(false)}
                >
                    <div
                        className="Listed_Worker-modal-sheet"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sheet Handle */}
                        <div className="Listed_Worker-sheet-handle"></div>

                        {/* Modal Header */}
                        <div className="Listed_Worker-modal-header">
                            <h3 className="Listed_Worker-modal-title">Filters</h3>
                            <button
                                className="Listed_Worker-modal-close"
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="Listed_Worker-modal-body">
                            <FilterContent />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}