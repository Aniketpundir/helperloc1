import { useState } from 'react';
import './ProfileHeader.css';
import EditProfileModal from '../../EditProfileModal/EditProfileModal';

export default function ProfileHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="profile-header">
                {/* Banner */}
                <div className="profile-header__banner">
                    <div className="profile-header__banner-dots" aria-hidden="true" />
                </div>

                <div className="profile-header__body">
                    {/* Avatar */}
                    <div className="profile-header__avatar-wrap">
                        <img
                            className="profile-header__avatar"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBMM9UlMfoGQLS8eECCrSs_2IHwWbSw-lSKwBo0v7zhOiAsQmgfXS265uwLgskFLpmvrCSHJYb-izaa2f6XtZLiA_rLCpQ6LcNSIVj31RNdzF6RvwMtN89xWqmsfy2fq2KNxLrGxz8e3i3Oxq2bLFIycyxMvwi71h7tZ8vOHBDpw08jTdIp5Va8N034GJvF9sKeYv13pd7YJGQju2mWCzfFHh8n5O6WziFnfEhpBMeJDlzqX9qZTOmQN-urMHRUH6IetdAOyLA7aNE"
                            alt="Rahul Sharma"
                        />
                    </div>

                    {/* Info */}
                    <div className="profile-header__info">
                        <div className="profile-header__name-row">
                            <h1 className="profile-header__name">Rahul Sharma</h1>
                            <span className="profile-header__badge">
                                <span className="material-symbols-outlined profile-header__badge-icon">verified</span>
                                Verified Member
                            </span>
                        </div>
                        <div className="profile-header__meta">
                            <span className="profile-header__meta-item">
                                <span className="material-symbols-outlined">calendar_today</span>
                                Member since Dec 2024
                            </span>
                            <span className="profile-header__meta-item">
                                <span className="material-symbols-outlined">location_on</span>
                                Delhi, India
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="profile-header__actions">
                        <button className="profile-header__btn profile-header__btn--outline">
                            <span className="material-symbols-outlined">share</span>
                            Share Profile
                        </button>

                        {/* Edit Profile button — modal open karta hai */}
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

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <EditProfileModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}