import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const REQUESTS_URL = `${API}/bookings/worker/requests`;

const filterToApi = {
    'All Requests': 'all',
    Pending: 'pending',
    Confirmed: 'confirmed',
    Cancelled: 'cancelled',
    Rescheduled: 'rescheduled',
};

const statusToCard = (status) => {
    if (['accepted', 'on_the_way', 'in_progress', 'completed'].includes(status)) return 'confirmed';
    if (['cancelled', 'rejected'].includes(status)) return 'cancelled';
    return status;
};

const priorityFromDate = (date) => {
    const scheduled = new Date(date);
    const diffMs = scheduled.getTime() - Date.now();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours <= 24) return 'urgent';
    if (diffHours <= 72) return 'soon';
    return 'flexible';
};

const iconFromService = (serviceName = '') => {
    const service = serviceName.toLowerCase();
    if (service.includes('electric')) return 'bolt';
    if (service.includes('clean')) return 'cleaning_services';
    if (service.includes('ac')) return 'ac_unit';
    if (service.includes('carpent')) return 'carpenter';
    if (service.includes('paint')) return 'format_paint';
    if (service.includes('plumb') || service.includes('sink')) return 'build';
    return 'home_repair_service';
};

const formatDate = (date, timeSlot) => {
    const formatted = new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return `${formatted}, ${timeSlot}`;
};

const formatMoney = (amount) => `Rs.${amount || 0}`;

const mapRequestToCard = (request) => {
    const status = statusToCard(request.status);

    return {
        id: request.id,
        title: request.serviceName,
        priority: priorityFromDate(request.scheduledDate),
        status,
        icon: iconFromService(request.serviceName),
        iconVariant: status === 'cancelled' ? 'cancelled' : status === 'confirmed' ? 'secondary' : 'primary',
        client: request.client?.name || 'Client',
        location: request.address?.city || request.address?.address || 'Service address',
        date: formatDate(request.scheduledDate, request.timeSlot),
        workers: request.workerCount,
        amountRange: `${formatMoney(request.amountRange?.min)} - ${formatMoney(request.amountRange?.max)}`,
        description: request.workDescription || 'No description added.',
        raw: request,
    };
};

export const fetchWorkerBookingRequests = createAsyncThunk(
    'workerBookingRequests/fetchWorkerBookingRequests',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { activeFilter, page, limit } = getState().workerBookingRequests;
            const { data } = await axios.get(REQUESTS_URL, {
                params: {
                    filter: filterToApi[activeFilter] || 'all',
                    page,
                    limit,
                },
            });

            return {
                requests: data.requests.map(mapRequestToCard),
                counts: data.counts,
                pagination: data.pagination,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking requests.');
        }
    }
);

export const acceptWorkerBookingRequest = createAsyncThunk(
    'workerBookingRequests/acceptWorkerBookingRequest',
    async (requestId, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${REQUESTS_URL}/${requestId}/accept`);
            return mapRequestToCard(data.request);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to accept booking request.');
        }
    }
);

export const declineWorkerBookingRequest = createAsyncThunk(
    'workerBookingRequests/declineWorkerBookingRequest',
    async ({ requestId, reason = '' }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${REQUESTS_URL}/${requestId}/decline`, { reason });
            return mapRequestToCard(data.request);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to decline booking request.');
        }
    }
);

export const rescheduleWorkerBookingRequest = createAsyncThunk(
    'workerBookingRequests/rescheduleWorkerBookingRequest',
    async ({ requestId, scheduledDate, timeSlot, reason = '' }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${REQUESTS_URL}/${requestId}/reschedule`, {
                scheduledDate,
                timeSlot,
                reason,
            });
            return mapRequestToCard(data.request);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to reschedule booking request.');
        }
    }
);

const workerBookingRequestsSlice = createSlice({
    name: 'workerBookingRequests',
    initialState: {
        requests: [],
        counts: {
            total: 0,
            pending: 0,
            confirmed: 0,
            cancelled: 0,
            rescheduled: 0,
        },
        activeFilter: 'All Requests',
        page: 1,
        limit: 4,
        pagination: {
            total: 0,
            page: 1,
            limit: 4,
            totalPages: 1,
        },
        loading: false,
        actionLoading: false,
        error: null,
    },
    reducers: {
        setWorkerBookingFilter(state, action) {
            state.activeFilter = action.payload;
            state.page = 1;
        },
        setWorkerBookingPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkerBookingRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkerBookingRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload.requests;
                state.counts = action.payload.counts;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchWorkerBookingRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        [acceptWorkerBookingRequest, declineWorkerBookingRequest, rescheduleWorkerBookingRequest].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.actionLoading = true;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.actionLoading = false;
                    state.requests = state.requests.map((request) =>
                        request.id === action.payload.id ? action.payload : request
                    );
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.actionLoading = false;
                    state.error = action.payload;
                });
        });
    },
});

export const { setWorkerBookingFilter, setWorkerBookingPage } = workerBookingRequestsSlice.actions;
export default workerBookingRequestsSlice.reducer;
