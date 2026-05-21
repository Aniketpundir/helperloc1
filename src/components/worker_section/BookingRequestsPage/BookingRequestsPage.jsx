import { useState, useMemo } from 'react';
import StatsStrip from './StatsStrip/StatsStrip';
import BookingCard from './BookingCard/BookingCard';
import Pagination from './Pagination/Pagination';
import './BookingRequestsPage.css';

const ALL_BOOKINGS = [
    {
        id: 1,
        title: 'Emergency Fuse Box Repair',
        priority: 'urgent',
        status: 'pending',
        icon: 'bolt',
        iconVariant: 'primary',
        client: 'Rajesh Kumar',
        location: 'Sector 12, Noida',
        date: '24 May 2026, 10:00 AM',
        workers: 2,
        amountRange: '₹600 – ₹1,500',
        description: 'Power keeps tripping in the main hall. Need a senior electrician to inspect the wiring and the main circuit breaker panel urgently.',
    },
    {
        id: 2,
        title: 'Kitchen Sink Leakage',
        priority: 'soon',
        status: 'confirmed',
        icon: 'build',
        iconVariant: 'secondary',
        client: 'Anita Sharma',
        location: 'DLF Phase 3, Gurgaon',
        date: '25 May 2026, 02:30 PM',
        workers: 1,
        amountRange: '₹400 – ₹800',
        description: 'Small leak under the sink basin. Needs replacement of the drain pipe and checking for pressure issues in the faucet.',
    },
    {
        id: 3,
        title: 'Deep Cleaning - 3BHK',
        priority: 'flexible',
        status: 'cancelled',
        icon: 'cleaning_services',
        iconVariant: 'cancelled',
        client: 'Vikram Seth',
        location: 'HSR Layout, Bangalore',
        date: '28 May 2026, 09:00 AM',
        workers: 3,
        amountRange: '₹2,500 – ₹4,000',
        description: 'Full house cleaning requested before moving in. Focus on windows and kitchen chimney.',
    },
    {
        id: 4,
        title: 'AC Installation & Service',
        priority: 'soon',
        status: 'pending',
        icon: 'ac_unit',
        iconVariant: 'primary',
        client: 'Priya Mehta',
        location: 'Koramangala, Bangalore',
        date: '26 May 2026, 11:00 AM',
        workers: 2,
        amountRange: '₹1,200 – ₹2,000',
        description: 'Split AC installation in bedroom. Old unit needs to be dismantled and new 1.5-ton unit to be installed and tested.',
    },
    {
        id: 5,
        title: 'Bathroom Tiles Re-grouting',
        priority: 'flexible',
        status: 'confirmed',
        icon: 'home_repair_service',
        iconVariant: 'secondary',
        client: 'Suresh Nair',
        location: 'Bandra West, Mumbai',
        date: '30 May 2026, 10:00 AM',
        workers: 1,
        amountRange: '₹800 – ₹1,400',
        description: 'Bathroom floor tiles have broken grout lines causing water seepage. Full re-grouting required for 8x10 bathroom.',
    },
    {
        id: 6,
        title: 'Inverter Battery Replacement',
        priority: 'urgent',
        status: 'pending',
        icon: 'battery_charging_full',
        iconVariant: 'primary',
        client: 'Deepa Krishnan',
        location: 'Anna Nagar, Chennai',
        date: '24 May 2026, 03:00 PM',
        workers: 1,
        amountRange: '₹500 – ₹900',
        description: 'Inverter not charging. Battery needs to be tested and replaced if needed. Please bring compatible 150Ah battery.',
    },
    {
        id: 7,
        title: 'Sofa & Carpet Deep Clean',
        priority: 'flexible',
        status: 'confirmed',
        icon: 'chair',
        iconVariant: 'secondary',
        client: 'Amit Bose',
        location: 'Salt Lake, Kolkata',
        date: '01 Jun 2026, 09:00 AM',
        workers: 2,
        amountRange: '₹1,500 – ₹2,500',
        description: 'Steam cleaning needed for 3-seater sofa and two area rugs. Pet hair and stain removal required.',
    },
    {
        id: 8,
        title: 'Water Purifier Installation',
        priority: 'soon',
        status: 'cancelled',
        icon: 'water_drop',
        iconVariant: 'cancelled',
        client: 'Neha Agarwal',
        location: 'Vaishali, Ghaziabad',
        date: '27 May 2026, 12:00 PM',
        workers: 1,
        amountRange: '₹400 – ₹700',
        description: 'New RO purifier needs to be installed under the kitchen sink. Old unit to be removed and disposed.',
    },
    {
        id: 9,
        title: 'False Ceiling Repair',
        priority: 'soon',
        status: 'pending',
        icon: 'carpenter',
        iconVariant: 'primary',
        client: 'Ravi Shankar',
        location: 'Punjabi Bagh, Delhi',
        date: '29 May 2026, 10:00 AM',
        workers: 2,
        amountRange: '₹2,000 – ₹3,500',
        description: 'POP false ceiling in living room has cracked due to water leakage. Repair and repainting required.',
    },
    {
        id: 10,
        title: 'CCTV Camera Setup',
        priority: 'flexible',
        status: 'confirmed',
        icon: 'videocam',
        iconVariant: 'secondary',
        client: 'Kavita Joshi',
        location: 'Satellite, Ahmedabad',
        date: '02 Jun 2026, 11:00 AM',
        workers: 1,
        amountRange: '₹3,000 – ₹5,000',
        description: 'Installation of 4 CCTV cameras at entry, exit, parking and backyard. DVR setup and mobile app configuration required.',
    },
    {
        id: 11,
        title: 'Gas Stove Burner Repair',
        priority: 'urgent',
        status: 'pending',
        icon: 'local_fire_department',
        iconVariant: 'primary',
        client: 'Manish Tiwari',
        location: 'Hazratganj, Lucknow',
        date: '24 May 2026, 05:00 PM',
        workers: 1,
        amountRange: '₹300 – ₹600',
        description: 'Two burners not igniting properly. Gas flow seems restricted. Need thorough cleaning and jet replacement if required.',
    },
    {
        id: 12,
        title: 'Bedroom Wardrobe Fitting',
        priority: 'flexible',
        status: 'confirmed',
        icon: 'door_sliding',
        iconVariant: 'secondary',
        client: 'Sunita Yadav',
        location: 'Kothrud, Pune',
        date: '03 Jun 2026, 09:30 AM',
        workers: 2,
        amountRange: '₹4,000 – ₹6,000',
        description: 'Sliding door wardrobe assembly and wall fitting required in master bedroom. Hardware and tools to be brought by worker.',
    },
];

