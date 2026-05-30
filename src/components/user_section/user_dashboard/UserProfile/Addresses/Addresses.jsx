import { useState } from 'react';
import { toast } from 'react-toastify';
import './Addresses.css';

const emptyDraft = { label: '', icon: 'home', address: '', isDefault: false };

export default function Addresses({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress }) {
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(emptyDraft);

    const openNew = () => {
        setDraft(emptyDraft);
        setEditingId(0);
    };

    const openEdit = (address) => {
        setDraft({
            label: address.label || '',
            icon: address.icon || 'home',
            address: address.address || '',
            isDefault: !!address.isDefault,
        });
        setEditingId(address._id);
    };

    const handleDelete = async (id) => {
        try {
            await onDeleteAddress(id);
            toast.success('Address deleted.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete address.');
        }
    };

    const handleSave = async () => {
        if (!draft.label.trim() || !draft.address.trim()) return;

        try {
            if (editingId === 0) {
                await onAddAddress(draft);
                toast.success('Address added.');
            } else {
                await onUpdateAddress(editingId, draft);
                toast.success('Address updated.');
            }
            setEditingId(null);
            setDraft(emptyDraft);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save address.');
        }
    };

    const handleCancel = () => setEditingId(null);

    const renderForm = (saveLabel) => (
        <div className="addr-form">
            <div className="addr-form__row">
                <div className="addr-form__field">
                    <label className="pinfo-label">Label (e.g. Home, Office)</label>
                    <input
                        className="pinfo-input"
                        value={draft.label}
                        onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                    />
                </div>
            </div>
            <div className="addr-form__field">
                <label className="pinfo-label">Full Address</label>
                <textarea
                    className="pinfo-input addr-form__textarea"
                    rows={2}
                    value={draft.address}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                />
            </div>
            <label className="addr-form__field">
                <input
                    type="checkbox"
                    checked={draft.isDefault}
                    onChange={(e) => setDraft({ ...draft, isDefault: e.target.checked })}
                />{' '}
                Set as default
            </label>
            <div className="addr-form__actions">
                <button className="pinfo-btn pinfo-btn--cancel" onClick={handleCancel}>Cancel</button>
                <button className="pinfo-btn pinfo-btn--save" onClick={handleSave}>{saveLabel}</button>
            </div>
        </div>
    );

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
                {addresses.length === 0 && editingId !== 0 && (
                    <p className="addr-item__address">No addresses saved yet. Add one above!</p>
                )}

                {addresses.map((address) =>
                    editingId === address._id ? (
                        <div key={address._id}>{renderForm('Save')}</div>
                    ) : (
                        <div key={address._id} className={`addr-item${address.isDefault ? ' addr-item--default' : ''}`}>
                            <div className="addr-item__left">
                                <span className="material-symbols-outlined addr-item__icon">{address.icon || 'home'}</span>
                                <div>
                                    <div className="addr-item__type-row">
                                        <span className="addr-item__type">{address.label}</span>
                                        {address.isDefault && <span className="addr-item__default-badge">Default</span>}
                                    </div>
                                    <p className="addr-item__address">{address.address}</p>
                                </div>
                            </div>
                            <div className="addr-item__actions">
                                <button className="addr-item__action-btn" onClick={() => openEdit(address)} aria-label="Edit">
                                    <span className="material-symbols-outlined">edit</span>
                                </button>
                                <button className="addr-item__action-btn addr-item__action-btn--delete" onClick={() => handleDelete(address._id)} aria-label="Delete">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        </div>
                    )
                )}

                {editingId === 0 && renderForm('Add Address')}
            </div>
        </article>
    );
}
