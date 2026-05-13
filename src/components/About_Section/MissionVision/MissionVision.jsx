// MissionVision.jsx
import './MissionVision.css';

const cards = [
    {
        icon: 'rocket_launch',
        title: 'Our Mission',
        desc: 'To empower every Indian household with reliable, high-quality professional services at the tap of a button.',
        primary: false,
    },
    {
        icon: 'visibility',
        title: 'Our Vision',
        desc: 'To become the gold standard for home maintenance across Asia, driven by integrity and innovation.',
        primary: true,
    },
    {
        icon: 'favorite',
        title: 'Our Values',
        desc: 'Putting workers first, ensuring customer safety, and maintaining radical transparency in pricing.',
        primary: false,
    },
];

const MissionVision = () => {
    return (
        <section className="mission-vision">
            <div className="mission-vision__grid">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className={`mission-vision__card ${card.primary ? 'mission-vision__card--primary' : ''}`}
                    >
                        <span
                            className={`material-symbols-outlined mission-vision__icon ${card.primary ? 'mission-vision__icon--white' : ''}`}
                        >
                            {card.icon}
                        </span>
                        <h3
                            className={`mission-vision__card-title ${card.primary ? 'mission-vision__card-title--white' : ''}`}
                        >
                            {card.title}
                        </h3>
                        <p
                            className={`mission-vision__card-desc ${card.primary ? 'mission-vision__card-desc--white' : ''}`}
                        >
                            {card.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MissionVision;