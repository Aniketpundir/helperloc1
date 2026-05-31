import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORKERS_URL = `${API}/workers`;

const normalizeService = (service) => {
    if (!service || service === 'all') return undefined;
    if (service === 'ac') return 'AC Repair';
    return service;
};

const mapWorkerForCard = (worker) => ({
    id: worker._id,
    name: worker.user?.fullName || 'Worker',
    category: worker.primaryService || worker.services?.[0]?.name || 'General Service',
    image:
        worker.profileImage ||
        worker.user?.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.user?.fullName || 'Worker')}&background=1565c0&color=fff&size=256&bold=true`,
    rating: worker.avgRating || 0,
    reviews: worker.jobsDone || 0,
    location: worker.city || worker.country || 'India',
    experience: worker.yearsOfExperience || 0,
    hourlyRate: worker.hourlyRate || 0,
    skills: worker.services?.filter((service) => service.isActive).map((service) => service.name) || [],
    verified: !!worker.isVerified,
    verificationBadge: worker.isVerified ? 'VERIFIED' : '',
    raw: worker,
});

export const fetchListedWorkers = createAsyncThunk(
    'listedWorkers/fetchListedWorkers',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { filters, page, limit } = getState().listedWorkers;
            const params = {
                page,
                limit,
                sortBy: 'rating',
                order: 'desc',
            };

            const service = normalizeService(filters.serviceType);
            if (service) params.service = service;
            if (filters.location.trim()) params.city = filters.location.trim();
            if (filters.verifiedOnly) params.verified = true;

            const { data } = await axios.get(WORKERS_URL, { params });

            return {
                workers: data.workers.map(mapWorkerForCard),
                pagination: data.pagination,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch workers.');
        }
    }
);

const initialState = {
    workers: [],
    loading: false,
    error: null,
    filters: {
        serviceType: 'all',
        location: '',
        availability: 'today',
        verifiedOnly: true,
    },
    page: 1,
    limit: 12,
    pagination: {
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 1,
    },
};

const listedWorkerSlice = createSlice({
    name: 'listedWorkers',
    initialState,
    reducers: {
        setListedWorkerFilter(state, action) {
            state.filters = {
                ...state.filters,
                ...action.payload,
            };
            state.page = 1;
        },
        resetListedWorkerFilters(state) {
            state.filters = initialState.filters;
            state.page = 1;
        },
        setListedWorkerPage(state, action) {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListedWorkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListedWorkers.fulfilled, (state, action) => {
                state.loading = false;
                state.workers = action.payload.workers;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchListedWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    resetListedWorkerFilters,
    setListedWorkerFilter,
    setListedWorkerPage,
} = listedWorkerSlice.actions;

export default listedWorkerSlice.reducer;
