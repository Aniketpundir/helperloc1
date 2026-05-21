import { useState } from "react";
import "./AWPFilterBar.css";

const AWP_URGENCY_OPTIONS = [
    { value: "all", label: "All" },
    { value: "urgent", label: "Urgent" },
    { value: "soon", label: "Soon" },
];

export default function AWPFilterBar({ onApply, onReset }) {
    const [workerType, setWorkerType] = useState("all");
    const [urgency, setUrgency] = useState("all");
    const [budgetMin, setBudgetMin] = useState("");
    const [budgetMax, setBudgetMax] = useState("");

    const handleApply = () => {
        onApply && onApply({ workerType, urgency, budgetMin, budgetMax });
    };

    const handleReset = () => {
        setWorkerType("all");
        setUrgency("all");
        setBudgetMin("");
        setBudgetMax("");
        onReset && onReset();
    };

    return (
        <div className="awp-filter-bar">
            {/* Urgency Toggle */}
            <div className="awp-filter-bar__field">
                <label className="awp-filter-bar__label">Urgency</label>
                <div className="awp-urgency-toggle">
                    {AWP_URGENCY_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            className={`awp-urgency-toggle__btn ${urgency === opt.value ? "awp-urgency-toggle__btn--active" : ""
                                }`}
                            onClick={() => setUrgency(opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Budget Range */}
            <div className="awp-filter-bar__field">
                <label className="awp-filter-bar__label">Budget Range (₹)</label>
                <div className="awp-budget-range">
                    <input
                        className="awp-budget-range__input"
                        placeholder="Min"
                        type="number"
                        min="0"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                    />
                    <span className="awp-budget-range__sep">—</span>
                    <input
                        className="awp-budget-range__input"
                        placeholder="Max"
                        type="number"
                        min="0"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="awp-filter-bar__actions">
                <button className="awp-btn awp-btn--apply" onClick={handleApply}>
                    Apply Filters
                </button>
                <button className="awp-btn awp-btn--reset" onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}