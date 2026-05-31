import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const BOOKINGS_URL = `${API}/bookings`;

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Worker')}&background=1565c0&color=fff&size=256&bold=true`;

const statusConfig = {
  pending: {
    tab: 'Upcoming',
    label: 'Scheduled',
    color: 'primary',
    icon: 'event_available',
    etaLabel: 'Scheduled For',
  },
  accepted: {
    tab: 'Active',
    label: 'Accepted',
    color: 'primary',
    icon: 'pulse',
    etaLabel: 'Scheduled For',
  },
  on_the_way: {
    tab: 'Active',
    label: 'Arriving Soon',
    color: 'secondary',
    icon: 'speed',
    etaLabel: 'ETA',
  },
  in_progress: {
    tab: 'Active',
    label: 'In Progress',
    color: 'tertiary',
    icon: 'pulse',
    etaLabel: 'Est. Completion',
  },
  rescheduled: {
    tab: 'Rescheduled',
    label: 'Rescheduled',
    color: 'primary',
    icon: 'event_repeat',
    etaLabel: 'New Schedule',
  },
};

const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  });
};

const formatMoney = (amount) => `Rs.${amount || 0}`;

const mapBooking = (booking) => {
  const config = statusConfig[booking.status] || statusConfig.pending;

  return {
    id: booking.id,
    tab: config.tab,
    status: config.label,
    statusColor: config.color,
    statusIcon: config.icon,
    title: booking.serviceName,
    orderId: booking.bookingCode || booking.id,
    location: booking.address?.city || booking.address?.address || 'Service address',
    etaLabel: config.etaLabel,
    etaValue: booking.status === 'on_the_way' ? '15 Minutes' : `${formatDate(booking.scheduledDate)} ${booking.timeSlot}`,
    etaColor: config.color,
    progress: booking.status === 'in_progress' ? 70 : undefined,
    worker: {
      name: booking.worker?.name || 'Worker',
      img: booking.worker?.profileImage || avatarUrl(booking.worker?.name),
      rating: booking.worker?.avgRating || 0,
      services: `${booking.worker?.jobsDone || 0}+ services`,
      role: booking.worker?.primaryService || booking.serviceName,
      online: ['on_the_way', 'in_progress'].includes(booking.status),
      showCall: true,
      showChat: true,
    },
    primaryAction: booking.status === 'on_the_way' ? 'Track Order' : undefined,
    details: {
      scope: [
        { text: booking.workDescription || `${booking.serviceName} service`, done: booking.status !== 'pending' },
        { text: `Scheduled at ${booking.timeSlot}`, done: true },
        { text: 'Service completion confirmation', done: booking.status === 'completed' },
      ],
      pricing: [
        { label: `Labor (${booking.estimatedHours || 1} hrs)`, amount: formatMoney((booking.hourlyRate || 0) * (booking.estimatedHours || 1)) },
        { label: `Workers (${booking.workerCount || 1})`, amount: `${booking.workerCount || 1}` },
      ],
      total: formatMoney(booking.estimatedAmount),
    },
    raw: booking,
  };
};

export const fetchCurrentBookings = createAsyncThunk(
  'currentBookings/fetchCurrentBookings',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BOOKINGS_URL}/current`);
      return {
        counts: data.counts,
        bookings: data.bookings.map(mapBooking),
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch current bookings.');
    }
  }
);

const currentBookingSlice = createSlice({
  name: 'currentBookings',
  initialState: {
    bookings: [],
    counts: {
      active: 0,
      upcoming: 0,
      rescheduled: 0,
      total: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.counts = action.payload.counts;
      })
      .addCase(fetchCurrentBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default currentBookingSlice.reducer;
