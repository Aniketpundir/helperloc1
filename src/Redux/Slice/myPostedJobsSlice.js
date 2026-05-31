import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORK_POSTS_URL = `${API}/work-posts`;

const iconFromWorkerType = (workerType = '') => {
    const type = workerType.toLowerCase();
    if (type.includes('electric')) return 'electric_bolt';
    if (type.includes('clean')) return 'cleaning_services';
    if (type.includes('plumb')) return 'plumbing';
    if (type.includes('ac')) return 'ac_unit';
    if (type.includes('carpent')) return 'carpenter';
    if (type.includes('paint')) return 'format_paint';
    return 'home_repair_service';
};

const avatarFor = (name = 'Worker') =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1565c0&color=fff&size=128&bold=true`;

const formatBudget = (min, max) => {
    if (min == null && max == null) return 'Budget not set';
    if (min === max || max == null) return `Rs.${min}`;
    return `Rs.${min} - Rs.${max}`;
};

const formatPostedAt = (date) => {
    const created = new Date(date);
    const diffMs = Date.now() - created.getTime();
    const minutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    return created.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const normalizeStatus = (status) => (['open', 'assigned'].includes(status) ? 'active' : 'closed');

const mapApplicant = (applicant) => ({
    id: applicant.id,
    name: applicant.name || 'Worker',
    rating: applicant.rating || 0,
    reviews: applicant.reviews || 0,
    experience: `${applicant.experience || 0} years`,
    image: applicant.image || avatarFor(applicant.name),
    skills: applicant.skills?.length ? applicant.skills : ['General Service'],
    available: applicant.available || 'Availability not shared',
    verified: !!applicant.verified,
    quotedAmount: applicant.quotedAmount,
    status: applicant.status,
});

const mapJob = (post) => {
    const applications = post.applications || [];

    return {
        id: post.id,
        workerType: post.workerType,
        icon: iconFromWorkerType(post.workerType),
        title: post.title,
        address: post.address || post.city || 'Address not added',
        urgency: post.urgency,
        postedAt: formatPostedAt(post.createdAt),
        status: normalizeStatus(post.status),
        rawStatus: post.status,
        budget: formatBudget(post.budgetMin, post.budgetMax),
        applicants: applications.map(mapApplicant),
        applicantsCount: post.applicationsCount ?? applications.length,
    };
};

export const fetchMyPostedJobs = createAsyncThunk(
    'myPostedJobs/fetchMyPostedJobs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${WORK_POSTS_URL}/my`, {
                params: { limit: 50 },
            });

            return data.posts.map(mapJob);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch posted jobs.');
        }
    }
);

const myPostedJobsSlice = createSlice({
    name: 'myPostedJobs',
    initialState: {
        jobs: [],
        activeFilter: 'All',
        loading: false,
        error: null,
    },
    reducers: {
        setMyPostedJobsFilter(state, action) {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyPostedJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyPostedJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchMyPostedJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setMyPostedJobsFilter } = myPostedJobsSlice.actions;
export default myPostedJobsSlice.reducer;
