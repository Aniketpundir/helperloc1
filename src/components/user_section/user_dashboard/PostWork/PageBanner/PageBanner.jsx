import './PageBanner.css';

const stepLabels = ['Job Details', 'Description', 'Review & Post'];

export default function PageBanner({ currentStep }) {
    const progress = Math.round((currentStep / 3) * 100);

    return (
        <section className="page-banner">
            <div className="page-banner__inner">
                <h1 className="page-banner__heading">Tell Us What You Need</h1>
                <p className="page-banner__sub">Post your job, get worker applications, and hire the best.</p>
            </div>

            {/* Decorative radial glow */}
            <div className="page-banner__deco" aria-hidden="true" />
        </section>
    );
}