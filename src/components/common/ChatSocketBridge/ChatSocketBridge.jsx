import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
    applySocketChatUpdate,
    refreshOpenWorkPostChat,
} from '../../../Redux/Slice/workPostChatSlice';

const API = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');

export default function ChatSocketBridge() {
    const dispatch = useDispatch();
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const { chat: openChat, isOpen } = useSelector((state) => state.workPostChat);

    useEffect(() => {
        if (!isAuthenticated || !token) return undefined;

        const socket = io(API, {
            auth: { token },
            transports: ['websocket', 'polling'],
        });

        socket.on('chat:updated', (chat) => {
            dispatch(applySocketChatUpdate(chat));

            if (isOpen && openChat?.id === chat.id && Number(chat.unreadCount || 0) > 0) {
                dispatch(refreshOpenWorkPostChat(chat.id));
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch, isAuthenticated, token, isOpen, openChat?.id]);

    return null;
}
