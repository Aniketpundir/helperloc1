import "./APFAB.css";

export default function APFAB({
  icon = "add",
  tooltip = "Find New Jobs",
  onClick,
  position = "bottom-right",
}) {
  return (
    <button
      className={`ap-fab ap-fab--${position}`}
      onClick={onClick}
      aria-label={tooltip}
      title={tooltip}
    >
      <span className="material-symbols-outlined ap-fab__icon">{icon}</span>
      {tooltip && (
        <span className="ap-fab__tooltip" role="tooltip">
          {tooltip}
        </span>
      )}
    </button>
  );
}