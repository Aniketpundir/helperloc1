import { useState, useRef, useEffect } from "react";
import "./APFilterDropdown.css";

const AP_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export default function APFilterDropdown({
  options = AP_FILTER_OPTIONS,
  value = "all",
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || "All";

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSelect = (optValue) => {
    onChange && onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div className="ap-filter" ref={dropdownRef}>
      <button
        className={`ap-filter__trigger ${isOpen ? "ap-filter__trigger--open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="ap-filter__label">{selectedLabel}</span>
        <span
          className="material-symbols-outlined ap-filter__arrow"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <ul className="ap-filter__dropdown" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`ap-filter__option ${
                value === option.value ? "ap-filter__option--active" : ""
              }`}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(option.value)}
              tabIndex={0}
            >
              {value === option.value && (
                <span className="material-symbols-outlined ap-filter__check">check</span>
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}