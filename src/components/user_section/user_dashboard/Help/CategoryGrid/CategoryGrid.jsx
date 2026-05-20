import './CategoryGrid.css';

const categories = [
    {
        icon: 'rocket_launch',
        title: 'Getting Started',
        description:
            'New to HelperLoc? Learn how to find trusted home professionals and book your first service in minutes.',
    },
    {
        icon: 'calendar_month',
        title: 'Booking & Scheduling',
        description:
            'Manage your upcoming appointments, learn how to reschedule, or cancel a booking if your plans change.',
    },
    {
        icon: 'payments',
        title: 'Payment & Billing',
        description:
            'Everything about secure payments, viewing your invoices, updating credit cards, and understanding our pricing.',
    },
    {
        icon: 'person',
        title: 'Account & Profile',
        description:
            'Keep your information secure. Update your address, contact details, and manage notification preferences.',
    },
    {
        icon: 'report_problem',
        title: 'Service Issues',
        description:
            'Need help with a completed service? Report issues, file claims, or leave feedback for your professional.',
    },
    {
        icon: 'engineering',
        title: 'Worker Support',
        description:
            'Exclusive resources for our service professionals. Managing jobs, payouts, and professional guidelines.',
    },
];

export default function CategoryGrid() {
    return (
        <section className="category-grid">
            <div className="category-grid__container">
                <div className="category-grid__header">
                    <h2 className="category-grid__heading">Browse by Topic</h2>
                    <div className="category-grid__divider" />
                </div>
                <div className="category-grid__grid">
                    {categories.map((cat) => (
                        <div key={cat.title} className="category-card">
                            <div className="category-card__icon-wrap">
                                <span className="material-symbols-outlined category-card__icon">{cat.icon}</span>
                            </div>
                            <h3 className="category-card__title">{cat.title}</h3>
                            <p className="category-card__desc">{cat.description}</p>
                            <a href="#" className="category-card__link">
                                Browse
                                <span className="material-symbols-outlined category-card__arrow">arrow_forward</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}