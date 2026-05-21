import { useState, useRef } from 'react';
import './WorkerProfileHeader.css';

const initialStats = {
    jobs: 9,
    rating: 4.8,
    earned: '₹18,500',
};

export default function WorkerProfileHeader() {
    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState('Ramesh Kumar');
    const [draftName, setDraftName] = useState('Ramesh Kumar');
    const fileRef = useRef(null);

    const saveNameEdit = () => { setName(draftName); setEditingName(false); };
    const cancelNameEdit = () => { setDraftName(name); setEditingName(false); };

    return (
        <section className="wph">
            {/* Left: Avatar + identity */}
            <div className="wph__identity">
                {/* Avatar with upload button */}
                <div className="wph__avatar-wrap">
                    <img
                        className="wph__avatar"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOEkKiApiNWmBro4BquHRD_0YG6sH7MCPWZRJ_7Jq2f9e9HONu1nRveroLud190EaInJ0CTuLvx61fs7cY4JK354Q-P6r_jv-fgdbyu46kxPftW_5RyzrI9RKlJw7r2LbuPmvgjpic5RihHvrrEb81cXAH8cVmhO5JZUbbsCqhVFykQ8fscEVzgJkeNT8U8cSw3qU-sjMMfJhJdoGHDHP0W9Q60zK2EUcuTZphtUgNJdoXJq9_O_sUXYQyoF_He5x1oVz4rat-qwjs"
                        alt="Ramesh Kumar"
                    />
                    <button className="wph__avatar-edit" onClick={() => fileRef.current?.click()} aria-label="Change photo">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} />
                </div>

                {/* Name + meta */}
                <div className="wph__info">
                    {editingName ? (
                        <div className="wph__name-edit">
                            <input
                                className="wph__name-input"
                                value={draftName}
                                onChange={(e) => setDraftName(e.target.value)}
                                autoFocus
                            />
                            <div className="wph__name-actions">
                                <button className="wph__name-btn wph__name-btn--save" onClick={saveNameEdit}>Save</button>
                                <button className="wph__name-btn wph__name-btn--cancel" onClick={cancelNameEdit}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="wph__name-row">
                            <h3 className="wph__name">{name}</h3>
                            <button className="wph__inline-edit-btn" onClick={() => setEditingName(true)} aria-label="Edit name">
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                        </div>
                    )}

                    <div className="wph__badges">
                        <span className="wph__role-badge">⚡ Electrician</span>
                        <span className="wph__location">
                            <span className="material-symbols-outlined">location_on</span> Delhi, India
                        </span>
                    </div>
                    <p className="wph__since">
                        <span className="material-symbols-outlined">event</span> Member since Jan 2024
                    </p>
                </div>
            </div>

            {/* Right: Stats + verifications */}
            <div className="wph__right">
                <div className="wph__stats">
                    <div className="wph__stat-card">
                        <span className="wph__stat-val">{initialStats.jobs}</span>
                        <span className="wph__stat-label">Jobs Done</span>
                    </div>
                    <div className="wph__stat-card">
                        <span className="wph__stat-val">
                            {initialStats.rating}
                            <span className="material-symbols-outlined wph__star">star</span>
                        </span>
                        <span className="wph__stat-label">Avg Rating</span>
                    </div>
                    <div className="wph__stat-card">
                        <span className="wph__stat-val">{initialStats.earned}</span>
                        <span className="wph__stat-label">Total Earned</span>
                    </div>
                </div>

                <div className="wph__verifications">
                    <span className="wph__verify-badge wph__verify-badge--green">
                        <span className="material-symbols-outlined">verified</span> Aadhaar Verified
                    </span>
                    <span className="wph__verify-badge wph__verify-badge--green">
                        <span className="material-symbols-outlined">policy</span> Police Verified
                    </span>
                </div>
            </div>
        </section>
    );
}