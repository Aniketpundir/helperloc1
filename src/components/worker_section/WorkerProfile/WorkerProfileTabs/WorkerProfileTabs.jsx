import { useState } from 'react';
import './WorkerProfileTabs.css';

import PersonalInfoTab from '../PersonalInfoTab/PersonalInfoTab';
import SkillsTab from '../SkillsTab/SkillsTab';
import DocumentsTab from '../DocumentsTab/DocumentsTab';
import BankDetailsTab from '../BankDetailsTab/BankDetailsTab';

const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'skills', label: 'Skills & Services' },
    { id: 'docs', label: 'Documents' },
    { id: 'bank', label: 'Bank Details' },
];

export default function WorkerProfileTabs() {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="wpt">
            {/* ── Pill tab nav ── */}
            <nav className="wpt__nav">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        className={`wpt__tab${activeTab === t.id ? ' wpt__tab--active' : ' wpt__tab--inactive'}`}
                        onClick={() => setActiveTab(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </nav>

            {/* ── Tab content — key forces remount animation on switch ── */}
            <div className="wpt__content" key={activeTab}>
                {activeTab === 'personal' && <PersonalInfoTab />}
                {activeTab === 'skills' && <SkillsTab />}
                {activeTab === 'docs' && <DocumentsTab />}
                {activeTab === 'bank' && <BankDetailsTab />}
            </div>
        </div>
    );
}