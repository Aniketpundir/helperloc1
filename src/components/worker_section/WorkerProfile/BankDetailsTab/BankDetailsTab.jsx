import { useState } from 'react';
import './BankDetailsTab.css';

const banks = ['State Bank of India (SBI)', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Kotak Mahindra Bank', 'Bank of Baroda'];

function BankDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bank-dropdown">
            <button
                type="button"
                className={`bank-dropdown__trigger${open ? ' bank-dropdown__trigger--open' : ''}`}
                onClick={() => setOpen((p) => !p)}
            >
                <span>{value}</span>
                <span className={`material-symbols-outlined bank-dropdown__chevron${open ? ' bank-dropdown__chevron--open' : ''}`}>expand_more</span>
            </button>

            {open && (
                <ul className="bank-dropdown__list">
                    {banks.map((b) => (
                        <li
                            key={b}
                            className={`bank-dropdown__option${value === b ? ' bank-dropdown__option--active' : ''}`}
                            onClick={() => { onChange(b); setOpen(false); }}
                        >
                            {b}
                            {value === b && <span className="material-symbols-outlined bank-dropdown__check">check</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function BankField({ label, value, type = 'text', masked, onSave }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const [show, setShow] = useState(false);

    const save = () => { onSave(draft); setEditing(false); };
    const cancel = () => { setDraft(value); setEditing(false); };

    const displayVal = masked && !show ? '••••••••' + value.slice(-4) : value;

    return (
        <div className="bank-field">
            <div className="bank-field__label-row">
                <label className="bank-label">{label}</label>
                {!editing && (
                    <button className="bank-edit-btn" onClick={() => { setDraft(value); setEditing(true); }}>
                        <span className="material-symbols-outlined">edit</span> Edit
                    </button>
                )}
            </div>

            {editing ? (
                <div className="bank-edit-wrap">
                    <input
                        className="bank-input"
                        type={type}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        autoFocus
                    />
                    <div className="bank-edit-actions">
                        <button className="pit-btn pit-btn--cancel" onClick={cancel}>Cancel</button>
                        <button className="pit-btn pit-btn--save" onClick={save}>Save</button>
                    </div>
                </div>
            ) : (
                <div className="bank-view">
                    <span className="bank-view__val">{displayVal}</span>
                    {masked && (
                        <button className="bank-show-btn" onClick={() => setShow((p) => !p)} aria-label="Toggle visibility">
                            <span className="material-symbols-outlined">{show ? 'visibility_off' : 'visibility'}</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default function BankDetailsTab() {
    const [bank, setBank] = useState('State Bank of India (SBI)');
    const [accNo, setAccNo] = useState('XXXXXXXX4592');
    const [ifsc, setIfsc] = useState('SBIN0001234');
    const [upi, setUpi] = useState('rameshk@okaxis');
    const [editingBank, setEditingBank] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    const handleSave = () => {
        setSaveMsg('Bank details saved!');
        setTimeout(() => setSaveMsg(''), 2500);
    };

    return (
        <div className="bank-card">
            {/* Info note */}
            <div className="bank-note">
                <span className="material-symbols-outlined bank-note__icon">info</span>
                <p>Your payments will be directly credited to this account. Ensure details are accurate.</p>
            </div>

            <div className="bank-form">
                {/* Bank name — dropdown */}
                <div className="bank-field bank-field--full">
                    <div className="bank-field__label-row">
                        <label className="bank-label">Bank Name</label>
                        {!editingBank && (
                            <button className="bank-edit-btn" onClick={() => setEditingBank(true)}>
                                <span className="material-symbols-outlined">edit</span> Edit
                            </button>
                        )}
                    </div>

                    {editingBank ? (
                        <div className="bank-edit-wrap">
                            <BankDropdown value={bank} onChange={setBank} />
                            <div className="bank-edit-actions">
                                <button className="pit-btn pit-btn--cancel" onClick={() => setEditingBank(false)}>Cancel</button>
                                <button className="pit-btn pit-btn--save" onClick={() => setEditingBank(false)}>Save</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bank-view">
                            <span className="bank-view__val">{bank}</span>
                        </div>
                    )}
                </div>

                {/* Account number */}
                <BankField label="Account Number" value={accNo} masked onSave={setAccNo} />

                {/* IFSC */}
                <BankField label="IFSC Code" value={ifsc} onSave={setIfsc} />

                {/* UPI */}
                <BankField label="UPI ID (Optional)" value={upi} onSave={setUpi} />
            </div>

            {/* Footer */}
            <div className="bank-footer">
                <span className="bank-ssl">
                    <span className="material-symbols-outlined">security</span> SSL Secured
                </span>
                <div className="bank-footer__right">
                    {saveMsg && <span className="pit-save-msg">{saveMsg}</span>}
                    <button className="bank-save-btn" onClick={handleSave}>Verify &amp; Save</button>
                </div>
            </div>
        </div>
    );
}