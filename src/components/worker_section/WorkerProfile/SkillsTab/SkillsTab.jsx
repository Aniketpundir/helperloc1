import { useState } from 'react';
import './SkillsTab.css';

const allServices = [
    { id: 'electrician', label: 'Electrician Services', icon: 'bolt' },
    { id: 'cleaning', label: 'Deep Cleaning', icon: 'cleaning_services' },
    { id: 'plumbing', label: 'Plumbing', icon: 'plumbing' },
    { id: 'ac', label: 'AC Repair', icon: 'ac_unit' },
    { id: 'carpentry', label: 'Carpentry', icon: 'carpenter' },
];

const expOptions = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' },
];

export default function SkillsTab() {
    const [services, setServices] = useState(['electrician', 'cleaning']);
    const [experience, setExperience] = useState('intermediate');
    const [editingRate, setEditingRate] = useState(false);
    const [rate, setRate] = useState(350);
    const [draftRate, setDraftRate] = useState(350);
    const [years, setYears] = useState(4);
    const [saveMsg, setSaveMsg] = useState('');

    const toggleService = (id) =>
        setServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

    const saveRate = () => { setRate(draftRate); setEditingRate(false); };

    const handleSave = () => {
        setSaveMsg('Skills saved!');
        setTimeout(() => setSaveMsg(''), 2500);
    };

    return (
        <div className="skills-card">
            <div className="skills-grid">

                {/* Services */}
                <div className="skills-section">
                    <h4 className="skills-section__heading">My Services</h4>
                    <div className="skills-service-list">
                        {allServices.map((s) => {
                            const active = services.includes(s.id);
                            return (
                                <label key={s.id} className={`skills-service-item${active ? ' skills-service-item--active' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={active}
                                        onChange={() => toggleService(s.id)}
                                        className="skills-checkbox"
                                    />
                                    <span className="skills-service-label">{s.label}</span>
                                    <span className={`material-symbols-outlined skills-service-icon${active ? ' skills-service-icon--active' : ''}`}>
                                        {s.icon}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Experience level */}
                <div className="skills-section">
                    <h4 className="skills-section__heading">Experience Level</h4>
                    <div className="skills-exp-list">
                        {expOptions.map((opt) => (
                            <label
                                key={opt.value}
                                className={`skills-exp-item${experience === opt.value ? ' skills-exp-item--active' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="experience"
                                    value={opt.value}
                                    checked={experience === opt.value}
                                    onChange={() => setExperience(opt.value)}
                                    className="skills-radio"
                                />
                                <span className="skills-exp-label">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Hourly rate */}
                <div className="skills-field">
                    <div className="skills-label-row">
                        <label className="skills-label">Hourly Rate (₹)</label>
                        {!editingRate && (
                            <button className="skills-edit-btn" onClick={() => { setDraftRate(rate); setEditingRate(true); }}>
                                <span className="material-symbols-outlined">edit</span> Edit
                            </button>
                        )}
                    </div>

                    {editingRate ? (
                        <div className="skills-rate-edit">
                            <div className="skills-rate-input-wrap">
                                <span className="skills-rate-prefix">₹</span>
                                <input
                                    className="skills-rate-input"
                                    type="number"
                                    min={50}
                                    value={draftRate}
                                    onChange={(e) => setDraftRate(Number(e.target.value))}
                                    autoFocus
                                />
                            </div>
                            <div className="skills-edit-actions">
                                <button className="pit-btn pit-btn--cancel" onClick={() => setEditingRate(false)}>Cancel</button>
                                <button className="pit-btn pit-btn--save" onClick={saveRate}>Save</button>
                            </div>
                        </div>
                    ) : (
                        <div className="skills-rate-display">₹{rate} / hr</div>
                    )}
                </div>

                {/* Years of experience counter */}
                <div className="skills-field">
                    <label className="skills-label">Years of Experience</label>
                    <div className="skills-counter">
                        <button
                            className="skills-counter__btn skills-counter__btn--minus"
                            onClick={() => setYears((y) => Math.max(0, y - 1))}
                            aria-label="Decrease"
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="skills-counter__val">{years}</span>
                        <button
                            className="skills-counter__btn skills-counter__btn--plus"
                            onClick={() => setYears((y) => y + 1)}
                            aria-label="Increase"
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="pit-footer">
                {saveMsg && <span className="pit-save-msg">{saveMsg}</span>}
                <button className="pit-save-btn" onClick={handleSave}>Save Skills</button>
            </div>
        </div>
    );
}