// src/Redux/Slice/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL.replace(/\/$/, '');
const BASE_URL = `${API}/auth/`;

const REMEMBER_DAYS = 30;
const DEFAULT_DAYS = 7;

const getUserRoles = (user) => {
    if (Array.isArray(user?.roles) && user.roles.length) return user.roles;
    if (user?.role === 'both') return ['user', 'worker'];
    if (user?.role) return [user.role];
    return [];
};

const hasRole = (user, role) => getUserRoles(user).includes(role);

// ✅ Token save with expiry
const saveToStorage = (token, user, remember, authMode = 'user') => {
    const days = remember ? REMEMBER_DAYS : DEFAULT_DAYS;
    const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem('hl_token', token);
    localStorage.setItem('hl_user', JSON.stringify(user));
    localStorage.setItem('hl_expiry', expiry.toString());
    localStorage.setItem('hl_mode', authMode);
};

// ✅ Token get with expiry check
const getStoredToken = () => {
    const token = localStorage.getItem('hl_token');
    const expiry = localStorage.getItem('hl_expiry');
    if (!token || !expiry) return null;
    if (Date.now() > parseInt(expiry)) {
        ['hl_token', 'hl_user', 'hl_expiry'].forEach(k => localStorage.removeItem(k));
        return null;
    }
    return token;
};

const getStoredUser = () => {
    if (!getStoredToken()) return null;
    try {
        const raw = localStorage.getItem('hl_user');
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
};

const getStoredMode = () => {
    if (!getStoredToken()) return 'user';
    return localStorage.getItem('hl_mode') || 'user';
};

const clearStorage = () => {
    ['hl_token', 'hl_user', 'hl_expiry', 'hl_mode'].forEach(k => localStorage.removeItem(k));
};

const storedToken = getStoredToken();
if (storedToken) axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

// ✅ registerUser thunk
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ fullName, email, phone, password, role, otp }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}register`, {
                fullName, email, phone, password, role, otp,
            });
            return { token: data.token, user: data.user, authMode: role || 'user' };
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
    async ({ email, password, remember, role = 'user' }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}login`, {
                email,
                password,
            });

            if (role === 'worker' && !hasRole(data.user, 'worker')) {
                return rejectWithValue('This account is not registered as a worker. Please create a worker profile first.');
            }

            if (role === 'user' && !hasRole(data.user, 'user')) {
                return rejectWithValue('This account does not have user access.');
            }

            return { token: data.token, user: data.user, remember, authMode: role };
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
        authMode: getStoredMode(),
        isAuthenticated: !!getStoredToken(),
        loading: false,
        error: null,
        otpLoading: false,
        otpError: null,
    },
    reducers: {
        setCredentials(state, { payload }) {
            const { token, user, remember, authMode = 'user' } = payload;
            state.token = token;
            state.user = user;
            state.authMode = authMode;
            state.isAuthenticated = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            saveToStorage(token, user, remember, authMode);
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.authMode = 'user';
            state.isAuthenticated = false;
            state.error = null;
            clearStorage();
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
                const { token, user, authMode } = action.payload;
                state.loading = false;
                state.token = token;
                state.user = user;
                state.authMode = authMode;
                state.isAuthenticated = true;
                state.error = null;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // ✅ Register pe default 7 din
                saveToStorage(token, user, false, authMode);
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
                const { token, user, remember, authMode } = action.payload;
                state.loading = false;
                state.token = token;
                state.user = user;
                state.authMode = authMode;
                state.isAuthenticated = true;
                state.error = null;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // ✅ Remember me → 30 din, else → 7 din
                saveToStorage(token, user, remember, authMode);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCredentials, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
