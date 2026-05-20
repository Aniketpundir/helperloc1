import { useState } from 'react';
import './Addresses.css';

const initialAddresses = [
    { id: 1, type: 'Home', icon: 'home', address: '402, Sunshine Apartments, Saket, New Delhi - 110017', isDefault: true },
    { id: 2, type: 'Office', icon: 'work', address: 'Cyber City, Tower B, 12th Floor, Gurgaon, Haryana - 122002', isDefault: false },
];

const emptyDraft = { type: '', icon: 'home', address: '', isDefault: false };

export default function Addresses() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [editingId, setEditingId] = useState(null); // null = view, 0 = new
    const [draft, setDraft] = useState(emptyDraft);

    const openNew = () => {
        setDraft(emptyDraft);
        setEditingId(0);
    };

    const openEdit = (addr) => {
        setDraft({ ...addr });
        setEditingId(addr.id);
    };

    const handleDelete = (id) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    const handleSave = () => {
        if (!draft.type.trim() || !draft.address.trim()) return;

        if (editingId === 0) {
            const newId = Date.now();
            setAddresses((prev) => [...prev, { ...draft, id: newId }]);
        } else {
            setAddresses((prev) => prev.map((a) => (a.id === editingId ? { ...draft } : a)));
        }
        setEditingId(null);
    };

    const handleCancel = () => setEditingId(null);

    return (
        <article className="profile-card">
            <div className="profile-card__header">
                <h2 className="profile-card__title">
                    <span className="material-symbols-outlined">location_on</span>
                    Addresses
                </h2>
                <button className="profile-card__edit-btn" onClick={openNew}>+ Add New</button>
            </div>

            <div className="addr-list">
                {addresses.map((a) =>
                    editingId === a.id ? (
                        /* ── Inline edit form ── */
                        <div key={a.id} className="addr-form">
                            <div className="addr-form__row">
                                <div className="addr-form__field">
                                    <label className="pinfo-label">Label (e.g. Home, Office)</label>
                                    <input className="pinfo-input" value={draft.type}
                                        onChange={(e) => setDraft({ ...draft, type: e.target.value })} />
                                </div>
                            </div>
                            <div className="addr-form__field">
                                <label className="pinfo-label">Full Address</label>
                                <textarea className="pinfo-input addr-form__textarea" rows={2} value={draft.address}
                                    onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
                            </div>
                            <div className="addr-form__actions">
                                <button className="pinfo-btn pinfo-btn--cancel" onClick={handleCancel}>Cancel</button>
                                <button className="pinfo-btn pinfo-btn--save" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    ) : (
                        /* ── View row ── */
                        <div key={a.id} className={`addr-item${a.isDefault ? ' addr-item--default' : ''}`}>
                            <div className="addr-item__left">
                                <span className="material-symbols-outlined addr-item__icon">{a.icon}</span>
                                <div>
                                    <div className="addr-item__type-row">
                                        <span className="addr-item__type">{a.type}</span>
                                        {a.isDefault && <span className="addr-item__default-badge">Default</span>}
                                    </div>
                                    <p className="addr-item__address">{a.address}</p>
                                </div>
                            </div>
                            <div className="addr-item__actions">
                                <button className="addr-item__action-btn" onClick={() => openEdit(a)} aria-label="Edit">
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className="addr-item__action-btn addr-item__action-btn--delete"
                                    onClick={() => handleDelete(a.id)} aria-label="Delete">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    )
                )}

                {/* New address form */}
                {editingId === 0 && (
                    <div className="addr-form">
                        <div className="addr-form__row">
                            <div className="addr-form__field">
                                <label className="pinfo-label">Label (e.g. Home, Office)</label>
                                <input className="pinfo-input" placeholder="Home"
                                    value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} />
                            </div>
                        </div>
                        <div className="addr-form__field">
                            <label className="pinfo-label">Full Address</label>
                            <textarea className="pinfo-input addr-form__textarea" rows={2}
                                placeholder="Enter full address..."
                                value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
                        </div>
                        <div className="addr-form__actions">
                            <button className="pinfo-btn pinfo-btn--cancel" onClick={handleCancel}>Cancel</button>
                            <button className="pinfo-btn pinfo-btn--save" onClick={handleSave}>Add Address</button>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}