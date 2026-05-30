import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserProfile.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import QuickStats from './QuickStats/QuickStats';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import Addresses from './Addresses/Addresses';
import AccountSettings from './AccountSettings/AccountSettings';
import Verification from './Verification/Verification';
import {
  addUserAddress,
  deleteUserAddress,
  fetchUserProfile,
  removeUserProfileImage,
  updateUserAddress,
  updateUserProfile,
  uploadUserProfileImage,
} from '../../../../Redux/Slice/userProfileSlice';

export default function UserProfile() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const runProfileAction = async (action) => {
    try {
      return await dispatch(action).unwrap();
    } catch (message) {
      throw { response: { data: { message } } };
    }
  };

  const handleUpdateProfile = async (payload) => {
    return runProfileAction(updateUserProfile(payload));
  };

  const handleUploadImage = async (file) => {
    return runProfileAction(uploadUserProfileImage(file));
  };

  const handleRemoveImage = async () => {
    return runProfileAction(removeUserProfileImage());
  };

  const handleAddAddress = async (payload) => {
    return runProfileAction(addUserAddress(payload));
  };

  const handleUpdateAddress = async (addressId, payload) => {
    return runProfileAction(updateUserAddress({ addressId, payload }));
  };

  const handleDeleteAddress = async (addressId) => {
    return runProfileAction(deleteUserAddress(addressId));
  };

  if (loading) {
    return <main className="profile-page">Loading profile...</main>;
  }

  return (
    <main className="profile-page">
      <ProfileHeader
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onUploadImage={handleUploadImage}
        onRemoveImage={handleRemoveImage}
      />
      <QuickStats stats={profile?.stats} />

      <div className="profile-page__columns">
        <div className="profile-page__col profile-page__col--left">
          <PersonalInfo profile={profile} onUpdateProfile={handleUpdateProfile} />
          <Addresses
            addresses={profile?.addresses || []}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        </div>

        <div className="profile-page__col profile-page__col--right">
          <AccountSettings />
          <Verification verification={profile?.verification} />
        </div>
      </div>
    </main>
  );
}
