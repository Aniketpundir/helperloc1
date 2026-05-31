import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const BOOKINGS_URL = `${API}/bookings`;

export const createBooking = createAsyncThunk(
    'bookingCreate/createBooking',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(BOOKINGS_URL, payload);
            return data.booking;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create booking.';
            const detail = error.response?.data?.error;
            return rejectWithValue(detail ? `${message}: ${detail}` : message);
        }
    }
);

const bookingCreateSlice = createSlice({
    name: 'bookingCreate',
    initialState: {
        booking: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCreatedBooking(state) {
            state.booking = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.booking = action.payload;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCreatedBooking } = bookingCreateSlice.actions;
export default bookingCreateSlice.reducer;
