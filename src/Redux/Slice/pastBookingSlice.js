import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import PlumberImage from '../../assets/Plumber.png';
import ElectricianImage from '../../assets/Electrician.png';
import CleaningImage from '../../assets/House_Cleaning.png';
import AcRepairImage from '../../assets/AC_Repair.png';
import CarpentryImage from '../../assets/Carpentry.png';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const BOOKINGS_URL = `${API}/bookings`;

const HISTORY_STATUSES = ['completed', 'cancelled', 'rejected', 'rescheduled'];

const formatDate = (date, timeSlot) => {
  if (!date) return timeSlot || 'Schedule not available';

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return [formattedDate, timeSlot].filter(Boolean).join(' • ');
};

const formatMoney = (amount = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const getWorkerUser = (booking) => booking.worker?.user || {};

const getServiceImage = (serviceName = '') => {
  const service = serviceName.toLowerCase();

  if (service.includes('electric')) return ElectricianImage;
  if (service.includes('plumb')) return PlumberImage;
  if (service.includes('clean')) return CleaningImage;
  if (service.includes('ac') || service.includes('air')) return AcRepairImage;
  if (service.includes('carpent') || service.includes('wood')) return CarpentryImage;

  return CleaningImage;
};

const mapBooking = (booking) => {
  const workerUser = getWorkerUser(booking);
  const workerName = workerUser.fullName || 'Worker';
  const status = booking.status === 'rejected' ? 'cancelled' : booking.status;

  return {
    id: booking._id,
    status,
    rawStatus: booking.status,
    image: getServiceImage(booking.serviceName),
    imageAlt: booking.serviceName,
    title: booking.serviceName,
    workerName,
    date: formatDate(booking.scheduledDate, booking.timeSlot),
    price: formatMoney(booking.estimatedAmount),
    paymentNote: booking.paymentStatus ? `Payment: ${booking.paymentStatus}` : '',
    review: booking.status === 'completed' ? booking.workDescription : '',
    cancelReason: booking.cancellationReason || `Booking ${booking.status}`,
    refundStatus: booking.paymentStatus === 'refunded' ? 'Processed to original payment method.' : '',
    serviceName: booking.serviceName,
    createdAt: booking.createdAt,
  };
};

const calculateStats = (bookings) => {
  const completed = bookings.filter((booking) => booking.status === 'completed');
  const uniqueWorkers = new Set(bookings.map((booking) => booking.workerName).filter(Boolean));

  return {
    completed: completed.length,
    totalSpent: completed.reduce((sum, booking) => {
      const amount = Number(String(booking.price).replace(/[^\d.]/g, '')) || 0;
      return sum + amount;
    }, 0),
    averageRating: 0,
    uniqueWorkers: uniqueWorkers.size,
  };
};

export const fetchPastBookings = createAsyncThunk(
  'pastBookings/fetchPastBookings',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BOOKINGS_URL}/my`, {
        params: { limit: 50 },
      });

      const bookings = (data.bookings || [])
        .filter((booking) => HISTORY_STATUSES.includes(booking.status))
        .map(mapBooking);

      return {
        bookings,
        stats: calculateStats(bookings),
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking history.');
    }
  }
);

const pastBookingSlice = createSlice({
  name: 'pastBookings',
  initialState: {
    bookings: [],
    stats: {
      completed: 0,
      totalSpent: 0,
      averageRating: 0,
      uniqueWorkers: 0,
    },
    loading: false,
    error: null,
    filter: 'All Services',
  },
  reducers: {
    setPastBookingFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.stats = action.payload.stats;
      })
      .addCase(fetchPastBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPastBookingFilter } = pastBookingSlice.actions;
export default pastBookingSlice.reducer;
