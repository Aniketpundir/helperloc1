import "./AWPStatsStrip.css";

export default function AWPStatsStrip({
    total = 24,
    urgent = 8,
    nearYou = 12,
}) {
    return (
        <div className="awp-stats-strip">
            <span className="awp-stats-strip__chip awp-stats-strip__chip--total">
                <span className="material-symbols-outlined awp-stats-strip__chip-icon">search</span>
                {total} Total Posts
            </span>

            <div className="awp-stats-strip__divider" />

            <span className="awp-stats-strip__chip awp-stats-strip__chip--urgent">
                <span className="material-symbols-outlined awp-stats-strip__chip-icon">local_fire_department</span>
                {urgent} Urgent
            </span>

            <div className="awp-stats-strip__divider" />

            <span className="awp-stats-strip__chip awp-stats-strip__chip--near">
                <span className="material-symbols-outlined awp-stats-strip__chip-icon">near_me</span>
                {nearYou} Near You
            </span>
        </div>
    );
}