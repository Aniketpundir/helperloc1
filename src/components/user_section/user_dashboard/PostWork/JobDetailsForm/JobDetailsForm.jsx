import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearPostedWork, createWorkPost } from '../../../../../Redux/Slice/postWorkSlice';
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

const emptyForm = {
    workerType: '',
    title: '',
    address: '',
    urgency: 'soon',
    workers: 1,
    budgetMin: 600,
    budgetMax: 1500,
    description: '',
    datetime: '',
    photos: [],
};

function WorkerTypeDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = workerTypes.find((worker) => worker.value === value) || null;

    useEffect(() => {
        const handler = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setOpen(false);
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="wt-dropdown" ref={ref}>
            <button
                type="button"
                className={`wt-dropdown__trigger${open ? ' wt-dropdown__trigger--open' : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {selected ? (
                    <span className="wt-dropdown__selected">
                        <span className="material-symbols-outlined wt-dropdown__selected-icon">{selected.icon}</span>
                        <span className="wt-dropdown__selected-label">{selected.label}</span>
                    </span>
                ) : (
                    <span className="wt-dropdown__placeholder">Select worker type...</span>
                )}
                <span className={`material-symbols-outlined wt-dropdown__chevron${open ? ' wt-dropdown__chevron--open' : ''}`}>
                    expand_more
                </span>
            </button>

            {open && (
                <ul className="wt-dropdown__list" role="listbox">
                    {workerTypes.map((worker) => (
                        <li
                            key={worker.value}
                            role="option"
                            aria-selected={value === worker.value}
                            className={`wt-dropdown__option${value === worker.value ? ' wt-dropdown__option--selected' : ''}`}
                            onClick={() => {
                                onChange(worker.value);
                                setOpen(false);
                            }}
                        >
                            <span className="material-symbols-outlined wt-dropdown__option-icon">{worker.icon}</span>
                            <span className="wt-dropdown__option-label">{worker.label}</span>
                            {value === worker.value && (
                                <span className="material-symbols-outlined wt-dropdown__option-check">check</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function JobDetailsForm() {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { loading } = useSelector((state) => state.postWork);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [posted, setPosted] = useState(false);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.workerType) nextErrors.workerType = 'Please select a worker type.';
        if (!form.title.trim()) nextErrors.title = 'Job title is required.';
        else if (form.title.trim().length < 5) nextErrors.title = 'Title must be at least 5 characters.';
        if (!form.address.trim()) nextErrors.address = 'Address is required.';
        if (!form.description.trim()) nextErrors.description = 'Please describe the job.';
        else if (form.description.trim().length < 20) nextErrors.description = 'Description must be at least 20 characters.';
        if (!form.datetime) nextErrors.datetime = 'Please select a preferred date & time.';
        if (Number(form.budgetMin) < 0) nextErrors.budgetMin = 'Minimum budget cannot be negative.';
        if (Number(form.budgetMax) < 0) nextErrors.budgetMax = 'Maximum budget cannot be negative.';
        if (Number(form.budgetMax) < Number(form.budgetMin)) {
            nextErrors.budgetMax = 'Maximum budget must be greater than minimum budget.';
        }

        return nextErrors;
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files || []);
        const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

        if (validFiles.length !== files.length) {
            toast.error('Each image must be 5MB or less.');
        }

        handleChange('photos', validFiles.slice(0, 5));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        try {
            await dispatch(createWorkPost({
                workerType: form.workerType,
                title: form.title.trim(),
                address: form.address.trim(),
                urgency: form.urgency,
                workersNeeded: form.workers,
                budgetMin: Number(form.budgetMin),
                budgetMax: Number(form.budgetMax),
                description: form.description.trim(),
                preferredDateTime: form.datetime,
                photos: form.photos,
            })).unwrap();

            toast.success('Job posted successfully.');
            setPosted(true);
        } catch (message) {
            toast.error(message || 'Failed to post job.');
        }
    };

    if (posted) {
        return (
            <div className="jdf-card jdf-success">
                <span className="material-symbols-outlined jdf-success__icon">check_circle</span>
                <h2 className="jdf-success__heading">Job Posted Successfully!</h2>
                <p className="jdf-success__sub">Workers will start applying shortly. Check your bookings for updates.</p>
                <button
                    className="jdf-success__btn"
                    onClick={() => {
                        dispatch(clearPostedWork());
                        setForm(emptyForm);
                        setPosted(false);
                    }}
                >
                    Post Another Job
                </button>
            </div>
        );
    }

    return (
        <form className="jdf-card" onSubmit={handleSubmit} noValidate>
            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">engineering</span>
                    WHAT TYPE OF WORKER DO YOU NEED?
                </label>
                <WorkerTypeDropdown value={form.workerType} onChange={(value) => handleChange('workerType', value)} />
                {errors.workerType && <span className="jdf-error">{errors.workerType}</span>}
            </div>

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
                    onChange={(event) => handleChange('title', event.target.value)}
                />
                {errors.title && <span className="jdf-error">{errors.title}</span>}
            </div>

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
                        onChange={(event) => handleChange('address', event.target.value)}
                    />
                </div>
                {errors.address && <span className="jdf-error">{errors.address}</span>}
            </div>

            <div className="jdf-two-col">
                <div className="jdf-field">
                    <label className="jdf-label">
                        <span className="material-symbols-outlined jdf-label__icon">schedule</span>
                        HOW URGENT IS THIS JOB?
                    </label>
                    {[
                        { value: 'urgent', label: 'Urgent (Within 24 hours)' },
                        { value: 'soon', label: 'Soon (Next 2-3 days)' },
                        { value: 'flexible', label: 'Flexible' },
                    ].map((option) => (
                        <label key={option.value} className={`jdf-radio-row${form.urgency === option.value ? ' jdf-radio-row--active' : ''}`}>
                            <input
                                type="radio"
                                name="urgency"
                                value={option.value}
                                checked={form.urgency === option.value}
                                onChange={() => handleChange('urgency', option.value)}
                                className="jdf-radio"
                            />
                            <span className="jdf-radio-label">{option.label}</span>
                        </label>
                    ))}
                </div>

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

            <div className="jdf-field">
                <div className="jdf-label-row">
                    <label className="jdf-label">
                        <span className="material-symbols-outlined jdf-label__icon">payments</span>
                        ESTIMATED BUDGET
                    </label>
                    <span className="jdf-budget-badge">
                        ₹{Number(form.budgetMin).toLocaleString()} - ₹{Number(form.budgetMax).toLocaleString()}
                    </span>
                </div>

                <div className="jdf-budget-grid">
                    <label className="jdf-budget-input-wrap">
                        <span className="jdf-budget-input-label">Minimum</span>
                        <span className="jdf-budget-input-prefix">₹</span>
                        <input
                            className={`jdf-input jdf-budget-input${errors.budgetMin ? ' jdf-input--error' : ''}`}
                            type="number"
                            min={0}
                            step={100}
                            value={form.budgetMin}
                            onChange={(event) => handleChange('budgetMin', Math.max(0, Number(event.target.value)))}
                        />
                    </label>
                    <label className="jdf-budget-input-wrap">
                        <span className="jdf-budget-input-label">Maximum</span>
                        <span className="jdf-budget-input-prefix">₹</span>
                        <input
                            className={`jdf-input jdf-budget-input${errors.budgetMax ? ' jdf-input--error' : ''}`}
                            type="number"
                            min={0}
                            step={100}
                            value={form.budgetMax}
                            onChange={(event) => handleChange('budgetMax', Math.max(0, Number(event.target.value)))}
                        />
                    </label>
                </div>

                <div className="jdf-slider-wrap">
                    <label className="jdf-slider-field">
                        <span className="jdf-slider-title">Adjust minimum budget</span>
                        <input
                            className="jdf-slider"
                            type="range"
                            min={0}
                            max={100000}
                            step={100}
                            value={form.budgetMin}
                            onChange={(event) => {
                                const nextMin = Number(event.target.value);
                                handleChange('budgetMin', nextMin);
                                if (nextMin > Number(form.budgetMax)) handleChange('budgetMax', nextMin);
                            }}
                        />
                    </label>
                    <label className="jdf-slider-field">
                        <span className="jdf-slider-title">Adjust maximum budget</span>
                        <input
                            className="jdf-slider"
                            type="range"
                            min={0}
                            max={100000}
                            step={100}
                            value={form.budgetMax}
                            onChange={(event) => handleChange('budgetMax', Number(event.target.value))}
                        />
                    </label>
                    <div className="jdf-slider-labels">
                        <span>₹0</span>
                        <span>₹1,00,000</span>
                    </div>
                </div>
                {(errors.budgetMin || errors.budgetMax) && (
                    <span className="jdf-error">{errors.budgetMin || errors.budgetMax}</span>
                )}
            </div>

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
                    onChange={(event) => handleChange('description', event.target.value)}
                />
                {errors.description && <span className="jdf-error">{errors.description}</span>}
            </div>

            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">calendar_today</span>
                    PREFERRED DATE & TIME
                </label>
                <input
                    className={`jdf-input${errors.datetime ? ' jdf-input--error' : ''}`}
                    type="datetime-local"
                    value={form.datetime}
                    onChange={(event) => handleChange('datetime', event.target.value)}
                />
                {errors.datetime && <span className="jdf-error">{errors.datetime}</span>}
            </div>

            <div className="jdf-field">
                <label className="jdf-label">
                    <span className="material-symbols-outlined jdf-label__icon">photo_camera</span>
                    UPLOAD PHOTOS (OPTIONAL)
                </label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
                <div className="jdf-upload" onClick={() => fileInputRef.current?.click()}>
                    <span className="material-symbols-outlined jdf-upload__icon">cloud_upload</span>
                    <p>
                        {form.photos.length > 0
                            ? `${form.photos.length} image${form.photos.length > 1 ? 's' : ''} selected`
                            : 'Click to upload or drag & drop images (max 5MB each)'}
                    </p>
                </div>
            </div>

            <div className="jdf-review__note">
                <span className="material-symbols-outlined">info</span>
                By posting this job you agree to HelperLoc's{' '}
                <a className="jdf-link" href="#">Terms of Service</a> and{' '}
                <a className="jdf-link" href="#">Privacy Policy</a>.
            </div>

            <button type="submit" className="jdf-submit-btn" disabled={loading}>
                <span className="material-symbols-outlined">send</span>
                {loading ? 'Posting...' : 'Post Job'}
            </button>
        </form>
    );
}
