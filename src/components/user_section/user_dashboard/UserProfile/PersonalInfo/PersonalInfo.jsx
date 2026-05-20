import { useState } from 'react';
import './PersonalInfo.css';

const initialData = {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    dob: '15 July 1992',
    gender: 'Male',
    nationality: 'Indian',
};

const fields = [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'phone', label: 'Phone Number', type: 'tel' },
    { key: 'dob', label: 'Date of Birth', type: 'text' },
    { key: 'gender', label: 'Gender', type: 'text' },
    { key: 'nationality', label: 'Nationality', type: 'text' },
];

export default function PersonalInfo() {
    const [editing, setEditing] = useState(false);
    const [data, setData] = useState(initialData);
    const [draft, setDraft] = useState(initialData);

    const handleSave = () => {
        setData(draft);
        setEditing(false);
    };

    const handleCancel = () => {
        setDraft(data);
        setEditing(false);
    };

    return (
        <article className="profile-card">
            <div className="profile-card__header">
                <h2 className="profile-card__title">
                    <span className="material-symbols-outlined">person</span>
                    Personal Information
                </h2>
                {!editing && (
                    <button className="profile-card__edit-btn" onClick={() => setEditing(true)}>
                        Edit
                    </button>
                )}
            </div>

            {editing ? (
                /* ── Edit form ── */
                <div className="pinfo-edit">
                    <div className="pinfo-grid">
                        {fields.map((f) => (
                            <div key={f.key} className="pinfo-field">
                                <label className="pinfo-label" htmlFor={`pinfo-${f.key}`}>{f.label}</label>
                                <input
                                    id={`pinfo-${f.key}`}
                                    className="pinfo-input"
                                    type={f.type}
                                    value={draft[f.key]}
                                    onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="pinfo-edit__actions">
                        <button className="pinfo-btn pinfo-btn--cancel" onClick={handleCancel}>Cancel</button>
                        <button className="pinfo-btn pinfo-btn--save" onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
            ) : (
                /* ── View mode ── */
                <div className="pinfo-grid">
                    {fields.map((f) => (
                        <div key={f.key} className="pinfo-view-field">
                            <label className="pinfo-view-label">{f.label}</label>
                            <p className="pinfo-view-value">{data[f.key]}</p>
                        </div>
                    ))}
                </div>
            )}
        </article>
    );
}