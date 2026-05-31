import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORKERS_URL = `${API}/workers`;

const avatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Worker')}&background=1565c0&color=fff&size=256&bold=true`;

const mapWorkerDetail = (worker) => {
    const fullName = worker.user?.fullName || 'Worker';
    const service = worker.primaryService || worker.services?.[0]?.name || 'General Service';
    const skills = worker.services?.filter((item) => item.isActive).map((item) => item.name) || [];

    return {
        id: worker._id,
        name: fullName,
        category: service,
        image: worker.profileImage || worker.user?.profileImage || avatarUrl(fullName),
        rating: worker.avgRating || 0,
        reviews: worker.jobsDone || 0,
        location: [worker.city, worker.country].filter(Boolean).join(', ') || 'India',
        experience: `${worker.yearsOfExperience || 0} Years`,
        rate: `₹${worker.hourlyRate || 0}/hr`,
        hourlyRate: worker.hourlyRate || 0,
        avgTime: '1.5 hrs',
        jobsDone: worker.jobsDone || 0,
        skills: skills.length > 0 ? skills : [service],
        about: `${fullName} provides ${service.toLowerCase()} services with ${worker.yearsOfExperience || 0} years of experience.`,
        verified: !!worker.isVerified,
        phone: worker.user?.phone || '',
        raw: worker,
    };
};

export const fetchWorkerDetail = createAsyncThunk(
    'workerDetail/fetchWorkerDetail',
    async (workerId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${WORKERS_URL}/${workerId}`);
            return mapWorkerDetail(data.worker);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch worker details.');
        }
    }
);

const workerDetailSlice = createSlice({
    name: 'workerDetail',
    initialState: {
        worker: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearWorkerDetail(state) {
            state.worker = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkerDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkerDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.worker = action.payload;
            })
            .addCase(fetchWorkerDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWorkerDetail } = workerDetailSlice.actions;
export default workerDetailSlice.reducer;
