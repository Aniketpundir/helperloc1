import { useState } from 'react';
import './KnowledgeBase.css';

const categories = [
    { icon: 'menu_book', label: 'User Guides' },
    { icon: 'build_circle', label: 'Troubleshooting' },
    { icon: 'policy', label: 'Platform Policies' },
];

export default function KnowledgeBase() {
    const [query, setQuery] = useState('');

    return (
        <section className="kb">
            <div className="kb__inner">
                <h2 className="kb__heading">Self-Service Knowledge Base</h2>

                {/* Search bar */}
                <div className="kb__search-wrap">
                    <span className="material-symbols-outlined kb__search-icon">search</span>
                    <input
                        className="kb__search-input"
                        type="text"
                        placeholder="Search for guides, policies, or troubleshooting..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Category cards */}
                <div className="kb__categories">
                    {categories.map((c) => (
                        <div key={c.label} className="kb__cat-card">
                            <span className="material-symbols-outlined kb__cat-icon">{c.icon}</span>
                            <h4 className="kb__cat-label">{c.label}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}