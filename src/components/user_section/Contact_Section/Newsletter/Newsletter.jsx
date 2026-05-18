import { useState } from 'react';
import './Newsletter.css';

export default function Newsletter() {
    const [type, setType] = useState('user');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = () => {
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        setSubscribed(true);
    };

    return (
        <section className="newsletter">
            <div className="newsletter__inner">
                <h2 className="newsletter__heading">Join the Community</h2>
                <p className="newsletter__sub">
                    Stay updated with the latest services and pro-tips from HelperLoc.
                </p>

                {/* Radio toggle */}
                <div className="newsletter__toggle">
                    <label className="newsletter__radio-label">
                        <input
                            type="radio"
                            name="sub_type"
                            className="newsletter__radio"
                            checked={type === 'user'}
                            onChange={() => setType('user')}
                        />
                        <span className={`newsletter__radio-text${type === 'user' ? ' newsletter__radio-text--active' : ''}`}>
                            I'm a User
                        </span>
                    </label>
                    <label className="newsletter__radio-label">
                        <input
                            type="radio"
                            name="sub_type"
                            className="newsletter__radio"
                            checked={type === 'worker'}
                            onChange={() => setType('worker')}
                        />
                        <span className={`newsletter__radio-text${type === 'worker' ? ' newsletter__radio-text--active' : ''}`}>
                            I'm a Worker
                        </span>
                    </label>
                </div>

                {subscribed ? (
                    <div className="newsletter__success">
                        <span className="material-symbols-outlined newsletter__success-icon">mark_email_read</span>
                        <p>You're subscribed! Check your inbox for a confirmation.</p>
                    </div>
                ) : (
                    <>
                        <div className="newsletter__form">
                            <input
                                className={`newsletter__input${error ? ' newsletter__input--error' : ''}`}
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            />
                            <button className="newsletter__btn" onClick={handleSubscribe}>
                                Subscribe Now
                            </button>
                        </div>
                        {error && <p className="newsletter__error">{error}</p>}
                    </>
                )}
            </div>
        </section>
    );
}