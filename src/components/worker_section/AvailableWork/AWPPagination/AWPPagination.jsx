import "./AWPPagination.css";

export default function AWPPagination({ currentPage = 1, totalPages = 8, onChange }) {
  const handlePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onChange && onChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="awp-pagination">
      <button
        className={`awp-pagination__prev ${currentPage === 1 ? "awp-pagination__prev--disabled" : ""}`}
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Previous
      </button>

      <div className="awp-pagination__pages">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="awp-pagination__ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`awp-pagination__page-btn ${
                currentPage === page ? "awp-pagination__page-btn--active" : ""
              }`}
              onClick={() => handlePage(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={`awp-pagination__next ${currentPage === totalPages ? "awp-pagination__next--disabled" : ""}`}
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );
}