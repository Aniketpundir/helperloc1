import { useState } from 'react';
import './Preferences.css';

const initialPrefs = [
    { key: 'emailMarketing', label: 'Email Marketing', sub: 'News and offers via email', on: true },
    { key: 'smsNotifications', label: 'SMS Notifications', sub: 'Real-time booking updates', on: true },
    { key: 'promoAlerts', label: 'Promo Alerts', sub: 'Exclusive service discounts', on: false },
    { key: 'twoFa', label: '2FA Security', sub: 'Two-factor authentication', on: true },
];

export default function Preferences() {
    const [prefs, setPrefs] = useState(
        Object.fromEntries(initialPrefs.map((p) => [p.key, p.on]))
    );

    const toggle = (key) =>
        setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <article className="profile-card">
            <h2 className="profile-card__title" style={{ marginBottom: 'var(--spacing-md)' }}>
                Preferences
            </h2>

            <div className="pref-list">
                {initialPrefs.map((p) => (
                    <div key={p.key} className="pref-item">
                        <div className="pref-item__info">
                            <p className="pref-item__label">{p.label}</p>
                            <p className="pref-item__sub">{p.sub}</p>
                        </div>

                        {/* Toggle switch */}
                        <button
                            type="button"
                            role="switch"
                            aria-checked={prefs[p.key]}
                            aria-label={p.label}
                            className={`pref-toggle${prefs[p.key] ? ' pref-toggle--on' : ' pref-toggle--off'}`}
                            onClick={() => toggle(p.key)}
                        >
                            <span className="pref-toggle__thumb" />
                        </button>
                    </div>
                ))}
            </div>
        </article>
    );
}