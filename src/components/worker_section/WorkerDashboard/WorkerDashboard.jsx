import './WorkerDashboard.css';
import WorkerTopBar from './WorkerTopBar/WorkerTopBar';
import WorkerStatsRow from './WorkerStatsRow/WorkerStatsRow';
import WorkerBookingCard from './WorkerBookingCard/WorkerBookingCard';
import WorkerEarningsChart from './WorkerEarningsChart/WorkerEarningsChart';
import WorkerJobCard from './WorkerJobCard/WorkerJobCard';

const BOOKINGS = [
    {
        id: 1,
        icon: 'plumbing',
        title: 'Emergency Pipe Leakage',
        customerName: 'Anita Singh',
        location: 'Sector 45, Gurgaon',
        dateTime: 'Today, 02:30 PM',
        status: 'pending',
        priority: 'urgent',
    },
    {
        id: 2,
        icon: 'electrical_services',
        title: 'Kitchen Rewiring',
        customerName: 'Rahul Verma',
        location: 'DLF Phase 3',
        dateTime: 'Tomorrow, 10:00 AM',
        status: 'confirmed',
        priority: 'soon',
    },
    {
        id: 3,
        icon: 'cleaning_services',
        title: 'Full Home Deep Clean',
        customerName: 'Megha Kapoor',
        location: 'Golf Estate',
        dateTime: 'Sun, 24 May',
        status: 'cancelled',
        priority: 'flexible',
    },
];

const JOBS = [
    {
        id: 1,
        icon: 'bolt',
        iconColor: 'blue',
        category: 'Electrician',
        title: 'Main Switchboard Replacement',
        location: 'Cyber City, Phase II',
        priceRange: '₹1,200 – ₹2,500',
        priority: 'urgent',
    },
    {
        id: 2,
        icon: 'handyman',
        iconColor: 'green',
        category: 'Plumber',
        title: 'New Bathroom Fitting',
        location: 'MG Road, Heritage City',
        priceRange: '₹8,000 – ₹12,000',
        priority: 'soon',
    },
    {
        id: 3,
        icon: 'home',
        iconColor: 'orange',
        category: 'Cleaning',
        title: 'Office Carpet Deep Clean',
        location: 'Palam Vihar, Ext.',
        priceRange: '₹3,500 – ₹5,000',
        priority: 'flexible',
    },
];

export default function WorkerDashboard() {
    return (
        <div className="worker-dashboard">
            {/* Sticky top bar */}
            <WorkerTopBar workerName="Ramesh" />

            <div className="worker-dashboard__content">
                {/* Stats */}
                <WorkerStatsRow />

                {/* Middle: bookings + chart */}
                <div className="worker-dashboard__middle">
                    {/* Recent Bookings */}
                    <div className="worker-dashboard__bookings">
                        <div className="worker-dashboard__section-header">
                            <h2 className="worker-dashboard__section-title">Recent Booking Requests</h2>
                            <a href="#" className="worker-dashboard__view-all">View All →</a>
                        </div>
                        <div className="worker-dashboard__bookings-list">
                            {BOOKINGS.map((b) => (
                                <WorkerBookingCard
                                    key={b.id}
                                    {...b}
                                    onViewDetails={() => console.log('View:', b.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Earnings Chart */}
                    {/* <div className="worker-dashboard__chart-wrap">
                        <WorkerEarningsChart />
                    </div> */}
                </div>

                {/* Available Jobs */}
                <div className="worker-dashboard__jobs-section">
                    <div className="worker-dashboard__section-header">
                        <h2 className="worker-dashboard__section-title">Available Work Near You</h2>
                        <a href="#" className="worker-dashboard__view-all">View All →</a>
                    </div>
                    <div className="worker-dashboard__jobs-scroll">
                        {JOBS.map((job) => (
                            <WorkerJobCard key={job.id} {...job} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}