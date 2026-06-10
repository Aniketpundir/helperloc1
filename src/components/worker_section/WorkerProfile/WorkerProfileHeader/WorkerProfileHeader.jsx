import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './WorkerProfileHeader.css';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORKER_URL = `${API}/workers`;

const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Worker')}&background=1565c0&color=fff&size=256&bold=true`;

const formatMemberSince = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

export default function WorkerProfileHeader() {
    const { user } = useSelector((state) => state.auth);
    const fileRef = useRef(null);

    const [profile, setProfile] = useState(null);
    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(user?.fullName || 'Worker');
    const [draftName, setDraftName] = useState(user?.fullName || 'Worker');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`${WORKER_URL}/me`);
                const worker = data.worker;
                const workerName = worker?.user?.fullName || user?.fullName || 'Worker';

                setProfile(worker);
                setName(workerName);
                setDraftName(workerName);
            } catch (error) {
                if (error.response?.status !== 404) {
                    toast.error(error.response?.data?.message || 'Failed to load worker profile.');
                }
            }
        };

        fetchProfile();
    }, [user]);

    const saveNameEdit = async () => {
        try {
            const { data } = await axios.patch(`${WORKER_URL}/me/personal-info`, {
                fullName: draftName.trim(),
            });
            const updatedName = data.worker?.user?.fullName || draftName.trim();

            setProfile(data.worker);
            setName(updatedName);
            setDraftName(updatedName);
            setEditingName(false);
            toast.success('Name updated successfully.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update name.');
        }
    };

    const cancelNameEdit = () => {
        setDraftName(name);
        setEditingName(false);
    };

    const handleImageChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('profileImage', file);

            const { data } = await axios.patch(`${WORKER_URL}/me/profile-image`, formData);

            setProfile(data.worker);
            toast.success('Profile image updated successfully.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to upload profile image.');
        } finally {
            setUploading(false);
            event.target.value = '';
        }
    };

    const primaryService =
        profile?.primaryService ||
        profile?.services?.find((service) => service.isActive)?.name ||
        'Worker';
    const location = profile?.city
        ? [profile.city, profile.country].filter(Boolean).join(', ')
        : 'Location not added';
    const memberSince = formatMemberSince(profile?.user?.createdAt || user?.createdAt);
    const imageSrc = profile?.profileImage || avatarUrl(name);

    return (
        <section className="wph">
            <div className="wph__identity">
                <div className="wph__avatar-wrap">
                    <img className="wph__avatar" src={imageSrc} alt={name} />
                    <button
                        className="wph__avatar-edit"
                        onClick={() => fileRef.current?.click()}
                        aria-label="Change photo"
                        disabled={uploading}
                    >
                        <span className="material-symbols-outlined">
                            {uploading ? 'hourglass_top' : 'edit'}
                        </span>
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>

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
                                <button className="wph__name-btn wph__name-btn--save" onClick={saveNameEdit}>
                                    Save
                                </button>
                                <button className="wph__name-btn wph__name-btn--cancel" onClick={cancelNameEdit}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="wph__name-row">
                            <h3 className="wph__name">{name}</h3>
                            <button
                                className="wph__inline-edit-btn"
                                onClick={() => setEditingName(true)}
                                aria-label="Edit name"
                            >
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                        </div>
                    )}

                    <div className="wph__badges">
                        <span className="wph__role-badge">{primaryService}</span>
                        <span className="wph__location">
                            <span className="material-symbols-outlined">location_on</span> {location}
                        </span>
                    </div>

                    {memberSince && (
                        <p className="wph__since">
                            <span className="material-symbols-outlined">event</span> Member since {memberSince}
                        </p>
                    )}
                </div>
            </div>

            <div className="wph__right">
                <div className="wph__stats">
                    <div className="wph__stat-card">
                        <span className="wph__stat-val">{profile?.jobsDone ?? 0}</span>
                        <span className="wph__stat-label">Jobs Done</span>
                    </div>
                    <div className="wph__stat-card">
                        <span className="wph__stat-val">
                            {(profile?.avgRating ?? 0).toFixed(1)}
                            <span className="material-symbols-outlined wph__star">star</span>
                        </span>
                        <span className="wph__stat-label">Avg Rating</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
