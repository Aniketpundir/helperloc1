import './UserProfile.css';
import ProfileHeader    from './ProfileHeader/ProfileHeader';
import QuickStats       from './QuickStats/QuickStats';
import PersonalInfo     from './PersonalInfo/PersonalInfo';
import Addresses        from './Addresses/Addresses';
import PaymentMethods   from './PaymentMethods/PaymentMethods';
import AccountSettings  from './AccountSettings/AccountSettings';
import Preferences      from './Preferences/Preferences';
import Verification     from './Verification/Verification';

export default function UserProfile() {
  return (
    <main className="profile-page">
      <ProfileHeader />
      <QuickStats />

      {/* Two-column layout */}
      <div className="profile-page__columns">
        {/* Left column — 65% */}
        <div className="profile-page__col profile-page__col--left">
          <PersonalInfo />
          <Addresses />
          <PaymentMethods />
        </div>

        {/* Right column — 35% */}
        <div className="profile-page__col profile-page__col--right">
          <AccountSettings />
          <Preferences />
          <Verification />
        </div>
      </div>
    </main>
  );
}