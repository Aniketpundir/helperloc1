import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './WorkerProfileAlert.css';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORKER_URL = `${API}/workers`;

const hasRole = (user, role) => {
    if (Array.isArray(user?.roles)) return user.roles.includes(role);
    if (user?.role === 'both') return ['user', 'worker'].includes(role);
    return user?.role === role;
};

const isWorkerProfileComplete = (worker) => {
    if (!worker) return false;

    const hasActiveService = worker.services?.some((service) => service.isActive && service.name);

    return Boolean(
        worker.currentAddress &&
        hasActiveService &&
        worker.experienceLevel &&
        Number(worker.yearsOfExperience) >= 0 &&
        Number(worker.hourlyRate) > 0
    );
};

export default function WorkerProfileAlert() {
    const { isAuthenticated, user, authMode } = useSelector((state) => state.auth);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        let active = true;

        const shouldCheck = isAuthenticated && authMode === 'worker' && hasRole(user, 'worker');

        if (!shouldCheck) {
            setShowAlert(false);
            return undefined;
        }

        const fetchWorkerProfile = async () => {
            try {
                const { data } = await axios.get(`${WORKER_URL}/me`);
                if (active) setShowAlert(!isWorkerProfileComplete(data.worker));
            } catch (error) {
                if (active) setShowAlert(error.response?.status === 404);
            }
        };

        fetchWorkerProfile();

        return () => {
            active = false;
        };
    }, [isAuthenticated, user, authMode]);

    if (!showAlert) return null;

    return (
        <div className="worker-profile-alert">
            <div className="worker-profile-alert__inner">
                <span className="material-symbols-outlined worker-profile-alert__icon">warning</span>
                <p className="worker-profile-alert__text">
                    Complete your worker profile to start receiving bookings and work requests.
                </p>
                <Link className="worker-profile-alert__link" to="/worker/profile">
                    Complete Profile
                </Link>
            </div>
        </div>
    );
}
