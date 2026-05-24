import './WorkerTopBar.css';
import { useState } from 'react';

export default function WorkerTopBar({ workerName = 'Ramesh' }) {
    const [notifOpen, setNotifOpen] = useState(false);

    const notifications = [
        { id: 1, text: 'New booking request from Anita Singh', time: '2 min ago', icon: 'work' },
        { id: 2, text: 'Rahul Verma confirmed your appointment', time: '1 hr ago', icon: 'check_circle' },
        { id: 3, text: 'Payment of ₹1,200 received', time: '3 hr ago', icon: 'payments' },
    ];

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short', day: '2-digit', month: 'long', year: 'numeric',
    });

    return (
        <header className="worker-topbar">
            {/* Greeting */}
            <div className="worker-topbar__greeting">
                <h1 className="worker-topbar__title">Good Morning, {workerName} 👋</h1>
                <p className="worker-topbar__subtitle">Here's your activity overview for today</p>
            </div>

            {/* Right actions */}
            <div className="worker-topbar__actions">

                {/* Notification bell */}
                <div className="worker-topbar__notif-wrap">
                    <button
                        className="worker-topbar__notif-btn"
                        onClick={() => setNotifOpen((p) => !p)}
                        aria-label="Notifications"
                    >
                        <span className="material-symbols-outlined worker-topbar__notif-icon">notifications</span>
                        <span className="worker-topbar__notif-badge">{notifications.length}</span>
                    </button>

                    {notifOpen && (
                        <div className="worker-topbar__notif-dropdown">
                            <div className="worker-topbar__notif-header">
                                <span className="worker-topbar__notif-heading">Notifications</span>
                                <button className="worker-topbar__notif-clear" onClick={() => setNotifOpen(false)}>
                                    Close
                                </button>
                            </div>
                            {notifications.map((n) => (
                                <div key={n.id} className="worker-topbar__notif-item">
                                    <span className="material-symbols-outlined worker-topbar__notif-item-icon">{n.icon}</span>
                                    <div className="worker-topbar__notif-item-body">
                                        <p className="worker-topbar__notif-item-text">{n.text}</p>
                                        <p className="worker-topbar__notif-item-time">{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date */}
                <p className="worker-topbar__date">{today}</p>
            </div>
        </header>
    );
}