import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}auth/`;

const getStoredToken = () =>
    localStorage.getItem('hl_token') || sessionStorage.getItem('hl_token') || null;

const getStoredUser = () => {
    try {
        const raw = localStorage.getItem('hl_user') || sessionStorage.getItem('hl_user');
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
};

const storedToken = getStoredToken();
if (storedToken) axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

// ✅ registerUser thunk
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ fullName, email, phone, password, role }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}register`, {
                fullName, email, phone, password, role,
            });
            return { ...data, remember: false };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again.'
            );
        }
    }
);

// ✅ sendOtp thunk
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}send-otp`, { email });
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to send OTP. Please try again.'
            );
        }
    }
);

// ✅ loginUser thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ identifier, password, remember, role }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}login`, {
                identifier,
                password,
                role,
            });
            return { ...data, remember };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Invalid credentials. Please try again.'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: getStoredToken(),
        user: getStoredUser(),
        isAuthenticated: !!getStoredToken(),
        loading: false,
        error: null,
        otpLoading: false,
        otpError: null,
    },
    reducers: {
        setCredentials(state, { payload }) {
            const { token, user, remember } = payload;
            state.token = token;
            state.user = user;
            state.isAuthenticated = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('hl_token', token);
            storage.setItem('hl_user', JSON.stringify(user));
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            ['hl_token', 'hl_user'].forEach(k => {
                localStorage.removeItem(k);
                sessionStorage.removeItem(k);
            });
            delete axios.defaults.headers.common['Authorization'];
        },
        clearError(state) {
            state.error = null;
            state.otpError = null;
        },
    },
    extraReducers: (builder) => {

        /* ── REGISTER ── */
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const { token, user } = action.payload;
                state.loading = false;
                state.token = token;
                state.user = user;
                state.isAuthenticated = true;
                state.error = null;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                sessionStorage.setItem('hl_token', token);
                sessionStorage.setItem('hl_user', JSON.stringify(user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* ── SEND OTP ── */
        builder
            .addCase(sendOtp.pending, (state) => {
                state.otpLoading = true;
                state.otpError = null;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.otpLoading = false;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.otpLoading = false;
                state.otpError = action.payload;
            });

        /* ── LOGIN ── */
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { token, user, remember } = action.payload;
                state.loading = false;
                state.token = token;
                state.user = user;
                state.isAuthenticated = true;
                state.error = null;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const storage = remember ? localStorage : sessionStorage;
                storage.setItem('hl_token', token);
                storage.setItem('hl_user', JSON.stringify(user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCredentials, logout, clearError } = authSlice.actions;
export default authSlice.reducer;