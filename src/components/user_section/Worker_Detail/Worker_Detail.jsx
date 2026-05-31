import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WorkerDetail_Profile from './WorkerDetail_Profile/WorkerDetail_Profile';
import WorkerDetail_BookingForm from './WorkerDetail_BookingForm/WorkerDetail_BookingForm';
import WorkerDetail_Reviews from './WorkerDetail_Reviews/WorkerDetail_Reviews';
import {
    clearWorkerDetail,
    fetchWorkerDetail,
} from '../../../Redux/Slice/workerDetailSlice';
import {
    addUserAddress,
    deleteUserAddress,
    fetchUserProfile,
    updateUserAddress,
} from '../../../Redux/Slice/userProfileSlice';
import './Worker_Detail.css';

const reviewsData = [];

const Worker_Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { worker, loading, error } = useSelector((state) => state.workerDetail);
    const { profile } = useSelector((state) => state.userProfile);

    useEffect(() => {
        if (id) {
            dispatch(fetchWorkerDetail(id));
        }

        dispatch(fetchUserProfile());

        return () => {
            dispatch(clearWorkerDetail());
        };
    }, [dispatch, id]);

    const runProfileAction = async (action) => {
        try {
            return await dispatch(action).unwrap();
        } catch (message) {
            throw { response: { data: { message } } };
        }
    };

    const handleAddAddress = async (payload) => {
        return runProfileAction(addUserAddress(payload));
    };

    const handleUpdateAddress = async (addressId, payload) => {
        return runProfileAction(updateUserAddress({ addressId, payload }));
    };

    const handleDeleteAddress = async (addressId) => {
        return runProfileAction(deleteUserAddress(addressId));
    };

    if (loading) {
        return (
            <div className="worker-detail">
                <p>Loading worker details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="worker-detail">
                <p>{error}</p>
            </div>
        );
    }

    if (!worker) {
        return (
            <div className="worker-detail">
                <p>Worker not found.</p>
            </div>
        );
    }

    return (
        <div className="worker-detail">
            <nav className="worker-detail__breadcrumb">
                <Link to="/" className="worker-detail__breadcrumb-link">Home</Link>
                <span className="material-symbols-outlined worker-detail__breadcrumb-sep">chevron_right</span>
                <Link to={`/worker-category/listed-worker/${worker.category}`} className="worker-detail__breadcrumb-link">
                    Workers
                </Link>
                <span className="material-symbols-outlined worker-detail__breadcrumb-sep">chevron_right</span>
                <span className="worker-detail__breadcrumb-link">{worker.category}</span>
                <span className="material-symbols-outlined worker-detail__breadcrumb-sep">chevron_right</span>
                <span className="worker-detail__breadcrumb-current">{worker.name}</span>
            </nav>

            <div className="worker-detail__layout">
                <aside className="worker-detail__left">
                    <WorkerDetail_Profile worker={worker} />
                </aside>
                <div className="worker-detail__right">
                    <WorkerDetail_BookingForm
                        worker={worker}
                        addresses={profile?.addresses || []}
                        onAddAddress={handleAddAddress}
                        onUpdateAddress={handleUpdateAddress}
                        onDeleteAddress={handleDeleteAddress}
                    />
                    <WorkerDetail_Reviews
                        reviews={reviewsData}
                        workerName={worker.name}
                        rating={worker.rating}
                    />
                </div>
            </div>
        </div>
    );
};

export default Worker_Detail;
