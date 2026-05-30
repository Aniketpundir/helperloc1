import { useRef, useState } from "react";
import { toast } from "react-toastify";
import './EditProfileModal.css';

const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=1565c0&color=fff&size=256&bold=true`;

const formatDateInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
};

export default function EditProfileModal({
    profile,
    onClose,
    onUpdateProfile,
    onUploadImage,
    onRemoveImage,
}) {
    const [form, setForm] = useState({
        fullName: profile?.fullName || '',
        dateOfBirth: formatDateInput(profile?.dateOfBirth),
        gender: profile?.gender || 'male',
        bio: profile?.bio || '',
        nationality: profile?.nationality || 'Indian',
        location: profile?.location || '',
    });
    const [photo, setPhoto] = useState(profile?.profileImage || avatarUrl(profile?.fullName));
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const updatedUser = await onUploadImage(file);
            setPhoto(updatedUser.profileImage || avatarUrl(updatedUser.fullName));
            toast.success('Profile photo updated.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to upload photo.');
        } finally {
            event.target.value = '';
        }
    };

    const handleRemovePhoto = async () => {
        try {
            const updatedUser = await onRemoveImage();
            setPhoto(avatarUrl(updatedUser.fullName));
            toast.success('Profile photo removed.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove photo.');
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await onUpdateProfile({
                fullName: form.fullName,
                dateOfBirth: form.dateOfBirth || null,
                gender: form.gender,
                bio: form.bio,
                nationality: form.nationality,
                location: form.location || null,
            });
            toast.success('Profile updated successfully.');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save profile.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose} />

            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">Edit Profile</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="modal-photo-section">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="modal-file-input"
                            onChange={handleFileChange}
                        />

                        <div className="modal-photo-wrap">
                            <img src={photo} alt="Profile" className="modal-photo-img" />
                        </div>

                        <div className="modal-photo-actions">
                            <button className="modal-photo-btn modal-photo-btn--change" onClick={handleChangePhoto}>
                                <span className="material-symbols-outlined modal-photo-btn-icon">upload</span>
                                Change Photo
                            </button>
                            <button className="modal-photo-btn modal-photo-btn--remove" onClick={handleRemovePhoto}>
                                <span className="material-symbols-outlined modal-photo-btn-icon">delete</span>
                                Remove Photo
                            </button>
                        </div>
                    </div>

                    <div className="modal-field">
                        <label className="modal-label">Full Name</label>
                        <input className="modal-input" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
                    </div>

                    <div className="modal-field">
                        <label className="modal-label">Date of Birth</label>
                        <input className="modal-input" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
                    </div>

                    <div className="modal-field">
                        <label className="modal-label">Gender</label>
                        <select className="modal-input modal-select" name="gender" value={form.gender} onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                    </div>

                    <div className="modal-field">
                        <label className="modal-label">Nationality</label>
                        <input className="modal-input" name="nationality" type="text" value={form.nationality} onChange={handleChange} />
                    </div>

                    <div className="modal-field">
                        <label className="modal-label">Location</label>
                        <input className="modal-input" name="location" type="text" value={form.location} onChange={handleChange} />
                    </div>

                    <div className="modal-field">
                        <div className="modal-label-row">
                            <label className="modal-label">Bio / About</label>
                            <span className="modal-char-count">{form.bio.length}/200</span>
                        </div>
                        <textarea
                            className="modal-input modal-textarea"
                            rows={3}
                            name="bio"
                            value={form.bio}
                            maxLength={200}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="modal-btn modal-btn--cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-btn modal-btn--save" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}
