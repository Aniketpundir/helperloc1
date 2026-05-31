import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkerCard from '../WorkerCard/WorkerCard';
import './WorkerGrid.css';

export default function WorkerGrid() {
    const { category } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const workers = [
        {
            id: 1,
            name: 'Ramesh Kumar',
            category: '⚡ Electrician',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJkSx2G47ojisO_xKp2tUR915NseeiE02UkKyIZUVCliAvmCJcKR9Vtf-bjjimrwMw33CgFVhsREGfXcrkRO37SNxQhZq9Y2j_yq1MmoPk3EHgUomRSsAjCC4qDxjRVDf8hjtE_ZmAcIM6zXs7olo7wozU4igeY9DZDOtKRzod29YXxAzYzVO6un0wvjei_uCznql_67bbogEEUCWAokSK9N_5bginvybzhLNAe4ZZE-d1brWQfB8fdE2e4k3TNzIpz1ndaGmE061k',
            rating: 4.9,
            reviews: 124,
            location: 'Delhi',
            experience: 6,
            hourlyRate: 400,
            skills: ['Wiring', 'Meter Fix', 'Installation'],
            verified: true,
            verificationBadge: 'AADHAAR VERIFIED'
        },
        {
            id: 2,
            name: 'Mohd. Salim',
            category: '🚰 Plumber',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLDx3zENzUXk3oG4vKoiXETUJMzfuI-iKUsNmhsqlt0OGLVBBP8SibU8HY7zFql-gdMUTfU7xIKS_525lqEjvlUG0Q18I6fCCrfsnDpgMzSBwuLzBhkU8QwbEXSjXbQ-hx9vOw8Y8-p1v06xPO8S7b4ZZlfqRdw0j6dXFF0NtPpjnqRfkUTXKUwp1EicF7DvW8j97gmCWBRE4wRKCbw8j3fNaa_NafDjhDGkrNNCV3W_gjER0jEeKTNLK9-3_zWe1M_xCQbK_vJBe7',
            rating: 5.0,
            reviews: 210,
            location: 'Meerut',
            experience: 8,
            hourlyRate: 350,
            skills: ['Leak Repair', 'Pipe Fitting'],
            verified: true,
            verificationBadge: 'POLICE VERIFIED'
        },
        {
            id: 3,
            name: 'Sunita Devi',
            category: '🧹 Cleaner',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLgZVVYvgG-3Rx2KSGH4vo0Z1jjKLBy1l4xKsQp8adGMHlqarXDJTwhmLn0QorxBCkHxHfhQtlM_6oGBXLCsbDWVjLBurKgF3bBQaillOebDDMMmM1xJ9smrZwrHYvvHoNCEctIBPRKow6m3essGBgA_8_X2YnyawrHhofdmFeJDXR9LqOHinA0oMcGtFtVGQfLoFVamtIRdZEyxy_pIlU_P3-sR6xFQGfaCW3a4OD7A290qmHiHhe1QihtGVwfX4fi_keFs6UCcyg',
            rating: 4.8,
            reviews: 86,
            location: 'Lucknow',
            experience: 3,
            hourlyRate: 250,
            skills: ['Deep Clean', 'Mopping'],
            verified: true,
            verificationBadge: 'AADHAAR VERIFIED'
        },
        {
            id: 4,
            name: 'Vijay Singh',
            category: '🎨 Painter',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlmdl_UYaLiSspfyhfW5uC7-5z2wjTKlId3X2kX2VAR4j8SELqMqdK6N721goXenzNMT26ntpYLWSlzjlC2KpzFzUAyrLYosItc6siM-xsBZ-7WFq81BhgNOHOZsy9rx7annFdZsVoTxC-DUHxm8NMnX0Gf6DIN6D8VSzhS5zuytBQ4JmWn-riJJi5lJKeKzl9nrcRhYRT8m-uMKw92fCJmwx5BwXYZjZ5Ypy7l_cw6A4N55zHRYZPzpfsv072e_T9XENZP77BJsjB',
            rating: 4.7,
            reviews: 92,
            location: 'Noida',
            experience: 5,
            hourlyRate: 450,
            skills: ['Wall Paint', 'Texture'],
            verified: false,
            verificationBadge: ''
        },
        {
            id: 5,
            name: 'Arun Sharma',
            category: '❄️ AC Repair',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRtw1Am5SUvGaDLyg3De5TT5_2-opWyb4w7wbeeTfHcVUK9MZf95oTW208iIm2F1lrKGUbXBgFBSzhcK0I9H9M0Rh2mWX72ve6h7XsJdgakQiEELwdab-Wzg65tCBqvkeZAAjQ4YqQIBLNv3hMgs35IUIFOO5FbfDFQW8FFSTy-uI-cIM5XrzObasAcYyx_KWuiSuf-iGy7npH93JOl3xGBAlLbA1cmuRLlIpdI-KUZXdQZLo0F5RJH2ChBJnoWtkUySuSgUoQvHO3',
            rating: 4.9,
            reviews: 158,
            location: 'Gurgaon',
            experience: 7,
            hourlyRate: 500,
            skills: ['Gas Refill', 'Service'],
            verified: true,
            verificationBadge: 'POLICE VERIFIED'
        },
        {
            id: 6,
            name: 'Deepak Verma',
            category: '🪑 Carpenter',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAGdDjhEcH2HCcB3FOwMltUTaZci2AuQJFIMOVNe8Ij8YtdfVcBOrY1M6WpYaRctSr9zGBIUW_iZjZuzvsyjxLVJ2dSwz-DZGSiIys8mRTimDgZO6VZLFg4vX0kKWe2RfWJpmN4LcaMy12hQ2CDDVK1yWyyeIooJ_X2iPLhynMXoaiq8A0zdoY_driqScd3UsmnOUlwIkdX-5NMxF6rergnLNssd60Yf-dFj-7Nek8BHSssoPsEdQ5Krcukni9Vjb0QKfxu7i0_XLH',
            rating: 4.6,
            reviews: 67,
            location: 'Delhi',
            experience: 4,
            hourlyRate: 380,
            skills: ['Furniture', 'Repair'],
            verified: true,
            verificationBadge: 'AADHAAR VERIFIED'
        }
    ];

    const filteredWorkers = category
        ? workers.filter(worker =>
            worker.category.toLowerCase().includes(category.toLowerCase())
          )
        : workers;

    const handleNextPage = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <section className="Listed_Worker-grid-section">
            <div className="Listed_Worker-grid-container">
                <div className="Listed_Worker-grid">
                    {filteredWorkers.length > 0 ? (
                        filteredWorkers.map(worker => (
                            <WorkerCard key={worker.id} worker={worker} />
                        ))
                    ) : (
                        <div className="Listed_Worker-no-results">
                            <span className="material-symbols-outlined">search_off</span>
                            <p>No workers found for "<strong>{category}</strong>"</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredWorkers.length > 0 && (
                    <div className="Listed_Worker-pagination">
                        <button
                            className="Listed_Worker-pagination-btn"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        <div className="Listed_Worker-pagination-numbers">
                            <button className={`Listed_Worker-page-number ${currentPage === 1 ? 'Listed_Worker-active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
                            <button className={`Listed_Worker-page-number ${currentPage === 2 ? 'Listed_Worker-active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
                            <button className={`Listed_Worker-page-number ${currentPage === 3 ? 'Listed_Worker-active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
                            <span className="Listed_Worker-pagination-dots">...</span>
                            <button className={`Listed_Worker-page-number ${currentPage === 12 ? 'Listed_Worker-active' : ''}`} onClick={() => setCurrentPage(12)}>12</button>
                        </div>

                        <button
                            className="Listed_Worker-pagination-btn"
                            onClick={handleNextPage}
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}