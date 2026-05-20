import './HeroSection.css';

const popularTags = ['Booking a Pro', 'Refunds', 'Safety'];

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__content">
                <h1 className="hero__title">How can we help?</h1>
                <p className="hero__subtitle">
                    Search our knowledge base for quick answers to common questions.
                </p>

                <div className="hero__search-wrapper">
                    <span className="material-symbols-outlined hero__search-icon">search</span>
                    <input
                        className="hero__search-input"
                        type="text"
                        placeholder="Search for articles, guides, and support..."
                    />
                </div>

                <div className="hero__popular">
                    <span className="hero__popular-label">Popular:</span>
                    {popularTags.map((tag) => (
                        <button key={tag} className="hero__tag">{tag}</button>
                    ))}
                </div>
            </div>
        </section>
    );
}