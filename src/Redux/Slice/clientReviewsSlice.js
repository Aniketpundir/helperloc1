import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const REVIEWS_URL = `${API}/reviews`;

const avatarFor = (name = 'Client') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1565c0&color=fff&size=128&bold=true`;

const formatTimeAgo = (date) => {
  if (!date) return 'Recently';

  const diffMs = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? 's' : ''} ago`;
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const mapReview = (review) => {
  const clientName = review.user?.fullName || 'Client';
  const serviceName = review.booking?.serviceName || 'Service';

  return {
    id: review._id,
    name: clientName,
    location: 'HelperLoc client',
    avatar: review.user?.profileImage || avatarFor(clientName),
    time: formatTimeAgo(review.createdAt),
    rating: review.rating,
    tag: serviceName,
    text: review.comment || 'No written review added.',
    jobFor: serviceName,
  };
};

const fallbackSummary = {
  averageRating: 0,
  totalReviews: 0,
  ratingCounts: [5, 4, 3, 2, 1].map((rating) => ({ rating, count: 0, percent: 0 })),
};

export const fetchClientReviews = createAsyncThunk(
  'clientReviews/fetchClientReviews',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${REVIEWS_URL}/me`);

      return {
        reviews: (data.reviews || []).map(mapReview),
        summary: data.summary || fallbackSummary,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch client reviews.');
    }
  }
);

const clientReviewsSlice = createSlice({
  name: 'clientReviews',
  initialState: {
    reviews: [],
    summary: fallbackSummary,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.summary = action.payload.summary;
      })
      .addCase(fetchClientReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientReviewsSlice.reducer;
