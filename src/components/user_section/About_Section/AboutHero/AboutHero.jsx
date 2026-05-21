import './AboutHero.css';

const AboutHero = ({
    imgSrc = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRxrgyP571P2DvWvL3J0PP8BztN7JwEo_fD6pBUtreHpMi3bwIJcerqygL9i3_RC0-6Xlq9d01jfba7FZQWanDagtJL7COUZhUNxWrmDcOngMU1EF2CULInelEzv4EPfxVWyGwWT9_WpXK_bnCAQ43T0piv_ItfczdaTmgiCT0GPdqoLA0yF5y-f144A0HVfDBKn7IqBZMMxUiogFRzLf8yrD9TlvAOwovZEZfMEmpbxG3ok_GtfkxBbKAVPm-Abrx3dBYaFsSYVlP',
}) => {
    return (
        <section className="about-hero">
            {/* Left */}
            <div className="about-hero__left">
                <div className="about-hero__left-inner">
                    <h1 className="about-hero__title">
                        We're Building India's Most Trusted Home Services Platform
                    </h1>
                    <p className="about-hero__subtitle">
                        Empowering professionals and simplifying lives through technology,
                        transparency, and a commitment to excellence in every Indian home.
                    </p>
                    <div className="about-hero__buttons">
                        <button className="about-hero__btn-primary">Get Started</button>
                        <button className="about-hero__btn-secondary">Our Services</button>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="about-hero__right">
                <img
                    className="about-hero__img"
                    src={imgSrc}
                    alt="HelperLoc service professionals"
                />
            </div>
        </section>
    );
};

export default AboutHero;