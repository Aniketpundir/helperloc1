import { useState } from 'react';
import { toast } from 'react-toastify';
import './ProfileHeader.css';
import EditProfileModal from '../../EditProfileModal/EditProfileModal';

const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=1565c0&color=fff&size=256&bold=true`;

const formatMemberSince = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

export default function ProfileHeader({ profile, onUpdateProfile, onUploadImage, onRemoveImage }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShare = async () => {
        const shareUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: `${profile?.fullName || 'User'} Profile`,
                    url: shareUrl,
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                toast.success('Profile link copied.');
            }
        } catch {
            toast.error('Unable to share profile.');
        }
    };

    const memberSince = formatMemberSince(profile?.createdAt);
    const location = profile?.location || 'India';

    return (
        <>
            <section className="profile-header">
                <div className="profile-header__banner">
                    <div className="profile-header__banner-dots" aria-hidden="true" />
                </div>

                <div className="profile-header__body">
                    <div className="profile-header__avatar-wrap">
                        <img
                            className="profile-header__avatar"
                            src={profile?.profileImage || avatarUrl(profile?.fullName)}
                            alt={profile?.fullName || 'User'}
                        />
                    </div>

                    <div className="profile-header__info">
                        <div className="profile-header__name-row">
                            <h1 className="profile-header__name">{profile?.fullName || 'User'}</h1>
                            {profile?.verification?.emailVerified && (
                                <span className="profile-header__badge">
                                    <span className="material-symbols-outlined profile-header__badge-icon">verified</span>
                                    Verified Member
                                </span>
                            )}
                        </div>
                        <div className="profile-header__meta">
                            {memberSince && (
                                <span className="profile-header__meta-item">
                                    <span className="material-symbols-outlined">calendar_today</span>
                                    Member since {memberSince}
                                </span>
                            )}
                            <span className="profile-header__meta-item">
                                <span className="material-symbols-outlined">location_on</span>
                                {location}
                            </span>
                        </div>
                    </div>

                    <div className="profile-header__actions">
                        <button className="profile-header__btn profile-header__btn--outline" onClick={handleShare}>
                            <span className="material-symbols-outlined">share</span>
                            Share Profile
                        </button>

                        <button
                            className="profile-header__btn profile-header__btn--filled"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="material-symbols-outlined">edit</span>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <EditProfileModal
                    profile={profile}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateProfile={onUpdateProfile}
                    onUploadImage={onUploadImage}
                    onRemoveImage={onRemoveImage}
                />
            )}
        </>
    );
}
