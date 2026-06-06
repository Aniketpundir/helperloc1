import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORKERS_URL = `${API}/workers`;
const WORK_POSTS_URL = `${API}/work-posts`;
const BOOKINGS_URL = `${API}/bookings`;

export const fetchWorkerDashboard = createAsyncThunk(
    'workerDashboard/fetchWorkerDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${WORKERS_URL}/me/dashboard`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch worker dashboard.');
        }
    }
);

export const applyFromWorkerDashboard = createAsyncThunk(
    'workerDashboard/applyFromWorkerDashboard',
    async (postId, { rejectWithValue }) => {
        try {
            await axios.post(`${WORK_POSTS_URL}/${postId}/apply`, {
                message: 'I am interested in this work from my dashboard.',
            });

            return postId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to apply for this work.');
        }
    }
);

export const requestBookingCompletionOtp = createAsyncThunk(
    'workerDashboard/requestBookingCompletionOtp',
    async (bookingId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BOOKINGS_URL}/${bookingId}/complete/request-otp`);
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send completion OTP.');
        }
    }
);

export const verifyBookingCompletionOtp = createAsyncThunk(
    'workerDashboard/verifyBookingCompletionOtp',
    async ({ bookingId, otp }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${BOOKINGS_URL}/${bookingId}/complete/verify`, { otp });
            return data.request;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to verify completion OTP.');
        }
    }
);

const workerDashboardSlice = createSlice({
    name: 'workerDashboard',
    initialState: {
        worker: null,
        stats: [],
        recentBookings: [],
        availableJobs: [],
        loading: false,
        actionLoadingId: null,
        completionLoadingId: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkerDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkerDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.worker = action.payload.worker;
                state.stats = action.payload.stats;
                state.recentBookings = action.payload.recentBookings;
                state.availableJobs = action.payload.availableJobs;
            })
            .addCase(fetchWorkerDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(applyFromWorkerDashboard.pending, (state, action) => {
                state.actionLoadingId = action.meta.arg;
                state.error = null;
            })
            .addCase(applyFromWorkerDashboard.fulfilled, (state, action) => {
                state.actionLoadingId = null;
                state.availableJobs = state.availableJobs.map((job) =>
                    job.id === action.payload ? { ...job, hasApplied: true } : job
                );
            })
            .addCase(applyFromWorkerDashboard.rejected, (state, action) => {
                state.actionLoadingId = null;
                state.error = action.payload;
            })
            .addCase(requestBookingCompletionOtp.pending, (state, action) => {
                state.completionLoadingId = action.meta.arg;
                state.error = null;
            })
            .addCase(requestBookingCompletionOtp.fulfilled, (state) => {
                state.completionLoadingId = null;
            })
            .addCase(requestBookingCompletionOtp.rejected, (state, action) => {
                state.completionLoadingId = null;
                state.error = action.payload;
            })
            .addCase(verifyBookingCompletionOtp.pending, (state, action) => {
                state.completionLoadingId = action.meta.arg.bookingId;
                state.error = null;
            })
            .addCase(verifyBookingCompletionOtp.fulfilled, (state, action) => {
                state.completionLoadingId = null;
                state.recentBookings = state.recentBookings.map((booking) =>
                    booking.id === action.payload.id
                        ? { ...booking, status: 'confirmed', completed: true }
                        : booking
                );
            })
            .addCase(verifyBookingCompletionOtp.rejected, (state, action) => {
                state.completionLoadingId = null;
                state.error = action.payload;
            });
    },
});

export default workerDashboardSlice.reducer;
