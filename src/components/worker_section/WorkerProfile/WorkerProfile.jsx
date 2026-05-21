import './WorkerProfile.css';
import WorkerProfileHeader from './WorkerProfileHeader/WorkerProfileHeader';
import WorkerProfileTabs from './WorkerProfileTabs/WorkerProfileTabs';

export default function WorkerProfile() {
    return (
        <div className="wp-page">
            <WorkerProfileHeader />
            <WorkerProfileTabs />
        </div>
    );
}