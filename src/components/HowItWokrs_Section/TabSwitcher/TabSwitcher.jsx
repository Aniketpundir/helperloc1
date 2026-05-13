import { useState } from 'react';
import './TabSwitcher.css';

const usersSteps = [
    {
        number: '01',
        color: 'blue',
        icon: 'search',
        badge: 'Step 1',
        title: 'Search & Select a Service',
        desc: 'Browse from 20+ home service categories. Type what you need or pick from popular services like Electrician, Plumber, Cleaner, or Painter.',
        tags: ['🏠 20+ Categories', '⚡ Instant Results', '📍 Location-based'],
        mockup: 'search',
    },
    {
        number: '02',
        color: 'blue',
        icon: 'person_check',
        badge: 'Step 2',
        title: 'Choose Your Verified Worker',
        desc: 'Browse worker profiles with ratings, reviews, experience, and verified badges. Compare pricing and pick the best match for your needs.',
        tags: ['⭐ Ratings & Reviews', '🛡️ ID Verified', '💰 Upfront Pricing'],
        mockup: 'worker',
    },
    {
        number: '03',
        color: 'blue',
        icon: 'calendar_month',
        badge: 'Step 3',
        title: 'Schedule & Confirm Booking',
        desc: 'Pick your preferred date and time slot. Add special instructions if needed. Get instant booking confirmation via SMS & email.',
        tags: ['📅 Flexible Timing', '📱 SMS Confirmation', '🔄 Easy Reschedule'],
        mockup: 'calendar',
    },
    {
        number: '04',
        color: 'green',
        icon: 'task_alt',
        badge: 'Step 4',
        title: 'Job Done — Pay Securely',
        desc: 'Worker arrives at scheduled time and completes the job. Payment is held in secure escrow and released only after you confirm job completion.',
        tags: ['🔒 Secure Escrow', '⭐ Rate Worker', '🧾 Digital Invoice'],
        mockup: 'payment',
        greenCard: true,
    },
];

const workersSteps = [
    {
        number: '01',
        color: 'blue',
        icon: 'edit_document',
        badge: 'Step 1',
        title: 'Register & Complete Profile',
        desc: 'Sign up free. Add your skills, experience, service area, and availability. Upload your Aadhaar and any skill certificates.',
        tags: ['🆓 Free Registration', '📋 Easy Form', '⏱️ 10 Minutes'],
        mockup: 'register',
    },
    {
        number: '02',
        color: 'blue',
        icon: 'verified_user',
        badge: 'Step 2',
        title: 'Get Aadhaar & Police Verified',
        desc: 'Complete our quick verification process. Aadhaar ID check + police background verification to build trust with customers.',
        tags: ['🪪 Aadhaar Check', '🚔 Police Verify', '✅ Trust Badge'],
        mockup: 'verify',
    },
    {
        number: '03',
        color: 'blue',
        icon: 'phone_android',
        badge: 'Step 3',
        title: 'Receive & Accept Job Requests',
        desc: 'Get notified when nearby customers book your service. Accept jobs that fit your schedule and location.',
        tags: ['📍 Near You', '🔔 Instant Alerts', '🗓️ Your Schedule'],
        mockup: 'jobs',
    },
    {
        number: '04',
        color: 'green',
        icon: 'payments',
        badge: 'Step 4',
        title: 'Complete Jobs & Earn',
        desc: 'Complete the job, get rated by customer, and receive payment instantly to your bank. Build your reputation and earn more!',
        tags: ['💸 Instant Payout', '⭐ Build Ratings', '📈 Grow Income'],
        mockup: 'earn',
        greenCard: true,
    },
];

