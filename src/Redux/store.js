// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import userProfileReducer from './Slice/userProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
