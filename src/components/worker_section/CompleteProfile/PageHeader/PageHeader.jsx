import React, { useState, useRef, useEffect } from 'react';
import './PageHeader.css';

const filterOptions = ['All Time', 'This Month', 'Last 3 Months', 'This Year'];

const PageHeader = ({ selectedFilter, onFilterChange }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    return (
        <div className="complete-page-header">
            <div className="complete-page-header__text">
                <h1 className="complete-page-header__title">Completed Projects</h1>
                <p className="complete-page-header__subtitle">Your successfully finished work history</p>
            </div>

            <div className="complete-page-header__filter" ref={dropdownRef}>
                <button
                    className="complete-page-header__filter-btn"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                >
                    {selectedFilter}
                    <span
                        className="material-symbols-outlined complete-page-header__filter-chevron"
                        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        expand_more
                    </span>
                </button>

                {open && (
                    <ul className="complete-page-header__dropdown" role="listbox">
                        {filterOptions.map((option) => (
                            <li
                                key={option}
                                role="option"
                                aria-selected={option === selectedFilter}
                                className={`complete-page-header__dropdown-item ${option === selectedFilter ? 'complete-page-header__dropdown-item--active' : ''
                                    }`}
                                onClick={() => {
                                    onFilterChange(option);
                                    setOpen(false);
                                }}
                            >
                                {option === selectedFilter && (
                                    <span className="material-symbols-outlined complete-page-header__dropdown-check">
                                        check
                                    </span>
                                )}
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PageHeader;