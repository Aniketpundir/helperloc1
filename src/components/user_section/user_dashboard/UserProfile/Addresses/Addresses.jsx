import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddress, updateAddress, deleteAddress } from '../../../../../Redux/Slice/addressSlice';
import { MdEdit, MdDelete, MdHome, MdWork, MdLocationOn, MdAdd, MdCheckCircle } from 'react-icons/md';
import './Addresses.css';

const MAX_ADDRESSES = 3;

const emptyDraft = {
    label: '',
    addressType: 'Home',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
};

const typeIcons = {
    Home: <MdHome />,
    Work: <MdWork />,
    Other: <MdLocationOn />,
};

export default function Addresses({
    selectedAddressId = null,
    onSelect = null,
    isBookingMode = false,
}) {
    const dispatch = useDispatch();
    const addresses = useSelector(state => state.address.addresses);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(emptyDraft);
    const [errors, setErrors] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    const isLimitReached = addresses.length >= MAX_ADDRESSES && !editingId;

    const validate = () => {
        const e = {};
        if (!draft.label.trim()) e.label = 'Label is required';
        if (!draft.street.trim()) e.street = 'Street is required';
        if (!draft.city.trim()) e.city = 'City is required';
        if (!draft.state.trim()) e.state = 'State is required';
        if (!draft.pincode.trim()) e.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(draft.pincode)) e.pincode = 'Enter valid 6-digit pincode';
        return e;
    };

    const openAddForm = () => {
        setDraft(emptyDraft);
        setErrors({});
        setEditingId(null);
        setShowForm(true);
    };

    const openEditForm = (addr) => {
        setDraft({ ...addr });
        setErrors({});
        setEditingId(addr.id);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setDraft(emptyDraft);
        setErrors({});
    };

    const handleSave = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (editingId) {
            dispatch(updateAddress({ ...draft, id: editingId }));
        } else {
            const newId = Date.now();
            const newAddress = { ...draft, id: newId };
            dispatch(addAddress(newAddress));
            if (isBookingMode && onSelect) onSelect(newId);
        }

        setShowForm(false);
        setEditingId(null);
        setDraft(emptyDraft);
        setErrors({});
    };

    const confirmDelete = (id) => setDeleteId(id);

    const handleDeleteConfirm = () => {
        dispatch(deleteAddress(deleteId));
        if (isBookingMode && onSelect && selectedAddressId === deleteId) {
            onSelect(null);
        }
        setDeleteId(null);
    };

    const handleDeleteCancel = () => setDeleteId(null);

    const handleChange = (field, value) => {
        setDraft((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleCardClick = (id) => {
        if (isBookingMode && onSelect) onSelect(id);
    };

    return (
        <article className={`profile-card${isBookingMode ? ' profile-card--booking' : ''}`}>

            {/* ── Header ── */}
            <div className="profile-card__header">
                <h2 className="profile-card__title">
                    <span className="material-symbols-outlined">location_on</span>
                    {isBookingMode ? 'Select Service Address' : 'Addresses'}
                </h2>
                {!showForm && (
                    <button
                        className={`addr__add-btn${isLimitReached ? ' addr__add-btn--disabled' : ''}`}
                        onClick={openAddForm}
                        disabled={isLimitReached}
                        type="button"
                    >
                        <MdAdd />
                        {isLimitReached ? 'Limit Reached (3/3)' : 'Add New Address'}
                    </button>
                )}
            </div>

            {/* ── Address Form — div use kiya form ki jagah ── */}
            {showForm && (
                <div className="addr__form">
                    <h3 className="addr__form-title">
                        {editingId ? 'Edit Address' : 'Add New Address'}
                    </h3>

                    {/* Address Type */}
                    <div className="addr__form-field">
                        <label className="pinfo-label">Address Type</label>
                        <div className="addr__radio-group">
                            {['Home', 'Work', 'Other'].map((type) => (
                                <label
                                    key={type}
                                    className={`addr__radio-pill${draft.addressType === type ? ' addr__radio-pill--active' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="addressType"
                                        value={type}
                                        checked={draft.addressType === type}
                                        onChange={(e) => handleChange('addressType', e.target.value)}
                                        hidden
                                    />
                                    <span className="addr__radio-icon">{typeIcons[type]}</span>
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Label */}
                    <div className="addr__form-field">
                        <label className="pinfo-label">Label <span className="addr__required">*</span></label>
                        <input
                            className={`pinfo-input${errors.label ? ' pinfo-input--error' : ''}`}
                            type="text"
                            placeholder="e.g. My Home, Mom's Place"
                            value={draft.label}
                            onChange={(e) => handleChange('label', e.target.value)}
                        />
                        {errors.label && <span className="addr__error-msg">{errors.label}</span>}
                    </div>

                    {/* Street */}
                    <div className="addr__form-field">
                        <label className="pinfo-label">Street / Flat / Building <span className="addr__required">*</span></label>
                        <input
                            className={`pinfo-input${errors.street ? ' pinfo-input--error' : ''}`}
                            type="text"
                            placeholder="e.g. 402, Sunshine Apartments, MG Road"
                            value={draft.street}
                            onChange={(e) => handleChange('street', e.target.value)}
                        />
                        {errors.street && <span className="addr__error-msg">{errors.street}</span>}
                    </div>

                    {/* Area */}
                    <div className="addr__form-field">
                        <label className="pinfo-label">Area / Landmark</label>
                        <input
                            className="pinfo-input"
                            type="text"
                            placeholder="e.g. Near Metro Gate 2, Saket"
                            value={draft.area}
                            onChange={(e) => handleChange('area', e.target.value)}
                        />
                    </div>

                    {/* City + State */}
                    <div className="addr__form-row">
                        <div className="addr__form-field">
                            <label className="pinfo-label">City <span className="addr__required">*</span></label>
                            <input
                                className={`pinfo-input${errors.city ? ' pinfo-input--error' : ''}`}
                                type="text"
                                placeholder="e.g. New Delhi"
                                value={draft.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                            />
                            {errors.city && <span className="addr__error-msg">{errors.city}</span>}
                        </div>
                        <div className="addr__form-field">
                            <label className="pinfo-label">State <span className="addr__required">*</span></label>
                            <input
                                className={`pinfo-input${errors.state ? ' pinfo-input--error' : ''}`}
                                type="text"
                                placeholder="e.g. Delhi"
                                value={draft.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                            />
                            {errors.state && <span className="addr__error-msg">{errors.state}</span>}
                        </div>
                    </div>

                    {/* Pincode */}
                    <div className="addr__form-field addr__form-field--half">
                        <label className="pinfo-label">Pincode <span className="addr__required">*</span></label>
                        <input
                            className={`pinfo-input${errors.pincode ? ' pinfo-input--error' : ''}`}
                            type="text"
                            maxLength={6}
                            placeholder="e.g. 110017"
                            value={draft.pincode}
                            onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                        />
                        {errors.pincode && <span className="addr__error-msg">{errors.pincode}</span>}
                    </div>

                    {/* Default checkbox */}
                    <label className="addr__default-check">
                        <input
                            type="checkbox"
                            checked={draft.isDefault}
                            onChange={(e) => handleChange('isDefault', e.target.checked)}
                        />
                        <span className="addr__default-check-label">Set as default address</span>
                    </label>

                    {/* Form Actions */}
                    <div className="addr__form-actions">
                        <button
                            className="pinfo-btn pinfo-btn--cancel"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="pinfo-btn pinfo-btn--save"
                            type="button"
                            onClick={handleSave}
                        >
                            {editingId ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </div>
            )}

            {/* ── Saved Address Cards ── */}
            <div className="addr__list">
                {addresses.length === 0 && !showForm && (
                    <div className="addr__empty">
                        <span className="material-symbols-outlined addr__empty-icon">location_off</span>
                        <p>No addresses saved yet. Add one above!</p>
                    </div>
                )}

                {addresses.map((a) => (
                    <div
                        key={a.id}
                        className={`addr__card
                            ${a.isDefault ? ' addr__card--default' : ''}
                            ${isBookingMode ? ' addr__card--selectable' : ''}
                            ${isBookingMode && selectedAddressId === a.id ? ' addr__card--selected' : ''}
                        `}
                        onClick={() => handleCardClick(a.id)}
                    >
                        <div className="addr__card-left">
                            {isBookingMode && (
                                <div className="addr__select-ring">
                                    {selectedAddressId === a.id && (
                                        <MdCheckCircle className="addr__check-icon" />
                                    )}
                                </div>
                            )}
                            <span className="addr__card-type-icon">{typeIcons[a.addressType]}</span>
                            <div className="addr__card-info">
                                <div className="addr__card-top-row">
                                    <span className="addr__card-label">{a.label}</span>
                                    <span className="addr__card-type-badge">{a.addressType}</span>
                                    {a.isDefault && (
                                        <span className="addr__card-default-badge">Default</span>
                                    )}
                                </div>
                                <p className="addr__card-address">
                                    {a.street}{a.area ? `, ${a.area}` : ''}
                                </p>
                                <p className="addr__card-address">
                                    {a.city}, {a.state} — {a.pincode}
                                </p>
                            </div>
                        </div>

                        <div className="addr__card-actions" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="addr__action-btn addr__action-btn--edit"
                                onClick={() => openEditForm(a)}
                                type="button"
                                aria-label="Edit"
                            >
                                <MdEdit />
                            </button>
                            <button
                                className="addr__action-btn addr__action-btn--delete"
                                onClick={() => confirmDelete(a.id)}
                                type="button"
                                aria-label="Delete"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Delete Confirmation Modal ── */}
            {deleteId && (
                <div className="addr__modal-overlay" onClick={handleDeleteCancel}>
                    <div className="addr__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="addr__modal-icon">
                            <MdDelete />
                        </div>
                        <h3 className="addr__modal-title">Delete Address?</h3>
                        <p className="addr__modal-desc">
                            Are you sure you want to delete this address? This action cannot be undone.
                        </p>
                        <div className="addr__modal-actions">
                            <button
                                className="pinfo-btn pinfo-btn--cancel"
                                onClick={handleDeleteCancel}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="pinfo-btn pinfo-btn--delete"
                                onClick={handleDeleteConfirm}
                                type="button"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}