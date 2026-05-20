import './LiveTrackingMap.css';

export default function LiveTrackingMap() {
    return (
        <aside className="live-map">
            {/* Map area */}
            <div className="live-map__canvas">
                {/* Background map image */}
                <div className="live-map__bg" />

                {/* Dashed route line */}
                <div className="live-map__route" aria-hidden="true" />

                {/* Home marker */}
                <div className="live-map__marker live-map__marker--home">
                    <div className="live-map__marker-pin live-map__marker-pin--home">
                        <span className="material-symbols-outlined">home</span>
                    </div>
                    <div className="live-map__marker-label live-map__marker-label--home">HOME</div>
                </div>

                {/* Worker marker */}
                <div className="live-map__marker live-map__marker--worker">
                    <div className="live-map__marker-pin live-map__marker-pin--worker">
                        <span className="material-symbols-outlined">directions_run</span>
                    </div>
                    <div className="live-map__marker-label live-map__marker-label--worker">WORKER</div>
                </div>

                {/* Zoom / locate controls */}
                <div className="live-map__controls">
                    <button className="live-map__ctrl-btn" aria-label="Zoom in">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button className="live-map__ctrl-btn" aria-label="Zoom out">
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button className="live-map__ctrl-btn live-map__ctrl-btn--active" aria-label="My location">
                        <span className="material-symbols-outlined">my_location</span>
                    </button>
                </div>
            </div>

            {/* Tracking info strip */}
            <div className="live-map__info">
                <div className="live-map__info-row">
                    <div className="live-map__status">
                        <div className="live-map__status-icon-wrap">
                            <span className="material-symbols-outlined live-map__status-icon">local_shipping</span>
                        </div>
                        <div>
                            <p className="live-map__status-label">Worker Status</p>
                            <p className="live-map__status-value">On the way</p>
                        </div>
                    </div>
                    <div className="live-map__eta">
                        <p className="live-map__eta-value">5 MIN ETA</p>
                        <p className="live-map__eta-traffic">Traffic: Moderate</p>
                    </div>
                </div>

                <button className="live-map__share-btn">
                    <span className="material-symbols-outlined">share</span>
                    SHARE LIVE TRACKING
                </button>
            </div>
        </aside>
    );
}