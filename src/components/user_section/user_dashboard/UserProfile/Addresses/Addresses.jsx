import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd, MdCheckCircle, MdDelete, MdEdit, MdHome, MdLocationOn, MdWork } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
    addAddress as addLocalAddress,
    deleteAddress as deleteLocalAddress,
    updateAddress as updateLocalAddress,
} from '../../../../../Redux/Slice/addressSlice';
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

const iconNames = {
    Home: 'home',
    Work: 'work',
    Other: 'location_on',
};

const getAddressId = (address) => address._id || address.id;

const getAddressType = (address) => {
    if (address.addressType) return address.addressType;
    if (address.icon === 'work') return 'Work';
    if (address.icon === 'location_on') return 'Other';
    return 'Home';
};

const getDisplayAddress = (address) => {
    if (address.address) return address.address;

    return [address.street, address.area, address.city, address.state, address.pincode]
        .filter(Boolean)
        .join(', ');
};

const getDraftFromAddress = (address) => ({
    label: address.label || '',
    addressType: getAddressType(address),
    street: address.street || address.address || '',
    area: address.area || '',
    city: address.city || '',
    state: address.state || '',
    pincode: address.pincode || '',
    isDefault: !!address.isDefault,
});

const buildFullAddress = (draft) =>
    [draft.street, draft.area, draft.city, draft.state, draft.pincode]
        .filter(Boolean)
        .join(', ');

