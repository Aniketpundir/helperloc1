import './TrustedBy.css';

const partners = [
    'Startup India',
    'MSME',
    'Google for Startups',
    'Razorpay',
    'DigiLocker',
];

export default function TrustedBy() {
    return (
        <section className="trusted-by">
            <div className="trusted-by__inner">
                <p className="trusted-by__label">Trusted &amp; Supported By</p>
                <div className="trusted-by__logos">
                    {partners.map((name) => (
                        <div key={name} className="trusted-by__logo-item">
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}