const ITEMS_PER_PAGE = 4;
const FILTER_OPTIONS = ['All Requests', 'Pending', 'Confirmed', 'Cancelled'];

const BookingRequestsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Requests');
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookings, setBookings] = useState(ALL_BOOKINGS);

    /* ── Derived stats ── */
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === 'pending').length;
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;

    /* ── Filter + Search ── */
    const filtered = useMemo(() => {
        let result = [...bookings];
        if (activeFilter !== 'All Requests') {
            result = result.filter((b) => b.status === activeFilter.toLowerCase());
        }
        if (searchValue.trim()) {
            const q = searchValue.toLowerCase();
            result = result.filter(
                (b) =>
                    b.title.toLowerCase().includes(q) ||
                    b.client.toLowerCase().includes(q) ||
                    b.location.toLowerCase().includes(q)
            );
        }
        return result;
    }, [bookings, activeFilter, searchValue]);

    /* ── Pagination ── */
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
        setShowDropdown(false);
    };

    const handleSearchChange = (val) => {
        setSearchValue(val);
        setCurrentPage(1);
    };

    /* ── Card actions ── */
    const updateStatus = (id, newStatus) =>
        setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );

    return (
        <div className="request-page">

            <div className="request-page__canvas">

                {/* Page Header */}
                <div className="request-page__header">
                    <div className="request-page__header-text">
                        <h2 className="request-page__heading">Booking Requests</h2>
                        <p className="request-page__subheading">Clients who have directly booked you</p>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="request-page__filter-wrap">
                        <button
                            className="request-page__filter-btn"
                            onClick={() => setShowDropdown((p) => !p)}
                        >
                            {activeFilter}
                            <span className="material-symbols-outlined request-page__filter-icon">expand_more</span>
                        </button>
                        {showDropdown && (
                            <div className="request-page__dropdown">
                                {FILTER_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        className={`request-page__dropdown-item${activeFilter === opt ? ' request-page__dropdown-item--active' : ''}`}
                                        onClick={() => handleFilterChange(opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Strip */}
                <StatsStrip total={total} pending={pending} confirmed={confirmed} />

                {/* Cards */}
                <div className="request-page__cards">
                    {paginated.length === 0 ? (
                        <div className="request-page__empty">
                            <span className="material-symbols-outlined request-page__empty-icon">search_off</span>
                            <p className="request-page__empty-text">No requests found.</p>
                        </div>
                    ) : (
                        paginated.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                {...booking}
                                onAccept={() => updateStatus(booking.id, 'confirmed')}
                                onDecline={() => updateStatus(booking.id, 'cancelled')}
                                onMessage={() => alert(`Opening chat with ${booking.client}...`)}
                                onReschedule={() => alert(`Reschedule request sent to ${booking.client}.`)}
                            />
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filtered.length > ITEMS_PER_PAGE && (
                    <Pagination
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

            </div>
        </div>
    );
};

export default BookingRequestsPage;