import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryBar.css';
import { homeCategories } from '../homeServices';

const ENTER_COMPACT_AT = 100;
const EXIT_COMPACT_AT = 60;

const CategoryBar = () => {
    const [isCompact, setIsCompact] = useState(false);
    const navigate = useNavigate();
    const tickingRef = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            // requestAnimationFrame throttling: only run the check once
            // per repaint instead of on every single scroll event, which
            // removes layout-thrashing jitter on fast/trackpad scrolls.
            if (tickingRef.current) return;
            tickingRef.current = true;

            window.requestAnimationFrame(() => {
                const y = window.scrollY;
                setIsCompact((prev) => {
                    if (!prev && y > ENTER_COMPACT_AT) return true;
                    if (prev && y < EXIT_COMPACT_AT) return false;
                    return prev;
                });
                tickingRef.current = false;
            });
        };

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