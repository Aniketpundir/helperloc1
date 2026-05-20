import { useState, useRef, useEffect } from 'react';
import './JobDetailsForm.css';

const workerTypes = [
    { value: 'electrician', label: 'Electrician', icon: 'electric_bolt' },
    { value: 'plumber', label: 'Plumber', icon: 'plumbing' },
    { value: 'cleaner', label: 'Cleaner', icon: 'cleaning_services' },
    { value: 'ac_repair', label: 'AC Repair', icon: 'ac_unit' },
    { value: 'carpenter', label: 'Carpenter', icon: 'carpenter' },
    { value: 'painter', label: 'Painter', icon: 'format_paint' },
    { value: 'pest_control', label: 'Pest Control', icon: 'pest_control' },
    { value: 'appliance', label: 'Appliance Repair', icon: 'home_repair_service' },
];

function WorkerTypeDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = workerTypes.find((w) => w.value === value) || null;

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="wt-dropdown" ref={ref}>
            <button
                type="button"
                className={`wt-dropdown__trigger${open ? ' wt-dropdown__trigger--open' : ''}`}
                onClick={() => setOpen((p) => !p)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {selected ? (
                    <span className="wt-dropdown__selected">
                        <span className="material-symbols-outlined wt-dropdown__selected-icon">{selected.icon}</span>
                        <span className="wt-dropdown__selected-label">{selected.label}</span>
                    </span>
                ) : (
                    <span className="wt-dropdown__placeholder">Select worker type…</span>
                )}
                <span className={`material-symbols-outlined wt-dropdown__chevron${open ? ' wt-dropdown__chevron--open' : ''}`}>
                    expand_more
                </span>
            </button>

            {open && (
                <ul className="wt-dropdown__list" role="listbox">
                    {workerTypes.map((w) => (
                        <li
                            key={w.value}
                            role="option"
                            aria-selected={value === w.value}
                            className={`wt-dropdown__option${value === w.value ? ' wt-dropdown__option--selected' : ''}`}
                            onClick={() => { onChange(w.value); setOpen(false); }}
                        >
                            <span className="material-symbols-outlined wt-dropdown__option-icon">{w.icon}</span>
                            <span className="wt-dropdown__option-label">{w.label}</span>
                            {value === w.value && (
                                <span className="material-symbols-outlined wt-dropdown__option-check">check</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const emptyForm = {
    workerType: '',
    title: '',
    address: '',
    urgency: 'soon',
    workers: 1,
    budget: 1500,
    description: '',
    datetime: '',
};

export default function JobDetailsForm() {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [posted, setPosted] = useState(false);

    const handleChange = (key, val) => {
        setForm((prev) => ({ ...prev, [key]: val }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.workerType) e.workerType = 'Please select a worker type.';
        if (!form.title.trim()) e.title = 'Job title is required.';
        else if (form.title.trim().length < 5) e.title = 'Title must be at least 5 characters.';
        if (!form.address.trim()) e.address = 'Address is required.';
        if (!form.description.trim()) e.description = 'Please describe the job.';
        else if (form.description.trim().length < 20) e.description = 'Description must be at least 20 characters.';
        if (!form.datetime) e.datetime = 'Please select a preferred date & time.';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setPosted(true);
    };

    if (posted) {
        return (
            <div className="jdf-card jdf-success">
                <span className="material-symbols-outlined jdf-success__icon">check_circle</span>
                <h2 className="jdf-success__heading">Job Posted Successfully!</h2>
                <p className="jdf-success__sub">Workers will start applying shortly. Check your bookings for updates.</p>
                <button className="jdf-success__btn" onClick={() => { setForm(emptyForm); setPosted(false); }}>
                    Post Another Job
                </button>
            </div>
        );
    }

    return (
        <form className="jdf-card" onSubmit={handleSubmit} noValidate>

            {/* Worker type */}
            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">engineering</span>
                    WHAT TYPE OF WORKER DO YOU NEED?
                </label>
                <WorkerTypeDropdown value={form.workerType} onChange={(v) => handleChange('workerType', v)} />
                {errors.workerType && <span className="jdf-error">{errors.workerType}</span>}
            </div>

            {/* Job title */}
            <div className="jdf-field">
                <div className="jdf-label-row">
                    <label className="jdf-label">
                        <span className="material-symbols-outlined jdf-label__icon">edit_note</span>
                        JOB TITLE
                    </label>
                    <span className="jdf-char-counter">{form.title.length}/80</span>
                </div>
                <input
                    className={`jdf-input${errors.title ? ' jdf-input--error' : ''}`}
                    type="text"
                    maxLength={80}
                    placeholder="e.g., Fix leaking tap in kitchen"
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />
                {errors.title && <span className="jdf-error">{errors.title}</span>}
            </div>

            {/* Address */}
            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">location_on</span>
                    WHERE DO YOU NEED THE WORK?
                </label>
                <div className="jdf-input-icon-wrap">
                    <span className="material-symbols-outlined jdf-input-icon">my_location</span>
                    <input
                        className={`jdf-input jdf-input--icon${errors.address ? ' jdf-input--error' : ''}`}
                        type="text"
                        placeholder="Enter your full address or landmarks"
                        value={form.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </div>
                {errors.address && <span className="jdf-error">{errors.address}</span>}
            </div>

            <div className="jdf-two-col">
                {/* Urgency */}
                <div className="jdf-field">
                    <label className="jdf-label">
                        <span className="material-symbols-outlined jdf-label__icon">schedule</span>
                        HOW URGENT IS THIS JOB?
                    </label>
                    {[
                        { value: 'urgent', label: 'Urgent (Within 24 hours)' },
                        { value: 'soon', label: 'Soon (Next 2-3 days)' },
                        { value: 'flexible', label: 'Flexible' },
                    ].map((opt) => (
                        <label key={opt.value} className={`jdf-radio-row${form.urgency === opt.value ? ' jdf-radio-row--active' : ''}`}>
                            <input
                                type="radio"
                                name="urgency"
                                value={opt.value}
                                checked={form.urgency === opt.value}
                                onChange={() => handleChange('urgency', opt.value)}
                                className="jdf-radio"
                            />
                            <span className="jdf-radio-label">{opt.label}</span>
                        </label>
                    ))}
                </div>

                {/* Workers count */}
                <div className="jdf-field">
                    <label className="jdf-label">
                        <span className="material-symbols-outlined jdf-label__icon">group</span>
                        HOW MANY WORKERS DO YOU NEED?
                    </label>
                    <div className="jdf-counter">
                        <button type="button" className="jdf-counter__btn" onClick={() => handleChange('workers', Math.max(1, form.workers - 1))} aria-label="Decrease">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="jdf-counter__val">{form.workers}</span>
                        <button type="button" className="jdf-counter__btn" onClick={() => handleChange('workers', Math.min(10, form.workers + 1))} aria-label="Increase">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Budget */}
            <div className="jdf-field">
                <div className="jdf-label-row">
                    <label className="jdf-label">
                        <span className="material-symbols-outlined jdf-label__icon">payments</span>
                        ESTIMATED BUDGET
                    </label>
                    <span className="jdf-budget-badge">
                        ₹{Math.round(form.budget * 0.4).toLocaleString()} – ₹{Number(form.budget).toLocaleString()}
                    </span>
                </div>
                <div className="jdf-slider-wrap">
                    <input
                        className="jdf-slider"
                        type="range"
                        min={200}
                        max={50000}
                        step={100}
                        value={form.budget}
                        onChange={(e) => handleChange('budget', Number(e.target.value))}
                    />
                    <div className="jdf-slider-labels">
                        <span>₹200</span>
                        <span>₹50,000</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">description</span>
                    DESCRIBE THE JOB IN DETAIL
                </label>
                <textarea
                    className={`jdf-input jdf-textarea${errors.description ? ' jdf-input--error' : ''}`}
                    rows={5}
                    placeholder="Explain what needs to be done, any special requirements, access details, etc."
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
                {errors.description && <span className="jdf-error">{errors.description}</span>}
            </div>

            {/* Date & Time */}
            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">calendar_today</span>
                    PREFERRED DATE & TIME
                </label>
                <input
                    className={`jdf-input${errors.datetime ? ' jdf-input--error' : ''}`}
                    type="datetime-local"
                    value={form.datetime}
                    onChange={(e) => handleChange('datetime', e.target.value)}
                />
                {errors.datetime && <span className="jdf-error">{errors.datetime}</span>}
            </div>

            {/* Upload */}
            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">photo_camera</span>
                    UPLOAD PHOTOS (OPTIONAL)
                </label>
                <div className="jdf-upload">
                    <span className="material-symbols-outlined jdf-upload__icon">cloud_upload</span>
                    <p>Click to upload or drag &amp; drop images (max 5MB each)</p>
                </div>
            </div>

            {/* Terms note */}
            <div className="jdf-review__note">
                <span className="material-symbols-outlined">info</span>
                By posting this job you agree to HelperLoc's{' '}
                <a className="jdf-link" href="#">Terms of Service</a> and{' '}
                <a className="jdf-link" href="#">Privacy Policy</a>.
            </div>

            {/* Submit button */}
            <button type="submit" className="jdf-submit-btn">
                <span className="material-symbols-outlined">send</span>
                Post Job
            </button>

        </form>
    );
}