import { useState } from 'react';
import { toast } from 'react-toastify';
import './PersonalInfo.css';

const formatDisplayDate = (date) => {
    if (!date) return 'Not added';

    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const formatDateInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
};

const formatGender = (gender) => {
    if (!gender) return 'Not added';
    return gender
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function PersonalInfo({ profile, onUpdateProfile }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState({
        fullName: profile?.fullName || '',
        phone: profile?.phone || '',
        dateOfBirth: formatDateInput(profile?.dateOfBirth),
        gender: profile?.gender || 'male',
        nationality: profile?.nationality || 'Indian',
    });

    const handleSave = async () => {
        try {
            await onUpdateProfile({
                ...draft,
                dateOfBirth: draft.dateOfBirth || null,
            });
            setEditing(false);
            toast.success('Personal information updated.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update personal information.');
        }
    };

    const handleCancel = () => {
        setDraft({
            fullName: profile?.fullName || '',
            phone: profile?.phone || '',
            dateOfBirth: formatDateInput(profile?.dateOfBirth),
            gender: profile?.gender || 'male',
            nationality: profile?.nationality || 'Indian',
        });
        setEditing(false);
    };

    const fields = [
        { key: 'fullName', label: 'Full Name', value: profile?.fullName || 'Not added' },
        { key: 'email', label: 'Email Address', value: profile?.email || 'Not added' },
        { key: 'phone', label: 'Phone Number', value: profile?.phone || 'Not added' },
        { key: 'dateOfBirth', label: 'Date of Birth', value: formatDisplayDate(profile?.dateOfBirth) },
        { key: 'gender', label: 'Gender', value: formatGender(profile?.gender) },
        { key: 'nationality', label: 'Nationality', value: profile?.nationality || 'Not added' },
    ];

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
                <div className="pinfo-edit">
                    <div className="pinfo-grid">
                        <div className="pinfo-field">
                            <label className="pinfo-label">Full Name</label>
                            <input className="pinfo-input" value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} />
                        </div>
                        <div className="pinfo-field">
                            <label className="pinfo-label">Phone Number</label>
                            <input className="pinfo-input" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                        </div>
                        <div className="pinfo-field">
                            <label className="pinfo-label">Date of Birth</label>
                            <input className="pinfo-input" type="date" value={draft.dateOfBirth} onChange={(e) => setDraft({ ...draft, dateOfBirth: e.target.value })} />
                        </div>
                        <div className="pinfo-field">
                            <label className="pinfo-label">Gender</label>
                            <select className="pinfo-input" value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: e.target.value })}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                        </div>
                        <div className="pinfo-field">
                            <label className="pinfo-label">Nationality</label>
                            <input className="pinfo-input" value={draft.nationality} onChange={(e) => setDraft({ ...draft, nationality: e.target.value })} />
                        </div>
                    </div>
                    <div className="pinfo-edit__actions">
                        <button className="pinfo-btn pinfo-btn--cancel" onClick={handleCancel}>Cancel</button>
                        <button className="pinfo-btn pinfo-btn--save" onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
            ) : (
                <div className="pinfo-grid">
                    {fields.map((field) => (
                        <div key={field.key} className="pinfo-view-field">
                            <label className="pinfo-view-label">{field.label}</label>
                            <p className="pinfo-view-value">{field.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </article>
    );
}
