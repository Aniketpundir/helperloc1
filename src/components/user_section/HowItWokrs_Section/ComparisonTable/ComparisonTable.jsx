// ComparisonTable.jsx
import './ComparisonTable.css';

const rows = [
    'Worker Verified',
    'Upfront Pricing',
    'Instant Booking',
    'Payment Safety',
    'Public Reviews',
    '24/7 Support',
];

const ComparisonTable = () => {
    return (
        <section className="comparison-table">
            <div className="comparison-table__inner">
                <h2 className="comparison-table__heading">Why HelperLoc?</h2>

                <div className="comparison-table__scroll">
                    <table className="comparison-table__table">
                        <thead>
                            <tr>
                                <th className="comparison-table__th-feature">Feature</th>
                                <th className="comparison-table__th-helperloc">HelperLoc</th>
                                <th className="comparison-table__th-own">On Your Own</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row}>
                                    <td className="comparison-table__td-feature">{row}</td>
                                    <td className="comparison-table__td-helperloc">
                                        <span className="material-symbols-outlined icon-check">check_circle</span>
                                    </td>
                                    <td className="comparison-table__td-own">
                                        <span className="material-symbols-outlined icon-cross">cancel</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;