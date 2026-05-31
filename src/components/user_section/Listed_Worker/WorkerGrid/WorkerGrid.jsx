import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkerCard from '../WorkerCard/WorkerCard';
import { setListedWorkerPage } from '../../../../Redux/Slice/listedWorkerSlice';
import './WorkerGrid.css';

export default function WorkerGrid() {
    const dispatch = useDispatch();
    const { workers, loading, error, page, pagination } = useSelector((state) => state.listedWorkers);

    const handleNextPage = () => {
        if (page < pagination.totalPages) {
            dispatch(setListedWorkerPage(page + 1));
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            dispatch(setListedWorkerPage(page - 1));
        }
    };

    if (loading) {
        return (
            <section className="Listed_Worker-grid-section">
                <div className="Listed_Worker-no-results">
                    <span className="material-symbols-outlined">hourglass_top</span>
                    <p>Loading workers...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="Listed_Worker-grid-section">
                <div className="Listed_Worker-no-results">
                    <span className="material-symbols-outlined">error</span>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="Listed_Worker-grid-section">
            <div className="Listed_Worker-grid-container">
                <div className="Listed_Worker-grid">
                    {workers.length > 0 ? (
                        workers.map((worker) => (
                            <WorkerCard key={worker.id} worker={worker} />
                        ))
                    ) : (
                        <div className="Listed_Worker-no-results">
                            <span className="material-symbols-outlined">search_off</span>
                            <p>No workers found for these filters.</p>
                        </div>
                    )}
                </div>

                {workers.length > 0 && (
                    <div className="Listed_Worker-pagination">
                        <button
                            className="Listed_Worker-pagination-btn"
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        <div className="Listed_Worker-pagination-numbers">
                            {Array.from({ length: pagination.totalPages || 1 }).map((_, index) => {
                                const pageNumber = index + 1;

                                return (
                                    <button
                                        key={pageNumber}
                                        className={`Listed_Worker-page-number ${page === pageNumber ? 'Listed_Worker-active' : ''}`}
                                        onClick={() => dispatch(setListedWorkerPage(pageNumber))}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className="Listed_Worker-pagination-btn"
                            onClick={handleNextPage}
                            disabled={page >= pagination.totalPages}
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
