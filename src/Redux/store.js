import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import userProfileReducer from './Slice/userProfileSlice';
import addressReducer from './Slice/addressSlice';
import listedWorkerReducer from './Slice/listedWorkerSlice';
import workerDetailReducer from './Slice/workerDetailSlice';
import bookingDetailReducer from './Slice/bookingDetailSlice';
import currentBookingReducer from './Slice/currentBookingSlice';
import bookingCreateReducer from './Slice/bookingCreateSlice';
import workerBookingRequestsReducer from './Slice/workerBookingRequestsSlice';
import postWorkReducer from './Slice/postWorkSlice';
import myPostedJobsReducer from './Slice/myPostedJobsSlice';
import availableWorkReducer from './Slice/availableWorkSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    address: addressReducer,
    listedWorkers: listedWorkerReducer,
    workerDetail: workerDetailReducer,
    bookingDetail: bookingDetailReducer,
    currentBookings: currentBookingReducer,
    bookingCreate: bookingCreateReducer,
    workerBookingRequests: workerBookingRequestsReducer,
    postWork: postWorkReducer,
    myPostedJobs: myPostedJobsReducer,
    availableWork: availableWorkReducer,
  },
});

export default store;
