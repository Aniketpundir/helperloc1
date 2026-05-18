import './DepartmentDirectory.css';

const departments = [
    {
        icon: 'support_agent',
        title: 'Customer Support',
        desc: 'Help with bookings, refunds, and service quality.',
        email: 'support@helperloc.com',
    },
    {
        icon: 'engineering',
        title: 'Worker Relations',
        desc: 'Onboarding support and payout inquiries for pros.',
        email: 'pros@helperloc.com',
    },
    {
        icon: 'handshake',
        title: 'Partnerships',
        desc: 'Vendor registration and corporate alliances.',
        email: 'partners@helperloc.com',
    },
    {
        icon: 'payments',
        title: 'Sales',
        desc: 'Enterprise solutions and bulk booking inquiries.',
        email: 'sales@helperloc.com',
    },
];

export default function DepartmentDirectory() {
    return (
        <section className="dept-dir">
            <div className="dept-dir__inner">
                <div className="dept-dir__header">
                    <h2 className="dept-dir__heading">Department Directory</h2>
                    <p className="dept-dir__sub">Reach the right team for faster resolution</p>
                </div>

                <div className="dept-dir__grid">
                    {departments.map((d) => (
                        <div key={d.title} className="dept-card">
                            <span className="material-symbols-outlined dept-card__icon">{d.icon}</span>
                            <h4 className="dept-card__title">{d.title}</h4>
                            <p className="dept-card__desc">{d.desc}</p>
                            <a className="dept-card__email" href={`mailto:${d.email}`}>
                                {d.email}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}