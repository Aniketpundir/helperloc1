import { useState } from 'react';
import './ContactChannels.css';

/* ---------- Channel cards data ---------- */
const channels = [
    {
        icon: 'forum',
        title: 'Live Chat',
        guarantee: 'Guaranteed: 2 Mins',
        extra: { type: 'live' },
    },
    {
        icon: 'mail',
        title: 'Email Support',
        guarantee: 'Guaranteed: 4 Hours',
        extra: { type: 'text', value: 'support@helperloc.com' },
    },
    {
        icon: 'call',
        title: 'Phone Call',
        guarantee: 'Guaranteed: 5 Mins',
        extra: { type: 'text', value: '1800-HELPER-LOC' },
    },
    {
        icon: 'share',
        title: 'Social Media',
        guarantee: 'Guaranteed: 30 Mins',
        extra: { type: 'social' },
    },
];

/* ---------- Office cards data ---------- */
const offices = [
    {
        name: 'Meerut HQ (Corporate)',
        borderColor: 'var(--color-primary)',
        address: '123, Tech Plaza, Partapur Bypass, Meerut, UP – 250103',
        hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
    },
    {
        name: 'Delhi Support Center',
        borderColor: 'var(--color-secondary-container)',
        address: '4th Floor, Okhla Phase III, New Delhi – 110020',
        hours: 'Mon – Sat: 10:00 AM – 8:00 PM',
    },
    {
        name: 'Lucknow Branch',
        borderColor: 'var(--color-tertiary-container)',
        address: 'Gomti Nagar Extension, Lucknow, UP – 226010',
        hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    },
];

/* ---------- Subject options ---------- */
const subjects = [
    'Select an Inquiry Type',
    'Booking Issue',
    'Professional Registration',
    'Billing & Payment',
    'Partnership Request',
];

/* ========== Main Component ========== */
export default function ContactChannels() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    /* ---- Validation ---- */
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required.';
        if (!form.email.trim()) {
            e.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            e.email = 'Enter a valid email address.';
        }
        if (!form.phone.trim()) {
            e.phone = 'Phone number is required.';
        } else if (!/^[+]?[\d\s\-]{7,15}$/.test(form.phone)) {
            e.phone = 'Enter a valid phone number.';
        }
        if (!form.subject || form.subject === 'Select an Inquiry Type')
            e.subject = 'Please select an inquiry type.';
        if (!form.message.trim()) e.message = 'Message cannot be empty.';
        return e;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setSubmitted(true);
    };

    return (
        <section className="contact-channels">
            <div className="contact-channels__inner">

                {/* ---- Channel Cards ---- */}
                <div className="channel-cards">
                    {channels.map((ch) => (
                        <div key={ch.title} className="channel-card">
                            <div className="channel-card__icon-wrap">
                                <span className="material-symbols-outlined channel-card__icon">{ch.icon}</span>
                            </div>
                            <h3 className="channel-card__title">{ch.title}</h3>
                            <p className="channel-card__guarantee">{ch.guarantee}</p>

                            {ch.extra.type === 'live' && (
                                <span className="channel-card__live">
                                    <span className="channel-card__live-dot" />
                                    Available Now
                                </span>
                            )}
                            {ch.extra.type === 'text' && (
                                <p className="channel-card__extra-text">{ch.extra.value}</p>
                            )}
                            {ch.extra.type === 'social' && (
                                <div className="channel-card__social-icons">
                                    <span className="material-symbols-outlined">campaign</span>
                                    <span className="material-symbols-outlined">smart_display</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ---- Form + Offices grid ---- */}
                <div className="contact-main-grid">

                    {/* Contact Form */}
                    <div className="contact-form-wrap">
                        <h2 className="contact-form__heading">Send us a Message</h2>
                        <p className="contact-form__sub">
                            Complete the form below and our specialized team will get back to
                            you within our guaranteed response time.
                        </p>

                        {submitted ? (
                            <div className="contact-form__success">
                                <span className="material-symbols-outlined contact-form__success-icon">
                                    check_circle
                                </span>
                                <h3>Request Submitted!</h3>
                                <p>We'll get back to you within our guaranteed response time.</p>
                                <button
                                    className="contact-form__btn"
                                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>

                                <div className="contact-form__row">
                                    <div className="contact-form__field">
                                        <label className="contact-form__label">Full Name</label>
                                        <input
                                            className={`contact-form__input${errors.name ? ' contact-form__input--error' : ''}`}
                                            name="name"
                                            placeholder="Your Name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <span className="contact-form__error">{errors.name}</span>}
                                    </div>
                                    <div className="contact-form__field">
                                        <label className="contact-form__label">Email Address</label>
                                        <input
                                            className={`contact-form__input${errors.email ? ' contact-form__input--error' : ''}`}
                                            name="email"
                                            placeholder="email@example.com"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <span className="contact-form__error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="contact-form__row">
                                    <div className="contact-form__field">
                                        <label className="contact-form__label">Phone Number</label>
                                        <input
                                            className={`contact-form__input${errors.phone ? ' contact-form__input--error' : ''}`}
                                            name="phone"
                                            placeholder="+91 00000 00000"
                                            type="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
                                    </div>
                                    <div className="contact-form__field">
                                        <label className="contact-form__label">Subject</label>
                                        <select
                                            className={`contact-form__input${errors.subject ? ' contact-form__input--error' : ''}`}
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                        >
                                            {subjects.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        {errors.subject && <span className="contact-form__error">{errors.subject}</span>}
                                    </div>
                                </div>

                                <div className="contact-form__field">
                                    <label className="contact-form__label">Message</label>
                                    <textarea
                                        className={`contact-form__input contact-form__textarea${errors.message ? ' contact-form__input--error' : ''}`}
                                        name="message"
                                        placeholder="How can we help you today?"
                                        rows={4}
                                        value={form.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <span className="contact-form__error">{errors.message}</span>}
                                </div>

                                {/* Upload area — UI only */}
                                <div className="contact-form__field">
                                    <label className="contact-form__label">Attachments (Optional)</label>
                                    <div className="contact-form__upload">
                                        <span className="material-symbols-outlined contact-form__upload-icon">cloud_upload</span>
                                        <p>Click to upload or drag &amp; drop screenshots (max 5MB)</p>
                                    </div>
                                </div>

                                <button className="contact-form__btn" type="submit">
                                    Submit Request
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Office cards */}
                    <div className="office-cards">
                        {offices.map((o) => (
                            <div
                                key={o.name}
                                className="office-card"
                                style={{ borderLeftColor: o.borderColor }}
                            >
                                <h3 className="office-card__name">{o.name}</h3>
                                <div className="office-card__row">
                                    <span className="material-symbols-outlined office-card__icon">location_on</span>
                                    <p>{o.address}</p>
                                </div>
                                <div className="office-card__row">
                                    <span className="material-symbols-outlined office-card__icon">schedule</span>
                                    <p>{o.hours}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}