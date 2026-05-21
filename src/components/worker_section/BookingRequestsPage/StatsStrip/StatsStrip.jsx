import './StatsStrip.css';

const StatsStrip = ({ total, pending, confirmed }) => {
    return (
        <div className="request-statsstrip">

            <div className="request-statsstrip__chip request-statsstrip__chip--total">
                <span className="request-statsstrip__chip-emoji">📋</span>
                {total} Total
            </div>

            <div className="request-statsstrip__chip request-statsstrip__chip--pending">
                <span className="request-statsstrip__chip-emoji">⏳</span>
                {pending} Pending
            </div>

            <div className="request-statsstrip__chip request-statsstrip__chip--confirmed">
                <span className="request-statsstrip__chip-emoji">✅</span>
                {confirmed} Confirmed
            </div>

        </div>
    );
};

export default StatsStrip;