import { useState, useRef } from "react";
import './EditProfileModal.css';

const DEFAULT_PHOTO = "https://lh3.googleusercontent.com/aida-public/AB6AXuDBMM9UlMfoGQLS8eECCrSs_2IHwWbSw-lSKwBo0v7zhOiAsQmgfXS265uwLgskFLpmvrCSHJYb-izaa2f6XtZLiA_rLCpQ6LcNSIVj31RNdzF6RvwMtN89xWqmsfy2fq2KNxLrGxz8e3i3Oxq2bLFIycyxMvwi71h7tZ8vOHBDpw08jTdIp5Va8N034GJvF9sKeYv13pd7YJGQju2mWCzfFHh8n5O6WziFnfEhpBMeJDlzqX9qZTOmQN-urMHRUH6IetdAOyLA7aNE";

export default function EditProfileModal({ onClose }) {
    const [charCount, setCharCount] = useState(32);
    const [photo, setPhoto] = useState(DEFAULT_PHOTO);
    const [isRemoved, setIsRemoved] = useState(false);
    const fileInputRef = useRef(null);

    // Change Photo: hidden file input open karo
    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    // File select hone pe FileReader se preview set karo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setPhoto(ev.target.result);
            setIsRemoved(false);
        };
        reader.readAsDataURL(file);
        // Reset input so same file dobara bhi pick ho sake
        e.target.value = "";
    };

    // Remove Photo: photo null karo, initials placeholder dikhao
    const handleRemovePhoto = () => {
        setPhoto(null);
        setIsRemoved(true);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose} />

            <div className="modal-container">
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">Edit Profile</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <div className="modal-body">

                    {/* Profile Picture Section */}
                    <div className="modal-photo-section">

                        {/* Hidden file input — Change Photo ke liye */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="modal-file-input"
                            onChange={handleFileChange}
                        />

                        {/* Photo ya Initials placeholder */}
                        <div className="modal-photo-wrap">
                            {isRemoved ? (
                                <div className="modal-photo-placeholder">RS</div>
                            ) : (
                                <img src={photo} alt="Profile" className="modal-photo-img" />
                            )}
                        </div>

                        <div className="modal-photo-actions">
                            <button
                                className="modal-photo-btn modal-photo-btn--change"
                                onClick={handleChangePhoto}
                            >
                                <span className="material-symbols-outlined modal-photo-btn-icon">upload</span>
                                Change Photo
                            </button>
                            <button
                                className="modal-photo-btn modal-photo-btn--remove"
                                onClick={handleRemovePhoto}
                                disabled={isRemoved}
                            >
                                <span className="material-symbols-outlined modal-photo-btn-icon">delete</span>
                                Remove Photo
                            </button>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="modal-field">
                        <label className="modal-label">Full Name</label>
                        <input className="modal-input" type="text" defaultValue="Rahul Sharma" />
                    </div>

                    {/* Date of Birth */}
                    <div className="modal-field">
                        <label className="modal-label">Date of Birth</label>
                        <input className="modal-input" type="date" defaultValue="1990-03-15" />
                    </div>

                    {/* Gender */}
                    <div className="modal-field">
                        <label className="modal-label">Gender</label>
                        <select className="modal-input modal-select">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            <option>Prefer not to say</option>
                        </select>
                    </div>

                    {/* Bio */}
                    <div className="modal-field">
                        <div className="modal-label-row">
                            <label className="modal-label">Bio / About</label>
                            <span className="modal-char-count">{charCount}/200</span>
                        </div>
                        <textarea
                            className="modal-input modal-textarea"
                            rows={3}
                            defaultValue="Tech enthusiast, home services user"
                            onChange={(e) => setCharCount(e.target.value.length)}
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="modal-footer">
                    <button className="modal-btn modal-btn--cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-btn modal-btn--save">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}