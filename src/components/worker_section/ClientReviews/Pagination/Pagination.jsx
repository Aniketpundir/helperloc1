import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="pagination">
            <button
                className="pagination__nav-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span className="material-symbols-outlined">chevron_left</span>
                <span>Previous</span>
            </button>

            <div className="pagination__pages">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`pagination__page-btn ${page === currentPage
                                ? "pagination__page-btn--active"
                                : "pagination__page-btn--inactive"
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className="pagination__nav-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span>Next</span>
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </nav>
    );
}