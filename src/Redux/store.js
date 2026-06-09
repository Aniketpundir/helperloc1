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
import workPostChatReducer from './Slice/workPostChatSlice';
import appliedWorkReducer from './Slice/appliedWorkSlice';
import workerDashboardReducer from './Slice/workerDashboardSlice';
import pastBookingReducer from './Slice/pastBookingSlice';
import clientReviewsReducer from './Slice/clientReviewsSlice';

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
    workPostChat: workPostChatReducer,
    appliedWork: appliedWorkReducer,
    workerDashboard: workerDashboardReducer,
    pastBookings: pastBookingReducer,
    clientReviews: clientReviewsReducer,
  },
});

export default store;
