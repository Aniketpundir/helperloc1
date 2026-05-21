import './WorkerEarningsChart.css';

const WEEKLY_DATA = [
    { day: 'MON', height: 40, amount: 600 },
    { day: 'TUE', height: 75, amount: 1200 },
    { day: 'WED', height: 60, amount: 900 },
    { day: 'THU', height: 20, amount: 300 },
    { day: 'FRI', height: 30, amount: 450 },
    { day: 'SAT', height: 90, amount: 1400 },
    { day: 'SUN', height: 10, amount: 150 },
];

const TOTAL_THIS_WEEK = WEEKLY_DATA.reduce((sum, d) => sum + d.amount, 0);

export default function WorkerEarningsChart() {
    return (
        <div className="worker-chart">
            {/* Header */}
            <div className="worker-chart__header">
                <h3 className="worker-chart__title">Weekly Earnings</h3>
                <span className="worker-chart__week-total">₹{TOTAL_THIS_WEEK.toLocaleString()} this week</span>
            </div>

            {/* Bar chart */}
            <div className="worker-chart__bars">
                {WEEKLY_DATA.map((d) => (
                    <div key={d.day} className="worker-chart__bar-col">
                        <div className="worker-chart__tooltip">₹{d.amount}</div>
                        <div
                            className="worker-chart__bar"
                            style={{ height: `${d.height}%` }}
                        />
                        <span className="worker-chart__day-label">{d.day}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="worker-chart__footer">
                <span className="worker-chart__footer-label">Estimated Payout</span>
                <span className="worker-chart__footer-value">₹12,450.00</span>
            </div>
        </div>
    );
}