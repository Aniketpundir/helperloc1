// src/components/user_section/Home_Section/CategoryBar/CategoryBar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryBar.css';
import { homeCategories } from '../homeServices';

const CategoryBar = () => {
    const [isCompact, setIsCompact] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsCompact(window.scrollY > 90);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (label) => {
        navigate(`/worker-category/listed-worker/${label}`);
    };

    return (
        <div className={`catbar ${isCompact ? 'catbar--compact' : ''}`}>
            <div className="catbar__inner">
                <div className="catbar__track">
                    {homeCategories.map((cat) => {
                        const CategoryIcon = cat.Icon;
                        return (
                            <button
                                key={cat.label}
                                className="catbar__item"
                                onClick={() => handleClick(cat.label)}
                                aria-label={cat.label}
                                style={{ '--cat-color': cat.color }}
                            >
                                <div className="catbar__icon-wrap">
                                    <CategoryIcon className="catbar__icon" aria-hidden="true" />
                                </div>
                                <span className="catbar__label">{cat.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
