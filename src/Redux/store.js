import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import addressReducer from './Slice/addressSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        address: addressReducer,
    },
});

export default store;