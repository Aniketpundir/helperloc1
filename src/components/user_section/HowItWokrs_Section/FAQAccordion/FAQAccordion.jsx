// FAQAccordion.jsx
import { useState } from 'react';
import './FAQAccordion.css';

const userFAQs = [
    {
        q: 'How do I know the worker is reliable?',
        a: 'Every worker undergoes a background check and ID verification before joining. You can also see their historical ratings and reviews.',
    },
    {
        q: 'Can I cancel a booking?',
        a: 'Yes, you can cancel a booking up to 2 hours before the scheduled time without any penalty.',
    },
    {
        q: "What if I'm not happy with the job?",
        a: "Raise a dispute within 24 hours. Our support team will review and ensure you're fully satisfied before releasing payment.",
    },
];

const workerFAQs = [
    {
        q: 'How do I get paid?',
        a: 'Once the customer confirms the job is done, funds are immediately moved from escrow to your HelperLoc wallet for withdrawal.',
    },
    {
        q: 'Are there platform fees?',
        a: 'We charge a small 10% service fee per completed job. No monthly subscription or hidden charges.',
    },
    {
        q: 'How do I increase my ranking?',
        a: 'Complete jobs on time, maintain high ratings, and respond quickly to requests to boost your visibility.',
    },
];

const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="faq__item">
            <button
                className={`faq__question-btn ${open ? 'faq__question-btn--open' : ''}`}
                onClick={() => setOpen(!open)}
            >
                <span>{q}</span>
                <span className="material-symbols-outlined">add</span>
            </button>
            <div className={`faq__answer ${open ? 'faq__answer--open' : ''}`}>
                <p>{a}</p>
            </div>
        </div>
    );
};

const FAQAccordion = () => {
    return (
        <section className="faq">
            <h2 className="faq__heading">Common Questions</h2>

            <div className="faq__grid">
                {/* Customers */}
                <div>
                    <h3 className="faq__col-title">
                        <span className="material-symbols-outlined">person</span>
                        For Customers
                    </h3>
                    <div className="faq__list">
                        {userFAQs.map((item) => (
                            <FAQItem key={item.q} q={item.q} a={item.a} />
                        ))}
                    </div>
                </div>

                {/* Workers */}
                <div>
                    <h3 className="faq__col-title">
                        <span className="material-symbols-outlined">handyman</span>
                        For Workers
                    </h3>
                    <div className="faq__list">
                        {workerFAQs.map((item) => (
                            <FAQItem key={item.q} q={item.q} a={item.a} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQAccordion;