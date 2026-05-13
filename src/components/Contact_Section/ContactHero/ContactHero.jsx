import './ContactHero.css';

const badges = [
    { icon: 'chat', label: 'Live Chat' },
    { icon: 'mail', label: 'Email Support' },
    { icon: 'call', label: '24/7 Helpline' },
];

export default function ContactHero() {
    return (
        <section className="contact-hero">
            <div className="contact-hero__inner">
                <h1 className="contact-hero__heading">Get in Touch with HelperLoc</h1>
                <p className="contact-hero__sub">
                    India's most trusted partner for home professional services. We're here
                    to help you solve any issue or answer any question.
                </p>
                <div className="contact-hero__badges">
                    {badges.map((b) => (
                        <div key={b.label} className="contact-hero__badge">
                            <span className="material-symbols-outlined contact-hero__badge-icon">
                                {b.icon}
                            </span>
                            <span className="contact-hero__badge-label">{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}