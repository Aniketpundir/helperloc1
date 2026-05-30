import './Verification.css';

export default function Verification({ verification }) {
    const verifications = [
        {
            key: 'email',
            icon: 'mail',
            label: 'Email Verified',
            sub: verification?.emailVerified ? 'Verified' : 'Not verified',
            verified: !!verification?.emailVerified,
        },
        {
            key: 'phone',
            icon: 'phone_iphone',
            label: 'Phone Verified',
            sub: verification?.phoneVerified ? 'Verified' : 'Not verified',
            verified: !!verification?.phoneVerified,
        },
        {
            key: 'identity',
            icon: 'badge',
            label: 'Identity Verification',
            sub: verification?.identityVerified ? 'Verified' : 'Pending documentation',
            verified: !!verification?.identityVerified,
        },
    ];

    return (
        <article className="profile-card">
            <h2 className="profile-card__title" style={{ marginBottom: 'var(--spacing-md)' }}>
                Verification
            </h2>

            <div className="verify-list">
                {verifications.map((item) => (
                    <div key={item.key} className={`verify-item${!item.verified ? ' verify-item--pending' : ''}`}>
                        <div className={`verify-item__bubble${item.verified ? ' verify-item__bubble--verified' : ' verify-item__bubble--pending'}`}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>

                        <div className="verify-item__info">
                            <p className="verify-item__label">{item.label}</p>
                            <p className="verify-item__sub">{item.sub}</p>
                        </div>

                        {item.verified ? (
                            <span className="material-symbols-outlined verify-item__check">check_circle</span>
                        ) : (
                            <button className="verify-item__verify-btn">Verify</button>
                        )}
                    </div>
                ))}
            </div>
        </article>
    );
}
