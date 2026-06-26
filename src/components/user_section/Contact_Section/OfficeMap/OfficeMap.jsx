import { useState } from 'react';
import './OfficeMap.css';

const offices = [
    {
        id: 'meerut',
        label: 'Meerut HQ',
        sub: 'Central Strategy & Tech Ops',
    },
    {
        id: 'delhi',
        label: 'Delhi Support',
        sub: '24/7 Operations Hub',
    },
    {
        id: 'lucknow',
        label: 'Lucknow Hub',
        sub: 'Regional Logistics',
    },
];

export default function OfficeMap() {
    const [active, setActive] = useState('meerut');

    return (
        <section className="office-map">
            {/* Sidebar */}
            <div className="office-map__sidebar">
                <h3 className="office-map__sidebar-heading">Our Offices</h3>
                <div className="office-map__list">
                    {offices.map((o) => (
                        <button
                            key={o.id}
                            className={`office-map__item${active === o.id ? ' office-map__item--active' : ''}`}
                            onClick={() => setActive(o.id)}
                        >
                            <span className="office-map__item-label">{o.label}</span>
                            <span className="office-map__item-sub">{o.sub}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Map image */}
            <div className="office-map__img-wrap">
                <img
                    className="office-map__img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYeR94VifLLxxE7qKEv50Sfo0dkJTAp5xNy5C0NlnzbobYhpIz3Zx0a2j6IFQIDavzxr8ClxSQUZmZ-YgUA8b682rbXo-Wfj1LLgRXb8wMQEA3WavHy9yWqJzqtetSuS-3nlqrzRhb_dCjA_HNE_ddyEqOas8SJf-TzfiMknDe9uJ042i3R8E_PmD2FQdNeBXuBpLsNDsoaNJrKUxrqfQdKPeNmij84j3_qGfb9fMvHoU7abMfbHA0KSoODTSfF8VQ6365KqKDNKB4"
                    alt="Northern India map with HelperLoc office locations"
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </section>
    );
}
