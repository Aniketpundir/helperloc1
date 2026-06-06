import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORK_POSTS_URL = `${API}/work-posts`;

const categoryMeta = (workerType = '') => {
    const type = workerType.toLowerCase();

    if (type.includes('electric')) {
        return { categoryIcon: 'electric_bolt', categoryColor: 'primary', category: 'Electrician' };
    }
    if (type.includes('plumb')) {
        return { categoryIcon: 'plumbing', categoryColor: 'secondary', category: 'Plumber' };
    }
    if (type.includes('clean')) {
        return { categoryIcon: 'cleaning_services', categoryColor: 'tertiary', category: 'Cleaner' };
    }
    if (type.includes('carpent')) {
        return { categoryIcon: 'carpenter', categoryColor: 'primary', category: 'Carpenter' };
    }
    if (type.includes('ac')) {
        return { categoryIcon: 'ac_unit', categoryColor: 'secondary', category: 'AC Repair' };
    }

    return { categoryIcon: 'home_repair_service', categoryColor: 'primary', category: workerType || 'Service' };
};

const formatDate = (date) => {
    if (!date) return 'Flexible date';

    return new Date(date).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const mapWorkPost = (post) => ({
    id: post.id,
    ...categoryMeta(post.workerType),
    categoryEmoji: '',
    urgency: post.urgency,
    title: post.title,
    description: post.description,
    location: post.city || post.address || 'Location not added',
    fullAddress: post.address,
    date: formatDate(post.preferredDateTime),
    workersNeeded: post.workersNeeded || 1,
    budgetMin: post.budgetMin?.toLocaleString('en-IN') || '0',
    budgetMax: post.budgetMax?.toLocaleString('en-IN') || '0',
    workerType: post.workerType,
    hasApplied: !!post.hasApplied,
    applicationStatus: post.myApplication?.status || null,
    clientUserId: post.user?.id || post.user?._id || post.user,
    clientName: post.user?.fullName || 'Client',
    raw: post,
});

export const fetchAvailableWork = createAsyncThunk(
    'availableWork/fetchAvailableWork',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { filters, page, limit } = getState().availableWork;
            const params = Object.fromEntries(
                Object.entries({
                    ...filters,
                    page,
                    limit,
                    status: 'open',
                }).filter(([, value]) => value !== '')
            );

            const { data } = await axios.get(`${WORK_POSTS_URL}/available`, {
                params,
            });

            return {
                posts: data.posts.map(mapWorkPost),
                counts: data.counts,
                pagination: data.pagination,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch available work.');
        }
    }
);

export const applyToAvailableWork = createAsyncThunk(
    'availableWork/applyToAvailableWork',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${WORK_POSTS_URL}/${postId}/apply`, {
                message: 'I am interested in this job and available to discuss the details.',
            });

            return mapWorkPost(data.post);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to apply for this job.');
        }
    }
);

export const withdrawAvailableWorkApplication = createAsyncThunk(
    'availableWork/withdrawAvailableWorkApplication',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${WORK_POSTS_URL}/${postId}/apply/withdraw`);
            return mapWorkPost(data.post);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to withdraw application.');
        }
    }
);

export const fetchAvailableWorkDetails = createAsyncThunk(
    'availableWork/fetchAvailableWorkDetails',
    async (postId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${WORK_POSTS_URL}/${postId}`);
            return mapWorkPost(data.post);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch work details.');
        }
    }
);

const initialFilters = {
    workerType: 'all',
    urgency: 'all',
    budgetMin: '',
    budgetMax: '',
};

const availableWorkSlice = createSlice({
    name: 'availableWork',
    initialState: {
        posts: [],
        counts: {
            total: 0,
            urgent: 0,
            nearYou: 0,
        },
        filters: initialFilters,
        page: 1,
        limit: 3,
        pagination: {
            total: 0,
            page: 1,
            limit: 3,
            totalPages: 1,
        },
        selectedPost: null,
        loading: false,
        detailsLoading: false,
        actionLoadingId: null,
        error: null,
    },
    reducers: {
        setAvailableWorkFilters(state, action) {
            state.filters = {
                ...initialFilters,
                ...action.payload,
                budgetMin: action.payload?.budgetMin || '',
                budgetMax: action.payload?.budgetMax || '',
            };
            state.page = 1;
        },
        resetAvailableWorkFilters(state) {
            state.filters = initialFilters;
            state.page = 1;
        },
        setAvailableWorkPage(state, action) {
            state.page = action.payload;
        },
        clearAvailableWorkDetails(state) {
            state.selectedPost = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableWork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAvailableWork.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts;
                state.counts = action.payload.counts;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchAvailableWork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAvailableWorkDetails.pending, (state) => {
                state.detailsLoading = true;
                state.error = null;
            })
            .addCase(fetchAvailableWorkDetails.fulfilled, (state, action) => {
                state.detailsLoading = false;
                state.selectedPost = action.payload;
            })
            .addCase(fetchAvailableWorkDetails.rejected, (state, action) => {
                state.detailsLoading = false;
                state.error = action.payload;
            });

        [applyToAvailableWork, withdrawAvailableWorkApplication].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state, action) => {
                    state.actionLoadingId = action.meta.arg;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.actionLoadingId = null;
                    state.posts = state.posts.map((post) =>
                        post.id === action.payload.id ? action.payload : post
                    );
                    if (state.selectedPost?.id === action.payload.id) {
                        state.selectedPost = action.payload;
                    }
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.actionLoadingId = null;
                    state.error = action.payload;
                });
        });
    },
});

export const {
    clearAvailableWorkDetails,
    resetAvailableWorkFilters,
    setAvailableWorkFilters,
    setAvailableWorkPage,
} = availableWorkSlice.actions;

export default availableWorkSlice.reducer;
