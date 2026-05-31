import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import userProfileReducer from './Slice/userProfileSlice';
import addressReducer from './Slice/addressSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    address: addressReducer,
  },
});

export default store;
