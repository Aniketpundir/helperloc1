import React, { useState } from 'react';
import './CompleteProfile.css';

import PageHeader from './PageHeader/PageHeader';
import StatsRow from './StatsRow/StatsRow';
import ProjectCard from './ProjectCard/ProjectCard';
import SummaryBanner from './SummaryBanner/SummaryBanner';

const ALL_PROJECTS = [
    {
        id: 1,
        title: 'Kitchen Tap Leak Repair',
        client: 'Priya Mehta',
        location: 'Lajpat Nagar, Delhi',
        completedDate: '18 May 2026',
        duration: '3 hours',
        workers: 1,
        jobDescription:
            'Fix leaking tap in kitchen and check bathroom shower pressure.',
        amountPaid: 1200,
        starCount: 5,
        review:
            'Great work, very professional! Arrived right on time and fixed it quickly.',
    },
    {
        id: 2,
        title: 'Full House Deep Cleaning',
        client: 'Vikram Singh',
        location: 'Vasant Vihar, Delhi',
        completedDate: '15 May 2026',
        duration: '8 hours',
        workers: 3,
        jobDescription:
            'End-to-end cleaning including balcony, windows, and kitchen degreasing.',
        amountPaid: 6500,
        starCount: 4,
        review:
            'Team was very thorough. The kitchen looks brand new. Highly recommend their service.',
    },
    {
        id: 3,
        title: 'Electrical Wiring Repair',
        client: 'Anita Rao',
        location: 'Dwarka Sector 12, Delhi',
        completedDate: '10 May 2026',
        duration: '4.5 hours',
        workers: 1,
        jobDescription:
            'Full apartment electrical check and fixing main MCB tripping issue.',
        amountPaid: 3200,
        starCount: 5,
        review:
            `Very knowledgeable and resolved the issue that two other electricians couldn't find.`,
    },
    {
        id: 4,
        title: 'AC Service & Gas Refill',
        client: 'Ravi Sharma',
        location: 'Rohini Sector 7, Delhi',
        completedDate: '5 May 2026',
        duration: '2 hours',
        workers: 1,
        jobDescription:
            'Annual servicing and gas refilling for 2 split ACs.',
        amountPaid: 2200,
        starCount: 5,
        review: 'Quick and efficient. AC is working perfectly now.',
    },
    {
        id: 5,
        title: 'Bathroom Tiles Fixing',
        client: 'Meena Kapoor',
        location: 'Saket, Delhi',
        completedDate: '28 Apr 2026',
        duration: '5 hours',
        workers: 2,
        jobDescription:
            'Re-grouting and fixing 3 broken tiles in the master bathroom.',
        amountPaid: 1800,
        starCount: 4,
        review: 'Good work. Tiles look as good as new.',
    },
    {
        id: 6,
        title: 'Painting - Living Room',
        client: 'Suresh Nair',
        location: 'Greater Kailash, Delhi',
        completedDate: '20 Apr 2026',
        duration: '6 hours',
        workers: 2,
        jobDescription: 'Full wall painting of living room with premium emulsion.',
        amountPaid: 3600,
        starCount: 5,
        review: 'Absolutely loved the finish. Very neat and clean work.',
    },
];

// ── Filter logic ──────────────────────────────────────────────
const now = new Date();

const isWithinDays = (dateStr, days) => {
    const d = new Date(dateStr);
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= days;
};

const filterProjects = (projects, filter) => {
    switch (filter) {
        case 'This Month':
            return projects.filter((p) => isWithinDays(p.completedDate, 30));
        case 'Last 3 Months':
            return projects.filter((p) => isWithinDays(p.completedDate, 90));
        case 'This Year':
            return projects.filter((p) => {
                const d = new Date(p.completedDate);
                return d.getFullYear() === now.getFullYear();
            });
        default:
            return projects;
    }
};

// ── CompletedProfile ───────────────────────────────────────────────────────
function CompletedProfile() {
    const [selectedFilter, setSelectedFilter] = useState('All Time');
    const filtered = filterProjects(ALL_PROJECTS, selectedFilter);
    const totalEarned = filtered.reduce((sum, p) => sum + p.amountPaid, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flex: 1, maxWidth: 'var(--max-width)', margin: '0 auto', padding: '48px 24px', width: '100%' }}>

                {/* Page Header + Filter */}
                <PageHeader
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                />

                {/* Stats Row */}
                <StatsRow />

                {/* Project Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {filtered.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '64px 0',
                            color: 'var(--color-on-surface-variant)',
                            fontSize: 'var(--text-body-lg)',
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 48, display: 'block', marginBottom: 12 }}>
                                folder_off
                            </span>
                            No completed projects for the selected period.
                        </div>
                    ) : (
                        filtered.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))
                    )}
                </div>

                {/* Summary Banner */}
                {/* {filtered.length > 0 && (
                    <SummaryBanner
                        totalEarned={totalEarned}
                        totalProjects={filtered.length}
                    />
                )} */}
            </main>
        </div>
    );
}

export default CompletedProfile;