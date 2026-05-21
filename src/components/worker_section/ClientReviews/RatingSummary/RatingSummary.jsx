import { useEffect, useRef, useState } from "react";
import "./RatingSummary.css";

const BARS = [
    { label: "5 Star", count: 7, percent: 77.7 },
    { label: "4 Star", count: 1, percent: 11.1 },
    { label: "3 Star", count: 1, percent: 11.1 },
    { label: "2 Star", count: 0, percent: 0 },
    { label: "1 Star", count: 0, percent: 0 },
];

// Stars config: filled, filled, filled, filled, partial
const STARS = ["filled", "filled", "filled", "filled", "partial"];

export default function RatingSummary() {
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="rating-summary" ref={ref}>
            {/* Overall Score */}
            <div className="rating-summary__score-block">
                <span className="rating-summary__big-number">4.8</span>
                <div className="rating-summary__stars">
                    {STARS.map((type, i) => (
                        <span
                            key={i}
                            className={`material-symbols-outlined rating-summary__star rating-summary__star--${type}`}
                        >
                            star
                        </span>
                    ))}
                </div>
                <span className="rating-summary__count">Based on 9 reviews</span>
            </div>

            {/* Rating Bars */}
            <div className="rating-summary__bars">
                {BARS.map((bar) => (
                    <div className="rating-summary__bar-row" key={bar.label}>
                        <span className="rating-summary__bar-label">{bar.label}</span>
                        <div className="rating-summary__bar-track">
                            <div
                                className="rating-summary__bar-fill"
                                style={{ width: animated ? `${bar.percent}%` : "0%" }}
                            />
                        </div>
                        <span className="rating-summary__bar-count">{bar.count}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}