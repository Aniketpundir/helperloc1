// PaymentFlow.jsx
import './PaymentFlow.css';

const steps = [
    { icon: 'payments', label: 'You Pay', green: false },
    { icon: 'lock_clock', label: 'Escrow Holds', green: false },
    { icon: 'construction', label: 'Job Done', green: false },
    { icon: 'verified_user', label: 'You Confirm', green: false },
    { icon: 'done_all', label: 'Worker Paid', green: true },
];

const PaymentFlow = () => {
    return (
        <section className="payment-flow">
            <div className="payment-flow__inner">
                <div className="payment-flow__card">
                    <h2 className="payment-flow__heading">Secure Payment Flow</h2>

                    <div className="payment-flow__steps">
                        {/* Dashed connectors (desktop) */}
                        <div className="payment-flow__connector payment-flow__connector--1" />
                        <div className="payment-flow__connector payment-flow__connector--2" />
                        <div className="payment-flow__connector payment-flow__connector--3" />
                        <div className="payment-flow__connector payment-flow__connector--4" />

                        {steps.map((step) => (
                            <div className="payment-flow__step" key={step.label}>
                                <div className={`payment-flow__step-icon ${step.green ? 'payment-flow__step-icon--green' : ''}`}>
                                    <span className="material-symbols-outlined">{step.icon}</span>
                                </div>
                                <span className={`payment-flow__step-label ${step.green ? 'payment-flow__step-label--green' : ''}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="payment-flow__info">
                        <span className="material-symbols-outlined">info</span>
                        <p className="payment-flow__info-text">
                            Payment is NEVER released without your confirmation. We guarantee your
                            satisfaction before a single penny moves to the worker.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentFlow;