import './AboutHero.css';
import About_Hero_Image from "../../../../assets/About_Hero_Image.png"

const AboutHero = ({
    imgSrc = About_Hero_Image,
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