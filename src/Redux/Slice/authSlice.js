// src/Redux/Slice/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ FIX 1: Hardcoded URL hata ke env variable use karo
const BASE_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/auth`
    : 'https://your-api.example.com/api/auth';

/* ── Storage helpers ── */
const getStoredToken = () =>
    localStorage.getItem('hl_token') || sessionStorage.getItem('hl_token') || null;

const getStoredUser = () => {
    try {
        const raw = localStorage.getItem('hl_user') || sessionStorage.getItem('hl_user');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

// ✅ FIX 2: Agar token already stored hai toh axios ko globally set karo
// (app startup pe hi token headers mein rahega)
const storedToken = getStoredToken();
if (storedToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
}

/* ── Thunks ── */

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ identifier, password, remember, role }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/login`, {
                identifier,
                password,
                remember,
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

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ fullName, email, phone, password, otp, role }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/register`, {
                fullName,
                email,
                phone,
                password,
                otp,
                role,
            });
            return { ...data, remember: false };
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Something went wrong. Please try again.'
            );
        }
    }
);

export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async ({ email }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/send-otp`, { email });
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || 'Failed to send OTP. Please try again.'
            );
        }
    }
);

/* ── Slice ── */

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
        logout(state) {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;

            localStorage.removeItem('hl_token');
            localStorage.removeItem('hl_user');
            sessionStorage.removeItem('hl_token');
            sessionStorage.removeItem('hl_user');

            // ✅ FIX 3: Logout pe axios header bhi clear karo
            delete axios.defaults.headers.common['Authorization'];
        },
        clearError(state) {
            state.error = null;
            state.otpError = null;
        },
    },
    extraReducers: (builder) => {

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

                // ✅ FIX 4: Token milne ke baad axios header set karo — baaki API calls ke liye
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                if (remember) {
                    localStorage.setItem('hl_token', token);
                    localStorage.setItem('hl_user', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('hl_token', token);
                    sessionStorage.setItem('hl_user', JSON.stringify(user));
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

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

                // ✅ FIX 4: Register ke baad bhi axios header set karo
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
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;