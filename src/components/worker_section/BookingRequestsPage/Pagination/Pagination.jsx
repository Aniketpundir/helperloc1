import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="request-pagination">

            {/* Previous */}
            <button
                className="request-pagination__nav-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span className="material-symbols-outlined request-pagination__nav-icon">arrow_back</span>
                Previous
            </button>

            {/* Page Numbers */}
            <div className="request-pagination__pages">
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`request-pagination__page-btn${currentPage === page ? ' request-pagination__page-btn--active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next */}
            <button
                className="request-pagination__nav-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <span className="material-symbols-outlined request-pagination__nav-icon">arrow_forward</span>
            </button>

        </div>
    );
};

export default Pagination;