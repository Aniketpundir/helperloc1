import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    fetchRecentWorkPostChats,
    openExistingWorkPostChat,
} from '../../../Redux/Slice/workPostChatSlice';
import WorkPostChatModal from '../WorkPostChatModal/WorkPostChatModal';
import './RecentChats.css';

const avatarFor = (name = 'User') =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1565c0&color=fff&size=96&bold=true`;

const lastMessageText = (chat) => {
    const last = chat.lastMessage || chat.messages?.at(-1);
    if (!last) return 'No messages yet';
    return `${last.isMine ? 'You: ' : ''}${last.text}`;
};

function DeliveryTicks({ status }) {
    if (!status) return null;

    if (status === 'sent') {
        return <span className="material-symbols-outlined rc-ticks rc-ticks--sent">check</span>;
    }

    return (
        <span className={`rc-double-tick${status === 'seen' ? ' rc-double-tick--seen' : ''}`} aria-label={status}>
            <span className="material-symbols-outlined">check</span>
            <span className="material-symbols-outlined rc-double-tick__second">check</span>
        </span>
    );
}

const formatTime = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function RecentChats({ role = 'user' }) {
    const dispatch = useDispatch();
    const { recentChats, recentLoading, error } = useSelector((state) => state.workPostChat);

    useEffect(() => {
        dispatch(fetchRecentWorkPostChats());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    return (
        <div className="rc-page">
            <div className="rc-header">
                <div>
                    <p className="rc-eyebrow">{role === 'worker' ? 'Worker Panel' : 'User Dashboard'}</p>
                    <h1 className="rc-title">Recent Chats</h1>
                    <p className="rc-subtitle">Continue your work-post conversations inside HelperLoc.</p>
                </div>
                <button className="rc-refresh" onClick={() => dispatch(fetchRecentWorkPostChats())}>
                    <span className="material-symbols-outlined">refresh</span>
                    Refresh
                </button>
            </div>

            <div className="rc-list">
                {recentLoading ? (
                    <div className="rc-empty">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                        Loading recent chats...
                    </div>
                ) : recentChats.length ? (
                    recentChats.map((chat) => {
                        const last = chat.lastMessage || chat.messages?.at(-1);
                        const hasUnread = Number(chat.unreadCount || 0) > 0;

                        return (
                        <button
                            key={chat.id}
                            className={`rc-card${hasUnread ? ' rc-card--unread' : ''}`}
                            onClick={() => dispatch(openExistingWorkPostChat(chat.id))}
                        >
                            <img
                                className="rc-card__avatar"
                                src={chat.peer?.profileImage || avatarFor(chat.peer?.fullName)}
                                alt={chat.peer?.fullName || 'Chat user'}
                            />
                            <div className="rc-card__main">
                                <div className="rc-card__top">
                                    <h3 className="rc-card__name">{chat.peer?.fullName || 'User'}</h3>
                                    <span className="rc-card__time">{formatTime(chat.lastMessageAt)}</span>
                                </div>
                                <p className="rc-card__job">{chat.workPost?.title || 'Work post chat'}</p>
                                <div className="rc-card__message-row">
                                    {last?.isMine && <DeliveryTicks status={last.deliveryStatus} />}
                                    <p className="rc-card__message">{lastMessageText(chat)}</p>
                                </div>
                            </div>
                            {hasUnread && <span className="rc-card__unread-dot" aria-label="Unread messages" />}
                            <span className="material-symbols-outlined rc-card__chevron">chevron_right</span>
                        </button>
                        );
                    })
                ) : (
                    <div className="rc-empty">
                        <span className="material-symbols-outlined">forum</span>
                        No chats yet. Start one from a work post application.
                    </div>
                )}
            </div>

            <WorkPostChatModal />
        </div>
    );
}
