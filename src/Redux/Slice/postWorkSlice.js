import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORK_POSTS_URL = `${API}/work-posts`;

export const createWorkPost = createAsyncThunk(
    'postWork/createWorkPost',
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            Object.entries(payload).forEach(([key, value]) => {
                if (key === 'photos') return;
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            payload.photos?.forEach((file) => {
                formData.append('photos', file);
            });

            const { data } = await axios.post(WORK_POSTS_URL, formData);
            return data.post;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to post work.';
            const detail = error.response?.data?.error;
            return rejectWithValue(detail ? `${message}: ${detail}` : message);
        }
    }
);

const postWorkSlice = createSlice({
    name: 'postWork',
    initialState: {
        post: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearPostedWork(state) {
            state.post = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWorkPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWorkPost.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(createWorkPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPostedWork } = postWorkSlice.actions;
export default postWorkSlice.reducer;