export default function Addresses({
    addresses: apiAddresses,
    onAddAddress,
    onUpdateAddress,
    onDeleteAddress,
    selectedAddressId = null,
    onSelect = null,
    isBookingMode = false,
    allowManageInBooking = false,
}) {
    const dispatch = useDispatch();
    const localAddresses = useSelector((state) => state.address.addresses);
    const useApiHandlers = !!(onAddAddress && onUpdateAddress && onDeleteAddress);
    const addresses = useApiHandlers ? apiAddresses || [] : localAddresses;

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(emptyDraft);
    const [errors, setErrors] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    const isLimitReached = addresses.length >= MAX_ADDRESSES && !editingId;

    const validate = () => {
        const nextErrors = {};
        if (!draft.label.trim()) nextErrors.label = 'Label is required';
        if (!draft.street.trim()) nextErrors.street = 'Street is required';
        if (!draft.city.trim()) nextErrors.city = 'City is required';
        if (!draft.state.trim()) nextErrors.state = 'State is required';
        if (!draft.pincode.trim()) nextErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(draft.pincode)) nextErrors.pincode = 'Enter valid 6-digit pincode';
        return nextErrors;
    };

    const handleChange = (field, value) => {
        setDraft((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setDraft(emptyDraft);
        setErrors({});
    };

    const openAddForm = () => {
        setDraft(emptyDraft);
        setErrors({});
        setEditingId(null);
        setShowForm(true);
    };

    const openEditForm = (address) => {
        setDraft(getDraftFromAddress(address));
        setErrors({});
        setEditingId(getAddressId(address));
        setShowForm(true);
    };

    const saveAddress = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (useApiHandlers) {
                const payload = {
                    label: draft.label,
                    icon: iconNames[draft.addressType] || 'home',
                    address: buildFullAddress(draft),
                    isDefault: draft.isDefault,
                };

                if (editingId) await onUpdateAddress(editingId, payload);
                else await onAddAddress(payload);
            } else if (editingId) {
                dispatch(updateLocalAddress({ ...draft, id: editingId }));
            } else {
                const newAddress = { ...draft, id: Date.now() };
                dispatch(addLocalAddress(newAddress));
                if (isBookingMode && onSelect) onSelect(newAddress.id);
            }

            toast.success(editingId ? 'Address updated.' : 'Address added.');
            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save address.');
        }
    };

    const confirmDelete = async () => {
        try {
            if (useApiHandlers) await onDeleteAddress(deleteId);
            else dispatch(deleteLocalAddress(deleteId));

            if (isBookingMode && onSelect && selectedAddressId === deleteId) onSelect(null);
            toast.success('Address deleted.');
            setDeleteId(null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete address.');
        }
    };

    const handleCardClick = (id) => {
        if (isBookingMode && onSelect) onSelect(id);
    };

    const renderForm = () => (
        <form className="addr__form" onSubmit={saveAddress}>
            <h3 className="addr__form-title">{editingId ? 'Edit Address' : 'Add New Address'}</h3>

            <div className="addr__form-field">
                <label className="pinfo-label">Address Type</label>
                <div className="addr__radio-group">
                    {Object.keys(typeIcons).map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={`addr__radio-pill${draft.addressType === type ? ' addr__radio-pill--active' : ''}`}
                            onClick={() => handleChange('addressType', type)}
                        >
                            <span className="addr__radio-icon">{typeIcons[type]}</span>
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="addr__form-field">
                <label className="pinfo-label">
                    Label<span className="addr__required">*</span>
                </label>
                <input
                    className={`pinfo-input${errors.label ? ' pinfo-input--error' : ''}`}
                    value={draft.label}
                    placeholder="Home, Office, Parents House"
                    onChange={(event) => handleChange('label', event.target.value)}
                />
                {errors.label && <span className="addr__error-msg">{errors.label}</span>}
            </div>

            <div className="addr__form-field">
                <label className="pinfo-label">
                    Street / House No.<span className="addr__required">*</span>
                </label>
                <input
                    className={`pinfo-input${errors.street ? ' pinfo-input--error' : ''}`}
                    value={draft.street}
                    onChange={(event) => handleChange('street', event.target.value)}
                />
                {errors.street && <span className="addr__error-msg">{errors.street}</span>}
            </div>

            <div className="addr__form-row">
                <div className="addr__form-field">
                    <label className="pinfo-label">Area / Landmark</label>
                    <input
                        className="pinfo-input"
                        value={draft.area}
                        onChange={(event) => handleChange('area', event.target.value)}
                    />
                </div>
                <div className="addr__form-field">
                    <label className="pinfo-label">
                        City<span className="addr__required">*</span>
                    </label>
                    <input
                        className={`pinfo-input${errors.city ? ' pinfo-input--error' : ''}`}
                        value={draft.city}
                        onChange={(event) => handleChange('city', event.target.value)}
                    />
                    {errors.city && <span className="addr__error-msg">{errors.city}</span>}
                </div>
            </div>

            <div className="addr__form-row">
                <div className="addr__form-field">
                    <label className="pinfo-label">
                        State<span className="addr__required">*</span>
                    </label>
                    <input
                        className={`pinfo-input${errors.state ? ' pinfo-input--error' : ''}`}
                        value={draft.state}
                        onChange={(event) => handleChange('state', event.target.value)}
                    />
                    {errors.state && <span className="addr__error-msg">{errors.state}</span>}
                </div>
                <div className="addr__form-field addr__form-field--half">
                    <label className="pinfo-label">
                        Pincode<span className="addr__required">*</span>
                    </label>
                    <input
                        className={`pinfo-input${errors.pincode ? ' pinfo-input--error' : ''}`}
                        value={draft.pincode}
                        maxLength={6}
                        onChange={(event) => handleChange('pincode', event.target.value)}
                    />
                    {errors.pincode && <span className="addr__error-msg">{errors.pincode}</span>}
                </div>
            </div>

            <label className="addr__default-check">
                <input
                    type="checkbox"
                    checked={draft.isDefault}
                    onChange={(event) => handleChange('isDefault', event.target.checked)}
                />
                <span className="addr__default-check-label">Set as default address</span>
            </label>

            <div className="addr__form-actions">
                <button className="pinfo-btn pinfo-btn--cancel" type="button" onClick={resetForm}>
                    Cancel
                </button>
                <button className="pinfo-btn pinfo-btn--save" type="submit">
                    {editingId ? 'Save Address' : 'Add Address'}
                </button>
            </div>
        </form>
    );

    return (
        <article className={`profile-card${isBookingMode ? ' profile-card--booking' : ''}`}>
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

            {showForm && renderForm()}

            <div className="addr__list">
                {addresses.length === 0 && !showForm && (
                    <div className="addr__empty">
                        <span className="material-symbols-outlined addr__empty-icon">location_off</span>
                        <p>No addresses saved yet. Add one above!</p>
                    </div>
                )}

                {addresses.map((address) => {
                    const id = getAddressId(address);
                    const type = getAddressType(address);
                    const selected = selectedAddressId === id;

                    return (
                        <div
                            key={id}
                            className={`addr__card${address.isDefault ? ' addr__card--default' : ''}${isBookingMode ? ' addr__card--selectable' : ''}${selected ? ' addr__card--selected' : ''}`}
                            onClick={() => handleCardClick(id)}
                            role={isBookingMode ? 'button' : undefined}
                            tabIndex={isBookingMode ? 0 : undefined}
                        >
                            <div className="addr__card-left">
                                {isBookingMode && (
                                    <span className="addr__select-ring">
                                        {selected && <MdCheckCircle className="addr__check-icon" />}
                                    </span>
                                )}
                                <span className="addr__card-type-icon">{typeIcons[type] || typeIcons.Other}</span>
                                <div className="addr__card-info">
                                    <div className="addr__card-top-row">
                                        <span className="addr__card-label">{address.label}</span>
                                        <span className="addr__card-type-badge">{type}</span>
                                        {address.isDefault && <span className="addr__card-default-badge">Default</span>}
                                    </div>
                                    <p className="addr__card-address">{getDisplayAddress(address)}</p>
                                </div>
                            </div>

                            {(!isBookingMode || allowManageInBooking) && (
                                <div className="addr__card-actions">
                                    <button
                                        className="addr__action-btn addr__action-btn--edit"
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openEditForm(address);
                                        }}
                                        aria-label="Edit address"
                                    >
                                        <MdEdit />
                                    </button>
                                    <button
                                        className="addr__action-btn addr__action-btn--delete"
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setDeleteId(id);
                                        }}
                                        aria-label="Delete address"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {deleteId && (
                <div className="addr__modal-overlay">
                    <div className="addr__modal">
                        <div className="addr__modal-icon">
                            <MdDelete />
                        </div>
                        <h3 className="addr__modal-title">Delete address?</h3>
                        <p className="addr__modal-desc">This address will be removed from your saved addresses.</p>
                        <div className="addr__modal-actions">
                            <button className="pinfo-btn pinfo-btn--cancel" type="button" onClick={() => setDeleteId(null)}>
                                Cancel
                            </button>
                            <button className="pinfo-btn--delete" type="button" onClick={confirmDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
