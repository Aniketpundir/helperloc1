import './ValuesGrid.css';

const ValuesGrid = () => {
    return (
        <section className="values-grid">
            <div className="values-grid__inner">
                <h2 className="values-grid__heading">Our Values in Action</h2>

                <div className="values-grid__bento">

                    {/* Tile 1 — wide, row layout */}
                    <div className="values-tile values-tile--wide values-tile--row">
                        <div className="values-tile__icon-wrap">
                            <span
                                className="material-symbols-outlined values-tile__icon"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                security
                            </span>
                        </div>
                        <div>
                            <h4 className="values-tile__title">Uncompromised Safety</h4>
                            <p className="values-tile__desc">
                                Every professional undergoes a rigorous 3-step background check and
                                police verification before their first task.
                            </p>
                        </div>
                    </div>

                    {/* Tile 2 — secondary tint */}
                    <div className="values-tile values-tile--secondary">
                        <span className="material-symbols-outlined values-tile__icon-standalone values-tile__icon--secondary">
                            payments
                        </span>
                        <h4 className="values-tile__title">Fair Pricing</h4>
                        <p className="values-tile__desc">
                            Standardized rates based on job complexity. No hidden costs or surge pricing.
                        </p>
                    </div>

                    {/* Tile 3 — normal */}
                    <div className="values-tile">
                        <span className="material-symbols-outlined values-tile__icon-standalone">
                            bolt
                        </span>
                        <h4 className="values-tile__title">Unmatched Speed</h4>
                        <p className="values-tile__desc">
                            Book and get a confirmed professional at your doorstep in under 60 minutes.
                        </p>
                    </div>

                    {/* Tile 4 — primary wide */}
                    <div className="values-tile values-tile--wide values-tile--primary">
                        <div className="values-tile__header-row">
                            <span
                                className="material-symbols-outlined values-tile__icon-standalone--white"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                workspace_premium
                            </span>
                            <h4 className="values-tile__title values-tile__title--white">
                                Worker Dignity &amp; Insurance
                            </h4>
                        </div>
                        <p className="values-tile__desc values-tile__desc--white">
                            We provide free health insurance and professional training to all our
                            partners, ensuring they grow as we grow.
                        </p>
                    </div>

                    {/* Tile 5 — normal */}
                    <div className="values-tile">
                        <span className="material-symbols-outlined values-tile__icon-standalone">
                            support_agent
                        </span>
                        <h4 className="values-tile__title">24/7 Support</h4>
                        <p className="values-tile__desc">
                            Dedicated happiness team available around the clock for any queries or
                            escalations.
                        </p>
                    </div>

                    {/* Tile 6 — wide, row layout */}
                    <div className="values-tile values-tile--wide values-tile--row">
                        <span className="material-symbols-outlined values-tile__icon-standalone">
                            verified
                        </span>
                        <div>
                            <h4 className="values-tile__title">Quality Guaranteed</h4>
                            <p className="values-tile__desc">
                                If you're not satisfied with the work, we'll re-do it for free or offer
                                a full refund. No questions asked.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ValuesGrid;