import './SupportCTA.css';

const ctaButtons = [
    { icon: 'chat', label: 'Live Chat', variant: 'primary' },
    { icon: 'mail', label: 'Email Us', variant: 'outline' },
    { icon: 'call', label: 'Call Us', variant: 'outline' },
];

export default function SupportCTA() {
    return (
        <section className="support-cta">
            <div className="support-cta__container">
                <div className="support-cta__card">
                    <div className="support-cta__bg-circle" />
                    <div className="support-cta__body">
                        <div className="support-cta__icon-wrap">
                            <span className="material-symbols-outlined support-cta__main-icon">support_agent</span>
                        </div>
                        <h2 className="support-cta__heading">Didn't find what you're looking for?</h2>
                        <p className="support-cta__subtext">
                            Our award-winning support team is available 24/7 to assist you with any questions or concerns.
                        </p>
                        <div className="support-cta__actions">
                            {ctaButtons.map((btn) => (
                                <button
                                    key={btn.label}
                                    className={`support-cta__btn support-cta__btn--${btn.variant}`}
                                >
                                    <span className="material-symbols-outlined">{btn.icon}</span>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}