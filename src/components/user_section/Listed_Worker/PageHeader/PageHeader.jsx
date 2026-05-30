import React from 'react';
import './PageHeader.css';

export default function PageHeader() {
  return (
    <header className="Listed_Worker-page-header">
      <div className="Listed_Worker-header-badge">
        <span>👷 5,000+ Verified Workers</span>
      </div>
      <h1 className="Listed_Worker-header-title">Find the Right Professional</h1>
      <p className="Listed_Worker-header-subtitle">
        Expert home services delivered at your doorstep by trusted and background-verified professionals.
      </p>
      <div className="Listed_Worker-header-stats">
        <div className="Listed_Worker-stat-item">
          <span className="material-symbols-outlined fill-icon">star</span>
          <span>4.8 Avg Rating</span>
        </div>
        <div className="Listed_Worker-stat-item">
          <span className="material-symbols-outlined">verified_user</span>
          <span>Aadhaar Verified</span>
        </div>
        <div className="Listed_Worker-stat-item">
          <span className="material-symbols-outlined">location_on</span>
          <span>15+ Cities</span>
        </div>
      </div>
    </header>
  );
}