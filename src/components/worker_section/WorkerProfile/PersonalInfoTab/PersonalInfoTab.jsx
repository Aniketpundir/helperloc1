import { useState } from 'react';
import './PersonalInfoTab.css';

function EditableField({ label, icon, value, type = 'text', onSave, disabled, rightSlot }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    const save = () => { onSave(draft); setEditing(false); };
    const cancel = () => { setDraft(value); setEditing(false); };

    return (
        <div className="pit-field">
            <label className="pit-label">
                {icon && <span className="material-symbols-outlined pit-label__icon">{icon}</span>}
                {label}
            </label>

            {disabled ? (
                <div className="pit-input-wrap pit-input-wrap--disabled">
                    <input className="pit-input pit-input--disabled" value={value} disabled readOnly />
                    <div className="pit-input-right">
                        <span className="material-symbols-outlined pit-verified-icon">verified</span>
                        <span className="material-symbols-outlined pit-lock-icon">lock</span>
                    </div>
                </div>
            ) : editing ? (
                <div className="pit-edit-wrap">
                    {type === 'textarea' ? (
                        <textarea
                            className="pit-input pit-textarea"
                            rows={3}
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <input
                            className="pit-input"
                            type={type}
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            autoFocus
                        />
                    )}
                    <div className="pit-edit-actions">
                        <button className="pit-btn pit-btn--cancel" onClick={cancel}>Cancel</button>
                        <button className="pit-btn pit-btn--save" onClick={save}>Save</button>
                    </div>
                </div>
            ) : (
                <div className="pit-input-wrap">
                    <span className="pit-view-val">{value}</span>
                    {rightSlot}
                    <button className="pit-edit-icon-btn" onClick={() => setEditing(true)} aria-label={`Edit ${label}`}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </div>
            )}
        </div>
    );
}

function GenderField({ value, onSave }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    const options = ['Male', 'Female', 'Other'];

    const save = () => { onSave(draft); setEditing(false); };
    const cancel = () => { setDraft(value); setEditing(false); };

    return (
        <div className="pit-field pit-field--full">
            <div className="pit-label-row">
                <label className="pit-label">Gender</label>
                {!editing && (
                    <button className="pit-text-edit-btn" onClick={() => setEditing(true)}>
                        <span className="material-symbols-outlined">edit</span> Edit
                    </button>
                )}
            </div>

            {editing ? (
                <>
                    <div className="pit-gender-row">
                        {options.map((o) => (
                            <label key={o} className={`pit-gender-opt${draft === o ? ' pit-gender-opt--active' : ''}`}>
                                <input
                                    type="radio"
                                    name="gender-edit"
                                    value={o}
                                    checked={draft === o}
                                    onChange={() => setDraft(o)}
                                    style={{ display: 'none' }}
                                />
                                {o}
                            </label>
                        ))}
                    </div>
                    <div className="pit-edit-actions">
                        <button className="pit-btn pit-btn--cancel" onClick={cancel}>Cancel</button>
                        <button className="pit-btn pit-btn--save" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <div className="pit-gender-row">
                    {options.map((o) => (
                        <span key={o} className={`pit-gender-opt${value === o ? ' pit-gender-opt--active' : ''}`}>{o}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

function TagField({ label, icon, tags: initTags, placeholder, onSave }) {
    const [tags, setTags] = useState(initTags);
    const [input, setInput] = useState('');

    const addTag = () => {
        const t = input.trim();
        if (t && !tags.includes(t)) {
            const next = [...tags, t];
            setTags(next);
            onSave(next);
        }
        setInput('');
    };

    const removeTag = (tag) => {
        const next = tags.filter((t) => t !== tag);
        setTags(next);
        onSave(next);
    };

    return (
        <div className="pit-field">
            <label className="pit-label">
                {icon && <span className="material-symbols-outlined pit-label__icon">{icon}</span>}
                {label}
            </label>
            <div className="pit-tag-box">
                {tags.map((t) => (
                    <span key={t} className="pit-tag">
                        {t}
                        <button className="pit-tag__remove" onClick={() => removeTag(t)} aria-label={`Remove ${t}`}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </span>
                ))}
                <input
                    className="pit-tag-input"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                />
            </div>
            <p className="pit-tag-hint">Press Enter or comma to add</p>
        </div>
    );
}

export default function PersonalInfoTab() {
    const [data, setData] = useState({
        fullName: 'Ramesh Kumar',
        email: 'ramesh.kumar@example.com',
        dob: '1990-05-15',
        gender: 'Male',
        address: 'House No. 452, Sector 15, Dwarka, New Delhi - 110075',
        cities: ['Delhi', 'Gurugram'],
        languages: ['Hindi', 'English'],
    });

    const update = (key, val) => setData((prev) => ({ ...prev, [key]: val }));

    const [saveMsg, setSaveMsg] = useState('');
    const handleSave = () => {
        setSaveMsg('Changes saved!');
        setTimeout(() => setSaveMsg(''), 2500);
    };

    return (
        <div className="pit-card">
            <div className="pit-grid">
                <EditableField label="Full Name" icon="person" value={data.fullName} onSave={(v) => update('fullName', v)} />
                <EditableField label="Phone Number" icon="call" value="+91 9876543210" disabled />
                <EditableField label="Email Address" icon="mail" value={data.email} onSave={(v) => update('email', v)} type="email" />
                <EditableField label="Date of Birth" icon="calendar_month" value={data.dob} onSave={(v) => update('dob', v)} type="date" />
                <GenderField value={data.gender} onSave={(v) => update('gender', v)} />
                <EditableField label="Current Address" icon="home" value={data.address} onSave={(v) => update('address', v)} type="textarea" />
                {/* <TagField label="Service Area" icon="map" tags={data.cities} placeholder="Add city…" onSave={(v) => update('cities', v)} /> */}
                <TagField label="Languages Known" icon="translate" tags={data.languages} placeholder="Add language…" onSave={(v) => update('languages', v)} />
            </div>

            <div className="pit-footer">
                {saveMsg && <span className="pit-save-msg">{saveMsg}</span>}
                <button className="pit-save-btn" onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}