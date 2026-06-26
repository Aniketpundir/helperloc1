import './Hero.css';

const Hero = () => {
    return (
        <section className="worker-category-hero">
            {/* Background Image */}
            <div className="worker-category-hero__bg">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwn5PIT6a7trTxrKxhraAV54CY0hPdVDAXtzLoDxd7ZG7LxGVwdbo1npYDClbvek40vHVKvYA2lYQLumEEAG7JjWtPyZGyN_iBo19UJfcFYUUg2A7ovPGKvrxgxYgujoR6HfRMiNOAHgZBBt1Jmj_A7jQCycFFNzIReuo1a5zDKBw9cn30GivrWI-ioT6R5H04evJQclbcTAaY4yjz91JOlBWlK-c8nSkbuc_p4yKBxvXNfdlA0sl5ggmHEaEtFimnxsnjmimgbv1E"
                    alt="Professional cleaning specialist"
                    className="worker-category-hero__bg-img"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                />
                <div className="worker-category-hero__overlay"></div>
            </div>

            {/* Content */}
            <div className="worker-category-hero__content">
                <h1 className="worker-category-hero__title">
                    Find Trusted Services Effortlessly
                </h1>
                <p className="worker-category-hero__subtitle">
                    Your one-stop solution for reliable household help. Get it done right with HelperLoc's vetted professionals.
                </p>
                <div className="worker-category-hero__actions">
                    <button className="worker-category-hero__btn worker-category-hero__btn--primary">
                        Browse Services
                    </button>
                    <button className="worker-category-hero__btn worker-category-hero__btn--outline">
                        How it Works
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
