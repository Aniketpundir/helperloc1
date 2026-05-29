import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './SkillsTab.css';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORKER_URL = `${API}/workers`;

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

const serviceLabelById = allServices.reduce((acc, service) => {
    acc[service.id] = service.label;
    return acc;
}, {});

const serviceIdByLabel = allServices.reduce((acc, service) => {
    acc[service.label.toLowerCase()] = service.id;
    return acc;
}, {});

export default function SkillsTab() {
    const [services, setServices] = useState(['electrician', 'cleaning']);
    const [experience, setExperience] = useState('intermediate');
    const [editingRate, setEditingRate] = useState(false);
    const [rate, setRate] = useState(350);
    const [draftRate, setDraftRate] = useState(350);
    const [years, setYears] = useState(4);
    const [saveMsg, setSaveMsg] = useState('');
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`${WORKER_URL}/me`);
                const worker = data.worker;
                const activeServiceIds = (worker?.services || [])
                    .filter((service) => service.isActive)
                    .map((service) => serviceIdByLabel[service.name.toLowerCase()])
                    .filter(Boolean);

                if (activeServiceIds.length > 0) setServices(activeServiceIds);
                if (worker?.experienceLevel) setExperience(worker.experienceLevel);
                if (worker?.hourlyRate !== undefined) {
                    setRate(worker.hourlyRate);
                    setDraftRate(worker.hourlyRate);
                }
                if (worker?.yearsOfExperience !== undefined) {
                    setYears(worker.yearsOfExperience);
                }
            } catch (error) {
                if (error.response?.status !== 404) {
                    toast.error(error.response?.data?.message || 'Failed to load skills.');
                }
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, []);

    const toggleService = (id) =>
        setServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

    const saveRate = () => { setRate(draftRate); setEditingRate(false); };

    const handleSave = async () => {
        if (services.length === 0) {
            toast.error('Please select at least one service.');
            return;
        }

        try {
            setSaving(true);

            const payload = {
                services: allServices.map((service) => ({
                    name: service.label,
                    isActive: services.includes(service.id),
                })),
                primaryService: serviceLabelById[services[0]],
                experienceLevel: experience,
                yearsOfExperience: years,
                hourlyRate: rate,
            };

            const { data } = await axios.patch(`${WORKER_URL}/me/services`, payload);
            const worker = data.worker;
            const activeServiceIds = (worker?.services || [])
                .filter((service) => service.isActive)
                .map((service) => serviceIdByLabel[service.name.toLowerCase()])
                .filter(Boolean);

            setServices(activeServiceIds);
            setExperience(worker.experienceLevel);
            setRate(worker.hourlyRate);
            setDraftRate(worker.hourlyRate);
            setYears(worker.yearsOfExperience);
            setSaveMsg('Skills saved!');
            toast.success('Skills and services updated successfully.');
            setTimeout(() => setSaveMsg(''), 2500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save skills.');
        } finally {
            setSaving(false);
        }
    };

    if (loadingProfile) {
        return (
            <div className="skills-card">
                <span className="pit-save-msg">Loading skills...</span>
            </div>
        );
    }

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
                <button className="pit-save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Skills'}
                </button>
            </div>
        </div>
    );
}
