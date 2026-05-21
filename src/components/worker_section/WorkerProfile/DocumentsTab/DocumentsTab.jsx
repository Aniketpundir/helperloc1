import './DocumentsTab.css';

const docs = [
    {
        id: 'aadhaar',
        title: 'Aadhaar Card',
        status: 'verified',
        statusLabel: 'Verified',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa-mQZ21uDCIWrGvRJYO1vYSM-7czSV0W-Sfx8FXGhCq8VdpCR9TNKawpnFN60Oz5UI11-NnoWfkR9aBWF-ByVbUR_fzGcKE0w-eJEqDnRfAgVpBpjEjiD-IRZM74851WjrzD9i5oWTfUcxhuNW2henfxNcbmS7xSc1M17eGDRIj8Th04utQWi-F9p-Lj38hACZR0YSHikXL7b_-j3AtGqTMTnb5sAfibL_R9FKlnl37oXHaFSes8MJjDgSiNo7N2U8FK2qyzGbCha',
    },
    {
        id: 'police',
        title: 'Police Certificate',
        status: 'review',
        statusLabel: 'Under Review',
        uploadDate: 'Uploaded on 12 Feb 2024',
        img: null,
    },
    {
        id: 'skill',
        title: 'Skill Certificate',
        status: 'upload',
        statusLabel: null,
    },
];

export default function DocumentsTab() {
    return (
        <div className="docs-grid">
            {docs.map((doc) => (
                <div key={doc.id} className="docs-card">

                    {/* Preview area */}
                    <div className="docs-card__preview">
                        {doc.img ? (
                            <img src={doc.img} alt={doc.title} className="docs-card__img" />
                        ) : doc.status === 'upload' ? (
                            <div className="docs-card__placeholder">
                                <span className="material-symbols-outlined docs-card__upload-icon">upload_file</span>
                            </div>
                        ) : (
                            <div className="docs-card__placeholder">
                                <span className="material-symbols-outlined docs-card__file-icon">description</span>
                            </div>
                        )}

                        {/* Status overlay */}
                        {doc.statusLabel && (
                            <div className="docs-card__overlay">
                                <span className={`docs-card__status docs-card__status--${doc.status}`}>
                                    {doc.statusLabel}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <h5 className="docs-card__title">{doc.title}</h5>
                    {doc.uploadDate && <p className="docs-card__date">{doc.uploadDate}</p>}

                    {/* Action */}
                    {doc.status === 'verified' && (
                        <button className="docs-card__action">
                            <span className="material-symbols-outlined">visibility</span> View Document
                        </button>
                    )}
                    {doc.status === 'upload' && (
                        <>
                            <p className="docs-card__hint">Upload certifications to increase your profile trust score.</p>
                            <button className="docs-card__upload-btn">Upload File</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}