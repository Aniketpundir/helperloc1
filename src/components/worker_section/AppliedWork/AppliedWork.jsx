import { useState } from "react";
import APStatsStrip from "./APStatsStrip/APStatsStrip";
import APProjectCard from "./APProjectCard/APProjectCard";
import APFilterDropdown from "./APFilterDropdown/APFilterDropdown";
import APFAB from "./APFAB/APFAB";
import "./AppliedWork.css";

const AP_INITIAL_CARDS = [
  {
    id: 1,
    status: "accepted",
    categoryIcon: "cleaning_services",
    category: "Cleaner",
    title: "Post-Renovation Deep Clean",
    description:
      "Complete dust removal for a 3BHK high-end apartment including windows and balcony deep cleaning.",
    location: "HSR Layout, Bangalore",
    date: "28 May 2026, 09:00 AM",
    workersNeeded: 3,
    appliedDate: "19 May 2026",
    budgetMin: "2,500",
    budgetMax: "4,000",
    successLabel: "Project Mila",
  },
  {
    id: 2,
    status: "pending",
    categoryIcon: "bolt",
    category: "Electrician",
    title: "Main Fusebox Replacement",
    description:
      "Complete overhaul of a dual-story fusebox. Professional with industrial grade tools required.",
    location: "Sector 12, Noida",
    date: "24 May 2026, 10:00 AM",
    workersNeeded: 2,
    appliedDate: "20 May 2026",
    budgetMin: "600",
    budgetMax: "1,500",
  },
  {
    id: 3,
    status: "rejected",
    categoryIcon: "plumbing",
    category: "Plumber",
    title: "Bathroom Leak Repair",
    description:
      "Slow leak under master bathroom sink. Needs inspection and part replacement.",
    location: "Vasant Kunj, Delhi",
    date: "26 May 2026, 02:30 PM",
    workersNeeded: 1,
    appliedDate: "18 May 2026",
    budgetMin: "800",
    budgetMax: "2,200",
  },
];

export default function AppliedWork() {
  const [filter, setFilter] = useState("all");
  const [cards, setCards] = useState(AP_INITIAL_CARDS);

  const filteredCards =
    filter === "all" ? cards : cards.filter((c) => c.status === filter);

  const stats = [
    { id: "all",      icon: "folder",        count: cards.length,                                label: "Applied",  colorClass: "ap-stats__icon--applied"  },
    { id: "accepted", icon: "check_circle",  count: cards.filter(c => c.status === "accepted").length, label: "Accepted", colorClass: "ap-stats__icon--accepted" },
    { id: "rejected", icon: "cancel",        count: cards.filter(c => c.status === "rejected").length, label: "Rejected", colorClass: "ap-stats__icon--rejected" },
    { id: "pending",  icon: "hourglass_top", count: cards.filter(c => c.status === "pending").length,  label: "Pending",  colorClass: "ap-stats__icon--pending"  },
  ];

  const handleWithdraw = (card) => {
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, status: "withdrawn" } : c))
    );
  };

  const handleViewBooking = (card) => {
    alert(`Booking Details for: ${card.title}`);
  };

  const handleMessageClient = (card) => {
    alert(`Opening chat for: ${card.title}`);
  };

  const handleFindSimilar = (card) => {
    alert(`Finding jobs similar to: ${card.category}`);
  };

  const handleStatClick = (statId) => {
    setFilter(statId === "all" ? "all" : statId);
  };

  return (
    <div className="ap-page">
      {/* Page Header */}
      <div className="ap-page__header">
        <div>
          <h2 className="ap-page__title">Applied Projects</h2>
          <p className="ap-page__subtitle">Jobs you've shown interest in</p>
        </div>
        <APFilterDropdown value={filter} onChange={setFilter} />
      </div>

      {/* Stats Strip */}
      <APStatsStrip stats={stats} onStatClick={handleStatClick} />

      {/* Cards List */}
      <div className="ap-page__cards">
        {filteredCards.length === 0 ? (
          <div className="ap-page__empty">
            <span className="material-symbols-outlined ap-page__empty-icon">
              folder_open
            </span>
            <p>No projects found for this filter.</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <APProjectCard
              key={card.id}
              card={card}
              onViewBooking={handleViewBooking}
              onMessageClient={handleMessageClient}
              onWithdraw={handleWithdraw}
              onFindSimilar={handleFindSimilar}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <APFAB
        icon="add"
        tooltip="Find New Jobs"
        onClick={() => alert("Redirecting to Jobs page...")}
      />
    </div>
  );
}