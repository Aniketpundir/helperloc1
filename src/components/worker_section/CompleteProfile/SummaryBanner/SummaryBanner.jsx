import React from 'react';
import './SummaryBanner.css';

const SummaryBanner = ({ totalEarned = 18500, totalProjects = 9 }) => {
    return (
        <div className="complete-summary-banner">
            <span
                className="material-symbols-outlined complete-summary-banner__icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
            >
                account_balance_wallet
            </span>
            <h2 className="complete-summary-banner__text">
                Total Earned: ₹{totalEarned.toLocaleString('en-IN')} from{' '}
                {totalProjects} completed projects
            </h2>
        </div>
    );
};

export default SummaryBanner;