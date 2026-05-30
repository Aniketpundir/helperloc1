import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const USERS_URL = `${API}/users`;

const getErrorMessage = (error, fallback) =>
    error.response?.data?.message || fallback;

export const fetchUserProfile = createAsyncThunk(
    'userProfile/fetchUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${USERS_URL}/me`);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to load profile.'));
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'userProfile/updateUserProfile',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${USERS_URL}/me`, payload);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to update profile.'));
        }
    }
);

export const uploadUserProfileImage = createAsyncThunk(
    'userProfile/uploadUserProfileImage',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('profileImage', file);
            const { data } = await axios.patch(`${USERS_URL}/me/profile-image`, formData);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to upload profile image.'));
        }
    }
);

export const removeUserProfileImage = createAsyncThunk(
    'userProfile/removeUserProfileImage',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${USERS_URL}/me/profile-image`);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to remove profile image.'));
        }
    }
);

export const addUserAddress = createAsyncThunk(
    'userProfile/addUserAddress',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${USERS_URL}/me/addresses`, payload);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to add address.'));
        }
    }
);

export const updateUserAddress = createAsyncThunk(
    'userProfile/updateUserAddress',
    async ({ addressId, payload }, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`${USERS_URL}/me/addresses/${addressId}`, payload);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to update address.'));
        }
    }
);

export const deleteUserAddress = createAsyncThunk(
    'userProfile/deleteUserAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${USERS_URL}/me/addresses/${addressId}`);
            return data.user;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Failed to delete address.'));
        }
    }
);

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        profile: null,
        loading: false,
        saving: false,
        error: null,
    },
    reducers: {
        clearUserProfileError(state) {
            state.error = null;
        },
        clearUserProfile(state) {
            state.profile = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        [
            updateUserProfile,
            uploadUserProfileImage,
            removeUserProfileImage,
            addUserAddress,
            updateUserAddress,
            deleteUserAddress,
        ].forEach((thunk) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.saving = true;
                    state.error = null;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.saving = false;
                    state.profile = action.payload;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.saving = false;
                    state.error = action.payload;
                });
        });
    },
});

export const { clearUserProfile, clearUserProfileError } = userProfileSlice.actions;
export default userProfileSlice.reducer;
