import './FAQSection.css';

const userFaqs = [
    {
        question: 'How do I verify a professional?',
        answer:
            'All HelperLoc pros go through a rigorous 3-step verification process including background checks, identity verification, and manual portfolio reviews.',
    },
    {
        question: 'What is your refund policy?',
        answer:
            'Cancellations made 24 hours prior to the service are 100% refundable. Late cancellations may incur a small administrative fee.',
    },
    {
        question: 'Can I book recurring services?',
        answer:
            'Yes! When booking, you can choose weekly, bi-weekly, or monthly frequencies and often receive a discount for recurring appointments.',
    },
];

const workerFaqs = [
    {
        question: 'When do I get paid?',
        answer:
            'Payments are processed immediately after job completion and usually appear in your linked bank account within 3-5 business days.',
    },
    {
        question: 'How are service fees calculated?',
        answer:
            'HelperLoc takes a transparent 15% service fee on all bookings to cover platform maintenance, marketing, and insurance.',
    },
    {
        question: 'Is there insurance coverage?',
        answer:
            'Yes, we provide standard general liability protection for all jobs booked through the platform up to $1M.',
    },
];

function FAQGroup({ icon, title, items }) {
    return (
        <div className="faq-group">
            <h3 className="faq-group__title">
                <span className="material-symbols-outlined">{icon}</span>
                {title}
            </h3>
            <div className="faq-group__list">
                {items.map((item) => (
                    <details key={item.question} className="faq-item">
                        <summary className="faq-item__summary">
                            <span className="faq-item__question">{item.question}</span>
                            <span className="material-symbols-outlined faq-item__icon">add</span>
                        </summary>
                        <div className="faq-item__answer">{item.answer}</div>
                    </details>
                ))}
            </div>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section className="faq-section">
            <div className="faq-section__container">
                <div className="faq-section__header">
                    <h2 className="faq-section__heading">Frequently Asked Questions</h2>
                    <p className="faq-section__subheading">Find quick answers to the most common inquiries.</p>
                </div>
                <div className="faq-section__grid">
                    <FAQGroup icon="group" title="For Users" items={userFaqs} />
                    <FAQGroup icon="work" title="For Professionals" items={workerFaqs} />
                </div>
            </div>
        </section>
    );
}