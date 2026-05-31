import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const BOOKINGS_URL = `${API}/bookings`;

const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Worker')}&background=1565c0&color=fff&size=256&bold=true`;

const formatDate = (date) => {
    if (!date) return 'Not scheduled';

    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

const formatMoney = (amount) => `Rs.${amount || 0}`;

const getTimeline = (booking) => {
    const status = booking.status;
    const acceptedStatuses = ['accepted', 'on_the_way', 'in_progress', 'completed'];
    const onTheWayStatuses = ['on_the_way', 'in_progress', 'completed'];

    return [
        {
            label: 'Booking Placed',
            desc: `Booking ${booking.bookingCode || booking._id} created successfully`,
            done: true,
        },
        {
            label: 'Worker Notified',
            desc: 'Worker has received your booking request',
            done: true,
        },
        {
            label: 'Accepted',
            desc: 'Worker accepts the booking',
            done: acceptedStatuses.includes(status),
        },
        {
            label: 'On The Way',
            desc: `Scheduled for ${formatDate(booking.scheduledDate)} at ${booking.timeSlot}`,
            done: onTheWayStatuses.includes(status),
        },
        {
            label: 'Completed',
            desc: 'Service completed at your address',
            done: status === 'completed',
        },
    ];
};

const mapBookingDetails = (booking) => {
    const workerProfile = booking.worker;
    const workerUser = workerProfile?.user;
    const workerName = workerUser?.fullName || 'Worker';
    const hourlyRate = booking.hourlyRate || workerProfile?.hourlyRate || 0;
    const estimatedHours = booking.estimatedHours || 1;
    const workerCount = booking.workerCount || 1;

    return {
        id: booking._id,
        bookingId: booking.bookingCode ? `#${booking.bookingCode}` : `#${booking._id}`,
        worker: {
            name: workerName,
            service: booking.serviceName || workerProfile?.primaryService || 'General Service',
            rating: workerProfile?.avgRating || 0,
            reviews: workerProfile?.jobsDone || 0,
            location: [workerProfile?.city, workerProfile?.country].filter(Boolean).join(', ') || 'India',
            experience: `${workerProfile?.yearsOfExperience || 0} years`,
            rate: `${formatMoney(hourlyRate)} / hour`,
            image: workerProfile?.profileImage || workerUser?.profileImage || avatarUrl(workerName),
            badges: workerProfile?.isVerified ? ['Verified Worker'] : [],
            verified: !!workerProfile?.isVerified,
        },
        details: {
            date: formatDate(booking.scheduledDate),
            time: booking.timeSlot,
            workers: `${workerCount} Professional${workerCount > 1 ? 's' : ''}`,
            phone: workerUser?.phone || 'Not available',
            address: booking.address?.address || 'Address not available',
            workNeeded: booking.workDescription || 'No work description added.',
        },
        payment: {
            rateLabel: `Hourly Rate (${formatMoney(hourlyRate)} x ${workerCount} worker${workerCount > 1 ? 's' : ''})`,
            rateValue: `${formatMoney(hourlyRate)}/hr`,
            durationLabel: 'Estimated Duration',
            durationValue: `${estimatedHours} Hour${estimatedHours > 1 ? 's' : ''}`,
            totalLabel: 'Est. Total Amount',
            totalValue: formatMoney(booking.estimatedAmount),
        },
        timeline: getTimeline(booking),
        raw: booking,
    };
};

export const fetchBookingDetails = createAsyncThunk(
    'bookingDetail/fetchBookingDetails',
    async (bookingId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BOOKINGS_URL}/${bookingId}`);
            return mapBookingDetails(data.booking);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking details.');
        }
    }
);

export const fetchLatestBookingDetails = createAsyncThunk(
    'bookingDetail/fetchLatestBookingDetails',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BOOKINGS_URL}/my`, {
                params: { page: 1, limit: 1 },
            });

            if (!data.bookings?.length) {
                return rejectWithValue('No booking found.');
            }

            return mapBookingDetails(data.bookings[0]);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch latest booking.');
        }
    }
);

const bookingDetailSlice = createSlice({
    name: 'bookingDetail',
    initialState: {
        booking: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearBookingDetail(state) {
            state.booking = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        [fetchBookingDetails, fetchLatestBookingDetails].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.booking = action.payload;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        });
    },
});

export const { clearBookingDetail } = bookingDetailSlice.actions;
export default bookingDetailSlice.reducer;
