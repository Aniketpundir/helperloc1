import { useState } from "react";
import AWPFilterBar from "./AWPFilterBar/AWPFilterBar";
import AWPStatsStrip from "./AWPStatsStrip/AWPStatsStrip";
import AWPWorkCard from "./AWPWorkCard/AWPWorkCard";
import AWPPagination from "./AWPPagination/AWPPagination";
import "./AvailableWork.css";

const AWP_ALL_CARDS = [
    {
        id: 1,
        categoryIcon: "electric_bolt",
        category: "Electrician",
        categoryEmoji: "⚡",
        categoryColor: "primary",
        urgency: "urgent",
        title: "Main Fusebox Replacement & Wiring Audit",
        description:
            "Complete overhaul of a dual-story residential fusebox system. Requires immediate safety inspection after light sparking incident.",
        location: "Sector 12, Noida",
        date: "24 May 2026, 10:00 AM",
        workersNeeded: 2,
        budgetMin: "600",
        budgetMax: "1,500",
        workerType: "electrician",
    },
    {
        id: 2,
        categoryIcon: "plumbing",
        category: "Plumber",
        categoryEmoji: "🔧",
        categoryColor: "secondary",
        urgency: "soon",
        title: "Bathroom Leak Repair & Faucet Install",
        description:
            "Slow leak under the master bathroom sink. Also need 3 new Kohler faucets installed across various washrooms.",
        location: "Vasant Kunj, Delhi",
        date: "26 May 2026, 02:30 PM",
        workersNeeded: 1,
        budgetMin: "800",
        budgetMax: "2,200",
        workerType: "plumber",
    },
    {
        id: 3,
        categoryIcon: "cleaning_services",
        category: "Cleaner",
        categoryEmoji: "🧹",
        categoryColor: "tertiary",
        urgency: "flexible",
        title: "Post-Renovation Deep Clean",
        description:
            "Complete dust removal and floor waxing for a 3BHK apartment after interior painting. All windows need professional streak-free finish.",
        location: "Gurgaon, Phase 3",
        date: "29 May 2026, 09:00 AM",
        workersNeeded: 4,
        budgetMin: "1,500",
        budgetMax: "4,000",
        workerType: "cleaner",
    },
    {
        id: 4,
        categoryIcon: "carpenter",
        category: "Carpenter",
        categoryEmoji: "🪚",
        categoryColor: "primary",
        urgency: "soon",
        title: "Custom Wardrobe Installation",
        description:
            "Full-wall wardrobe with sliding doors needed for a newly built bedroom. Material will be provided by client.",
        location: "Dwarka, Delhi",
        date: "30 May 2026, 11:00 AM",
        workersNeeded: 2,
        budgetMin: "2,000",
        budgetMax: "5,000",
        workerType: "carpenter",
    },
    {
        id: 5,
        categoryIcon: "electric_bolt",
        category: "Electrician",
        categoryEmoji: "⚡",
        categoryColor: "primary",
        urgency: "urgent",
        title: "AC Installation — 3 Units",
        description:
            "Split AC installation on 3 floors of a standalone house. Requires copper piping and external unit mounting.",
        location: "Rohini, Delhi",
        date: "23 May 2026, 08:00 AM",
        workersNeeded: 2,
        budgetMin: "1,200",
        budgetMax: "3,500",
        workerType: "electrician",
    },
];

const CARDS_PER_PAGE = 3;

export default function AvailableWork() {
    const [filters, setFilters] = useState({
        workerType: "all",
        urgency: "all",
        budgetMin: "",
        budgetMax: "",
    });
    const [appliedFilters, setAppliedFilters] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const activeFilters = appliedFilters || {
        workerType: "all",
        urgency: "all",
        budgetMin: "",
        budgetMax: "",
    };

    const filtered = AWP_ALL_CARDS.filter((card) => {
        const typeMatch =
            activeFilters.workerType === "all" ||
            card.workerType === activeFilters.workerType;

        const urgencyMatch =
            activeFilters.urgency === "all" ||
            card.urgency === activeFilters.urgency;

        const minOk =
            !activeFilters.budgetMin ||
            parseInt(card.budgetMax.replace(",", "")) >=
            parseInt(activeFilters.budgetMin);

        const maxOk =
            !activeFilters.budgetMax ||
            parseInt(card.budgetMin.replace(",", "")) <=
            parseInt(activeFilters.budgetMax);

        return typeMatch && urgencyMatch && minOk && maxOk;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginated = filtered.slice(
        (safePage - 1) * CARDS_PER_PAGE,
        safePage * CARDS_PER_PAGE
    );

    const urgentCount = filtered.filter((c) => c.urgency === "urgent").length;

    const handleApply = (f) => {
        setAppliedFilters(f);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setAppliedFilters(null);
        setCurrentPage(1);
    };

    const handleWantJob = (card) => {
        alert(`Application sent for: "${card.title}"`);
    };

    const handleViewDetails = (card) => {
        alert(`Viewing full details for: "${card.title}"\nLocation: ${card.location}\nBudget: ₹${card.budgetMin} – ₹${card.budgetMax}`);
    };

    return (
        <div className="awp-page">
            {/* Page Header */}
            <div className="awp-page__header">
                <div>
                    <h2 className="awp-page__title">Available Work Posts</h2>
                    <p className="awp-page__subtitle">Browse jobs posted by clients near you</p>
                </div>
                <div className="awp-page__location">
                    <span className="material-symbols-outlined awp-page__location-icon">location_on</span>
                    Delhi, India
                </div>
            </div>

            {/* Filter Bar */}
            <AWPFilterBar onApply={handleApply} onReset={handleReset} />

            {/* Stats Strip */}
            <AWPStatsStrip
                total={filtered.length}
                urgent={urgentCount}
                nearYou={Math.min(filtered.length, 12)}
            />

            {/* Cards */}
            <div className="awp-page__cards">
                {paginated.length === 0 ? (
                    <div className="awp-page__empty">
                        <span className="material-symbols-outlined awp-page__empty-icon">search_off</span>
                        <p>No work posts match your filters.</p>
                    </div>
                ) : (
                    paginated.map((card) => (
                        <AWPWorkCard
                            key={card.id}
                            card={card}
                            onWantJob={handleWantJob}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {filtered.length > CARDS_PER_PAGE && (
                <AWPPagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onChange={setCurrentPage}
                />
            )}
        </div>
    );
}