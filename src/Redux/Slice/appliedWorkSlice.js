import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const WORK_POSTS_URL = `${API}/work-posts`;

const categoryIcon = (workerType = '') => {
  const type = workerType.toLowerCase();
  if (type.includes('electric')) return 'bolt';
  if (type.includes('clean')) return 'cleaning_services';
  if (type.includes('plumb')) return 'plumbing';
  if (type.includes('ac')) return 'ac_unit';
  if (type.includes('carpent')) return 'carpenter';
  return 'home_repair_service';
};

const statusFromApplication = (status) => {
  if (status === 'completed') return 'completed';
  if (status === 'accepted') return 'accepted';
  if (status === 'rejected') return 'rejected';
  return 'pending';
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

const formatShortDate = (date) => {
  if (!date) return 'Not available';

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const mapAppliedPost = (post) => {
  const application = post.myApplication || {};
  const status = post.status === 'completed' ? 'completed' : statusFromApplication(application.status);

  return {
    id: post.id,
    status,
    applicationStatus: application.status,
    categoryIcon: categoryIcon(post.workerType),
    category: post.workerType || 'Service',
    title: post.title,
    description: post.description,
    location: post.city || post.address || 'Location not added',
    fullAddress: post.address,
    date: formatDate(post.preferredDateTime),
    workersNeeded: post.workersNeeded || 1,
    appliedDate: formatShortDate(application.appliedAt || post.updatedAt),
    budgetMin: post.budgetMin?.toLocaleString('en-IN') || '0',
    budgetMax: post.budgetMax?.toLocaleString('en-IN') || '0',
    successLabel: 'Project Mila',
    clientUserId: post.user?.id || post.user?._id || post.user,
    raw: post,
  };
};

const filterToApi = {
  all: 'all',
  pending: 'applied',
  accepted: 'accepted',
  rejected: 'rejected',
};

export const fetchAppliedWork = createAsyncThunk(
  'appliedWork/fetchAppliedWork',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filter, page, limit } = getState().appliedWork;
      const { data } = await axios.get(`${WORK_POSTS_URL}/applied`, {
        params: {
          applicationStatus: filterToApi[filter] || 'all',
          page,
          limit,
        },
      });

      return {
        cards: data.posts.map(mapAppliedPost),
        counts: data.counts,
        pagination: data.pagination,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applied work.');
    }
  }
);

export const withdrawAppliedWork = createAsyncThunk(
  'appliedWork/withdrawAppliedWork',
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${WORK_POSTS_URL}/${postId}/apply/withdraw`);
      return mapAppliedPost(data.post);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to withdraw application.');
    }
  }
);

export const requestWorkPostCompletionOtp = createAsyncThunk(
  'appliedWork/requestWorkPostCompletionOtp',
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${WORK_POSTS_URL}/${postId}/complete/request-otp`);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send completion OTP.');
    }
  }
);

export const verifyWorkPostCompletionOtp = createAsyncThunk(
  'appliedWork/verifyWorkPostCompletionOtp',
  async ({ postId, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${WORK_POSTS_URL}/${postId}/complete/verify`, { otp });
      return mapAppliedPost(data.post);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to verify completion OTP.');
    }
  }
);

const appliedWorkSlice = createSlice({
  name: 'appliedWork',
  initialState: {
    cards: [],
    counts: {
      total: 0,
      accepted: 0,
      rejected: 0,
      pending: 0,
    },
    filter: 'all',
    page: 1,
    limit: 20,
    pagination: {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 1,
    },
    loading: false,
    actionLoadingId: null,
    completionLoadingId: null,
    error: null,
  },
  reducers: {
    setAppliedWorkFilter(state, action) {
      state.filter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedWork.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload.cards;
        state.counts = action.payload.counts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAppliedWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(withdrawAppliedWork.pending, (state, action) => {
        state.actionLoadingId = action.meta.arg;
        state.error = null;
      })
      .addCase(withdrawAppliedWork.fulfilled, (state, action) => {
        state.actionLoadingId = null;
        state.cards = state.cards.filter((card) => card.id !== action.payload.id);
        state.counts.total = Math.max(0, state.counts.total - 1);
        if (action.payload.status === 'pending') {
          state.counts.pending = Math.max(0, state.counts.pending - 1);
        }
      })
      .addCase(withdrawAppliedWork.rejected, (state, action) => {
        state.actionLoadingId = null;
        state.error = action.payload;
      })
      .addCase(requestWorkPostCompletionOtp.pending, (state, action) => {
        state.completionLoadingId = action.meta.arg;
        state.error = null;
      })
      .addCase(requestWorkPostCompletionOtp.fulfilled, (state) => {
        state.completionLoadingId = null;
      })
      .addCase(requestWorkPostCompletionOtp.rejected, (state, action) => {
        state.completionLoadingId = null;
        state.error = action.payload;
      })
      .addCase(verifyWorkPostCompletionOtp.pending, (state, action) => {
        state.completionLoadingId = action.meta.arg.postId;
        state.error = null;
      })
      .addCase(verifyWorkPostCompletionOtp.fulfilled, (state, action) => {
        state.completionLoadingId = null;
        state.cards = state.cards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        );
      })
      .addCase(verifyWorkPostCompletionOtp.rejected, (state, action) => {
        state.completionLoadingId = null;
        state.error = action.payload;
      });
  },
});

export const { setAppliedWorkFilter } = appliedWorkSlice.actions;
export default appliedWorkSlice.reducer;
