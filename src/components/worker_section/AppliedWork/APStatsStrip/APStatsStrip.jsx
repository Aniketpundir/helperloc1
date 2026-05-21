import "./APStatsStrip.css";

const AP_STATS = [
  {
    id: "applied",
    icon: "folder",
    count: 15,
    label: "Applied",
    colorClass: "ap-stats__icon--applied",
  },
  {
    id: "accepted",
    icon: "check_circle",
    count: 6,
    label: "Accepted",
    colorClass: "ap-stats__icon--accepted",
  },
  {
    id: "rejected",
    icon: "cancel",
    count: 4,
    label: "Rejected",
    colorClass: "ap-stats__icon--rejected",
  },
  {
    id: "pending",
    icon: "hourglass_top",
    count: 5,
    label: "Pending",
    colorClass: "ap-stats__icon--pending",
  },
];

export default function APStatsStrip({ stats = AP_STATS, onStatClick }) {
  return (
    <div className="ap-stats-strip">
      {stats.map((stat, index) => (
        <div key={stat.id} className="ap-stats-strip__item-wrapper">
          <div
            className="ap-stats-strip__item"
            onClick={() => onStatClick && onStatClick(stat.id)}
            role={onStatClick ? "button" : undefined}
            tabIndex={onStatClick ? 0 : undefined}
            onKeyDown={(e) => e.key === "Enter" && onStatClick && onStatClick(stat.id)}
          >
            <div className={`ap-stats__icon-wrap ${stat.colorClass}`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div className="ap-stats__info">
              <p className="ap-stats__count">{stat.count}</p>
              <p className="ap-stats__label">{stat.label}</p>
            </div>
          </div>
          {index < stats.length - 1 && (
            <div className="ap-stats-strip__divider" />
          )}
        </div>
      ))}
    </div>
  );
}