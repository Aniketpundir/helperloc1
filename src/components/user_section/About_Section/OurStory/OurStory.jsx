import './OurStory.css';

const milestones = [
    {
        badge: '24',
        badgeClass: '',
        title: 'Founded in 2024',
        desc: 'Launched in Bangalore with a vision to digitize the unorganized service sector.',
    },
    {
        badge: '25',
        badgeClass: 'our-story__milestone-badge--secondary',
        title: 'Pan-India Expansion',
        desc: 'Scaling to 10 major hubs including Mumbai, Delhi, and Hyderabad.',
    },
];

const OurStory = ({
    imgSrc = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPNybXbQFGshXDouvQSS9HVht3annpOP60H0Jb5C7B3oLf_3rAGvS0mJ1a8T4d4IZZGXFIw38JYN-9eJAduV9iYEnEfvwQHWmFyRaLmqOVsY3JbmAxE4-fqNF_E3APKX62Z2-yI7i6iKr4QeqnQXNTe-h601cSLbDfsGMAtl5l03uroFP8kqHhK52WzGh0LsHIBNGo103t4qtG3He1gl5yzeeEMIu7fltgyH72XB6-xh270Zl4eSEPLYPTFJKQt44AJWkb1Ekn4b6A',
}) => {
    return (
        <section className="our-story">
            <div className="our-story__grid">
                {/* Text */}
                <div className="our-story__text">
                    <h2 className="our-story__heading">The HelperLoc Story</h2>
                    <p className="our-story__quote">
                        "We saw a gap in how home services were delivered in India—lack of reliability
                        and opaque pricing. HelperLoc was born to bridge that gap with technology and
                        respect for our workforce."
                    </p>
                    <div className="our-story__timeline">
                        {milestones.map((m) => (
                            <div className="our-story__milestone" key={m.title}>
                                <div className={`our-story__milestone-badge ${m.badgeClass}`}>
                                    {m.badge}
                                </div>
                                <div>
                                    <h4 className="our-story__milestone-title">{m.title}</h4>
                                    <p className="our-story__milestone-desc">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="our-story__img-wrap">
                    <img
                        className="our-story__img"
                        src={imgSrc}
                        alt="HelperLoc founding team"
                    />
                </div>
            </div>
        </section>
    );
};

export default OurStory;