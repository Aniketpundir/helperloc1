import './VideoDemo.css';

const VideoDemo = ({ thumbnailSrc = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqUzn6TQY-iR6lRFsFH9H76k60m8IBxeXDn-nvp6tEwOPQDhODsKE80PzP2c5fIsDcKNQT8Czv6L_arQ5yMBgj4UD13x0ekis3TY3MVRAeJ_sQdh2mP-5xBDMGZ_kcPgeSMUoG1v1S5hgCL7PB9R49UNnZwqlbjK96zw-JSw81PtO5hUX6LdJuawJSloSRdb-ZjFfHRerlAUJVYNuk1XZbEtP9HXacrIVLPbUB5kLEXfeQOggX8FWVEm_OI1EVVdYTrJCPHGyRt01p' }) => {
    const handlePlay = () => {
        // Wire up your video modal / YouTube embed here
        alert('Video player coming soon!');
    };

    return (
        <section className="video-demo">
            <div className="video-demo__inner">
                <h2 className="video-demo__heading">See HelperLoc in action</h2>

                <div className="video-demo__thumbnail-wrap">
                    <img
                        className="video-demo__img"
                        src={thumbnailSrc}
                        alt="HelperLoc App Demo"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="video-demo__overlay">
                        <button className="video-demo__play-btn" onClick={handlePlay} aria-label="Play video">
                            <span className="material-symbols-outlined">play_arrow</span>
                        </button>
                    </div>
                </div>

                <button className="video-demo__cta" onClick={handlePlay}>
                    Watch Demo
                </button>
            </div>
        </section>
    );
};

export default VideoDemo;