const Mockup = ({ type }) => {
    if (type === 'search') return (
        <div className="hiw__mockup">
            <p className="hiw__mock-label">Search services</p>
            <div className="hiw__mock-bar hiw__mock-bar--blue" style={{ width: '90%' }} />
            <div className="hiw__mock-pill">⚡ Electrician</div>
            <div className="hiw__mock-pill">🪠 Plumber</div>
            <div className="hiw__mock-pill">✨ Cleaner</div>
        </div>
    );
    if (type === 'worker') return (
        <div className="hiw__mockup">
            <div className="hiw__mock-row">
                <div className="hiw__mock-avatar">
                    <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                    <p className="hiw__mock-name">Ramesh K.</p>
                    <p className="hiw__mock-stars">★★★★★</p>
                </div>
            </div>
            <div className="hiw__mock-bar" style={{ width: '70%' }} />
            <div className="hiw__mock-bar" style={{ width: '50%' }} />
            <div className="hiw__mock-btn">Hire</div>
        </div>
    );
    if (type === 'calendar') return (
        <div className="hiw__mockup">
            <p className="hiw__mock-label">Pick a slot</p>
            <div className="hiw__mock-slot hiw__mock-slot--active">9:00 AM</div>
            <div className="hiw__mock-slot">11:00 AM</div>
            <div className="hiw__mock-slot">2:00 PM</div>
        </div>
    );
    if (type === 'payment') return (
        <div className="hiw__mockup">
            <div className="hiw__mock-confirm hiw__mock-confirm--green">
                <span className="material-symbols-outlined">task_alt</span>
                Payment released!
            </div>
            <div className="hiw__mock-bar hiw__mock-bar--green" style={{ width: '80%', marginTop: 8 }} />
            <div className="hiw__mock-bar hiw__mock-bar--green" style={{ width: '55%' }} />
        </div>
    );
    if (type === 'register') return (
        <div className="hiw__mockup">
            <p className="hiw__mock-label">Your profile</p>
            <div className="hiw__mock-bar hiw__mock-bar--blue" style={{ width: '90%' }} />
            <div className="hiw__mock-bar" style={{ width: '70%' }} />
            <div className="hiw__mock-bar" style={{ width: '55%' }} />
            <div className="hiw__mock-pill">📤 Upload Aadhaar</div>
        </div>
    );
    if (type === 'verify') return (
        <div className="hiw__mockup">
            <p className="hiw__mock-label">Verification</p>
            <div className="hiw__mock-pill">✅ Aadhaar OK</div>
            <div className="hiw__mock-pill">🛡️ Police clear</div>
            <div className="hiw__mock-confirm hiw__mock-confirm--blue" style={{ marginTop: 6 }}>
                <span className="material-symbols-outlined">verified</span>
                Badge earned!
            </div>
        </div>
    );
    if (type === 'jobs') return (
        <div className="hiw__mockup">
            <p className="hiw__mock-label">New request</p>
            <div className="hiw__mock-pill">🔔 Electrician job</div>
            <div className="hiw__mock-bar" style={{ width: '80%' }} />
            <div className="hiw__mock-actions">
                <div className="hiw__mock-action hiw__mock-action--accept">Accept</div>
                <div className="hiw__mock-action hiw__mock-action--skip">Skip</div>
            </div>
        </div>
    );
    if (type === 'earn') return (
        <div className="hiw__mockup">
            <div className="hiw__mock-confirm hiw__mock-confirm--green">
                <span className="material-symbols-outlined">task_alt</span>
                ₹850 credited!
            </div>
            <p className="hiw__mock-stars" style={{ textAlign: 'center', marginTop: 8, fontSize: 16 }}>★★★★★</p>
            <p className="hiw__mock-label" style={{ textAlign: 'center' }}>Rated by customer</p>
        </div>
    );
    return null;
};

const Step = ({ step, isLast }) => (
    <div className="hiw__row">
        <div className="hiw__left">
            <div className={`hiw__circle hiw__circle--${step.color}`}>{step.number}</div>
            {!isLast && <div className="hiw__line" />}
        </div>
        <div className={`hiw__card ${step.greenCard ? 'hiw__card--green' : ''}`}>
            <div className="hiw__card-left">
                <div className={`hiw__icon-box ${step.greenCard ? 'hiw__icon-box--green' : ''}`}>
                    <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <span className={`hiw__badge ${step.greenCard ? 'hiw__badge--green' : ''}`}>{step.badge}</span>
                <p className="hiw__card-title">{step.title}</p>
                <p className="hiw__card-desc">{step.desc}</p>
                <div className="hiw__tags">
                    {step.tags.map((tag) => (
                        <span key={tag} className={`hiw__tag ${step.greenCard ? 'hiw__tag--green' : ''}`}>{tag}</span>
                    ))}
                </div>
            </div>
            <Mockup type={step.mockup} />
        </div>
    </div>
);

const TabSwitcher = () => {
    const [activeTab, setActiveTab] = useState('users');
    const steps = activeTab === 'users' ? usersSteps : workersSteps;
    const heading = activeTab === 'users' ? 'Getting help is this easy' : 'Start earning with HelperLoc';
    const subtext = activeTab === 'users' ? '3 simple steps to book your service' : 'Join thousands of skilled workers already earning';

    return (
        <section className="hiw">
            {/* Tab Switcher */}
            <div className="hiw__tab-bar">
                <div className="hiw__tab-wrap">
                    <button
                        className={`hiw__tab-btn ${activeTab === 'users' ? 'hiw__tab-btn--active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <span className="material-symbols-outlined">person</span>
                        For Users
                    </button>
                    <button
                        className={`hiw__tab-btn ${activeTab === 'workers' ? 'hiw__tab-btn--active' : ''}`}
                        onClick={() => setActiveTab('workers')}
                    >
                        <span className="material-symbols-outlined">handyman</span>
                        For Workers
                    </button>
                </div>
            </div>

            {/* Heading */}
            <div className="hiw__head">
                <h2 className="hiw__heading">{heading}</h2>
                <p className="hiw__subtext">{subtext}</p>
            </div>

            {/* Timeline */}
            <div className="hiw__timeline">
                {steps.map((step, i) => (
                    <Step key={step.number} step={step} isLast={i === steps.length - 1} />
                ))}
            </div>
        </section>
    );
};

export default TabSwitcher;