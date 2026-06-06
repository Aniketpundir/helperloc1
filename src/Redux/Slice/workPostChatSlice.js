import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const CHATS_URL = `${API}/chats`;

export const fetchRecentWorkPostChats = createAsyncThunk(
    'workPostChat/fetchRecentWorkPostChats',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(CHATS_URL);
            return data.chats;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch recent chats.');
        }
    }
);

export const openExistingWorkPostChat = createAsyncThunk(
    'workPostChat/openExistingWorkPostChat',
    async (chatId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${CHATS_URL}/${chatId}`);
            return data.chat;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to open chat.');
        }
    }
);

export const openWorkPostChat = createAsyncThunk(
    'workPostChat/openWorkPostChat',
    async ({ workPostId, participantUserId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${CHATS_URL}/work-posts/${workPostId}/start`, {
                participantUserId,
            });

            return data.chat;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to open chat.');
        }
    }
);

export const sendWorkPostChatMessage = createAsyncThunk(
    'workPostChat/sendWorkPostChatMessage',
    async ({ chatId, text }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${CHATS_URL}/${chatId}/messages`, { text });
            return data.chat;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send message.');
        }
    }
);

const workPostChatSlice = createSlice({
    name: 'workPostChat',
    initialState: {
        recentChats: [],
        chat: null,
        draft: '',
        recentLoading: false,
        loading: false,
        sending: false,
        error: null,
        isOpen: false,
    },
    reducers: {
        closeWorkPostChat(state) {
            state.chat = null;
            state.draft = '';
            state.error = null;
            state.isOpen = false;
        },
        setWorkPostChatDraft(state, action) {
            state.draft = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(openWorkPostChat.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isOpen = true;
            })
            .addCase(openWorkPostChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chat = action.payload;
            })
            .addCase(openWorkPostChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(openExistingWorkPostChat.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isOpen = true;
            })
            .addCase(openExistingWorkPostChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chat = action.payload;
            })
            .addCase(openExistingWorkPostChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRecentWorkPostChats.pending, (state) => {
                state.recentLoading = true;
                state.error = null;
            })
            .addCase(fetchRecentWorkPostChats.fulfilled, (state, action) => {
                state.recentLoading = false;
                state.recentChats = action.payload;
            })
            .addCase(fetchRecentWorkPostChats.rejected, (state, action) => {
                state.recentLoading = false;
                state.error = action.payload;
            })
            .addCase(sendWorkPostChatMessage.pending, (state) => {
                state.sending = true;
                state.error = null;
            })
            .addCase(sendWorkPostChatMessage.fulfilled, (state, action) => {
                state.sending = false;
                state.chat = action.payload;
                state.recentChats = state.recentChats.map((chat) =>
                    chat.id === action.payload.id ? action.payload : chat
                );
                state.draft = '';
            })
            .addCase(sendWorkPostChatMessage.rejected, (state, action) => {
                state.sending = false;
                state.error = action.payload;
            });
    },
});

export const { closeWorkPostChat, setWorkPostChatDraft } = workPostChatSlice.actions;
export default workPostChatSlice.reducer;
