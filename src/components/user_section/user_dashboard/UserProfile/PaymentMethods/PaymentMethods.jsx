import './PaymentMethods.css';

const payments = [
    { id: 1, icon: 'credit_card', label: 'Visa Card', sub: '**** 4242' },
    { id: 2, icon: 'account_balance', label: 'Axis Bank', sub: 'Debit Card' },
    { id: 3, icon: 'smartphone', label: 'Google Pay', sub: 'UPI: rahul@okaxis' },
];

export default function PaymentMethods() {
    return (
        <article className="profile-card">
            <div className="profile-card__header">
                <h2 className="profile-card__title">
                    <span className="material-symbols-outlined">payments</span>
                    Payment Methods
                </h2>
                <button className="profile-card__edit-btn">+ Add Method</button>
            </div>

            <div className="payment-grid">
                {payments.map((p) => (
                    <div key={p.id} className="payment-card">
                        <div className="payment-card__deco" aria-hidden="true" />
                        <span className="material-symbols-outlined payment-card__icon">{p.icon}</span>
                        <p className="payment-card__label">{p.label}</p>
                        <p className="payment-card__sub">{p.sub}</p>
                    </div>
                ))}
            </div>
        </article>
    );
}