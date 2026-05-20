import './AccountSettings.css';

const settingsItems = [
    { icon: 'lock', label: 'Change Password' },
    { icon: 'notifications', label: 'Notifications' },
    { icon: 'shield', label: 'Privacy' },
];

export default function AccountSettings() {
    return (
        <article className="profile-card">
            <h2 className="profile-card__title" style={{ marginBottom: 'var(--spacing-md)' }}>
                Account Settings
            </h2>

            <ul className="accsettings-list">
                {settingsItems.map((item) => (
                    <li key={item.label}>
                        <button className="accsettings-item">
                            <span className="accsettings-item__left">
                                <span className="material-symbols-outlined accsettings-item__icon">{item.icon}</span>
                                {item.label}
                            </span>
                            <span className="material-symbols-outlined accsettings-item__chevron">chevron_right</span>
                        </button>
                    </li>
                ))}

                {/* Danger zone */}
                <li className="accsettings-danger-divider">
                    <button className="accsettings-item accsettings-item--danger">
                        <span className="material-symbols-outlined">delete</span>
                        Delete Account
                    </button>
                </li>
            </ul>
        </article>
    );
}