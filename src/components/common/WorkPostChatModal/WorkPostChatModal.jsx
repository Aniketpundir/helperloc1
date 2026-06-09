import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    closeWorkPostChat,
    sendWorkPostChatMessage,
    setWorkPostChatDraft,
} from '../../../Redux/Slice/workPostChatSlice';
import './WorkPostChatModal.css';

const avatarFor = (name = 'User') =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1565c0&color=fff&size=96&bold=true`;

function DeliveryTicks({ status }) {
    if (!status) return null;

    if (status === 'sent') {
        return <span className="material-symbols-outlined wpc-ticks wpc-ticks--sent">check</span>;
    }

    return (
        <span className={`wpc-double-tick${status === 'seen' ? ' wpc-double-tick--seen' : ''}`} aria-label={status}>
            <span className="material-symbols-outlined">check</span>
            <span className="material-symbols-outlined wpc-double-tick__second">check</span>
        </span>
    );
}

export default function WorkPostChatModal() {
    const dispatch = useDispatch();
    const bottomRef = useRef(null);
    const [showWorkDetails, setShowWorkDetails] = useState(false);
    const { chat, draft, loading, sending, error, isOpen } = useSelector((state) => state.workPostChat);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat?.messages?.length, loading]);

    if (!isOpen) return null;

    const handleSend = () => {
        if (!chat?.id || !draft.trim() || sending) return;

        dispatch(sendWorkPostChatMessage({
            chatId: chat.id,
            text: draft,
        }));
    };

    const work = chat?.workPost;
    const formattedDate = work?.preferredDateTime
        ? new Date(work.preferredDateTime).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'Flexible date';

    return (
        <div className="wpc-modal" onClick={() => dispatch(closeWorkPostChat())}>
            <div className="wpc-modal__card" onClick={(event) => event.stopPropagation()}>
                <div className="wpc-modal__header">
                    <img
                        className="wpc-modal__avatar"
                        src={chat?.peer?.profileImage || avatarFor(chat?.peer?.fullName)}
                        alt={chat?.peer?.fullName || 'Chat user'}
                    />
                    <div>
                        <p className="wpc-modal__name">{chat?.peer?.fullName || 'Opening chat...'}</p>
                        <p className="wpc-modal__subtitle">{chat?.workPost?.title || 'Work post chat'}</p>
                    </div>
                    <button className="wpc-modal__close" onClick={() => dispatch(closeWorkPostChat())}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {!loading && work && (
                    <div className="wpc-work">
                        <button
                            className="wpc-work__toggle"
                            onClick={() => setShowWorkDetails((prev) => !prev)}
                        >
                            <span className="material-symbols-outlined">work</span>
                            <span>Chat opened for: <strong>{work.title}</strong></span>
                            <span className="material-symbols-outlined">
                                {showWorkDetails ? 'expand_less' : 'expand_more'}
                            </span>
                        </button>

                        {showWorkDetails && (
                            <div className="wpc-work__details">
                                <span><strong>Type:</strong> {work.workerType || 'Service'}</span>
                                <span><strong>Status:</strong> {work.status || 'open'}</span>
                                <span><strong>Urgency:</strong> {work.urgency || 'flexible'}</span>
                                <span><strong>Date:</strong> {formattedDate}</span>
                                <span><strong>Address:</strong> {work.address || work.city || 'Not added'}</span>
                                <span><strong>Budget:</strong> Rs.{work.budgetMin || 0} - Rs.{work.budgetMax || 0}</span>
                                <span><strong>Workers:</strong> {work.workersNeeded || 1}</span>
                            </div>
                        )}
                    </div>
                )}

                <div className="wpc-modal__body">
                    {loading ? (
                        <div className="wpc-modal__state">Opening chat...</div>
                    ) : error ? (
                        <div className="wpc-modal__state wpc-modal__state--error">{error}</div>
                    ) : chat?.messages?.length ? (
                        chat.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`wpc-message${message.isMine ? ' wpc-message--mine' : ''}`}
                            >
                                <div className="wpc-message__bubble">{message.text}</div>
                                <span className="wpc-message__time">
                                    {new Date(message.createdAt).toLocaleTimeString('en-IN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    {message.isMine && <DeliveryTicks status={message.deliveryStatus} />}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="wpc-modal__state">
                            No messages yet. Send the first message here.
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                <div className="wpc-modal__input-row">
                    <input
                        className="wpc-modal__input"
                        value={draft}
                        disabled={loading || sending}
                        placeholder="Type your message..."
                        onChange={(event) => dispatch(setWorkPostChatDraft(event.target.value))}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') handleSend();
                        }}
                    />
                    <button
                        className="wpc-modal__send"
                        disabled={loading || sending || !draft.trim()}
                        onClick={handleSend}
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
