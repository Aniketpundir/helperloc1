import './Verification.css';

const verifications = [
    {
        key: 'email',
        icon: 'mail',
        label: 'Email Verified',
        sub: 'Verified on Dec 10, 2024',
        verified: true,
    },
    {
        key: 'phone',
        icon: 'phone_iphone',
        label: 'Phone Verified',
        sub: 'Verified on Dec 12, 2024',
        verified: true,
    },
    {
        key: 'identity',
        icon: 'badge',
        label: 'Identity Verification',
        sub: 'Pending documentation',
        verified: false,
    },
];

export default function Verification() {
    return (
        <article className="profile-card">
            <h2 className="profile-card__title" style={{ marginBottom: 'var(--spacing-md)' }}>
                Verification
            </h2>

            <div className="verify-list">
                {verifications.map((v) => (
                    <div key={v.key} className={`verify-item${!v.verified ? ' verify-item--pending' : ''}`}>
                        {/* Icon bubble */}
                        <div className={`verify-item__bubble${v.verified ? ' verify-item__bubble--verified' : ' verify-item__bubble--pending'}`}>
                            <span className="material-symbols-outlined">{v.icon}</span>
                        </div>

                        {/* Text */}
                        <div className="verify-item__info">
                            <p className="verify-item__label">{v.label}</p>
                            <p className="verify-item__sub">{v.sub}</p>
                        </div>

                        {/* Status / action */}
                        {v.verified ? (
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