// src/App.jsx
import { lazy, Suspense } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './components/user_section/Layout_User/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicOnlyRoute from './components/Auth/PublicOnlyRoute';
import SEO from './seo/SEO';
import { createPageTitle } from './seo/seoData';

const Home = lazy(() => import('./pages/Home/Home'));
const HowItWorks = lazy(() => import('./pages/HowItWorks/HowItWorks'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const ServiceLocation = lazy(() => import('./pages/ServiceLocation/ServiceLocation'));
const LegalPage = lazy(() => import('./pages/Legal/LegalPage'));
const RegisterForm = lazy(() => import('./components/Auth/RegisterForm/RegisterForm'));
const LoginForm = lazy(() => import('./components/Auth/LoginForm/LoginForm'));
const Worker_Category = lazy(() => import('./components/user_section/Worker_Category/Worker_Category'));
const Listed_Worker = lazy(() => import('./components/user_section/Listed_Worker/Listed_Worker'));
const Worker_Detail = lazy(() => import('./components/user_section/Worker_Detail/Worker_Detail'));
const Booking_Confirmed = lazy(() => import('./components/user_section/Booking_Confirmed/Booking_Confirmed'));
const RecentChats = lazy(() => import('./components/common/RecentChats/RecentChats'));
const UserProfile = lazy(() => import('./components/user_section/user_dashboard/UserProfile/UserProfile'));
const Help = lazy(() => import('./components/user_section/user_dashboard/Help/Help'));
const CurrentBooking = lazy(() => import('./components/user_section/user_dashboard/CurrentBooking/CurrentBooking'));
const PastBooking = lazy(() => import('./components/user_section/user_dashboard/PastBooking/PastBooking'));
const PostWork = lazy(() => import('./components/user_section/user_dashboard/PostWork/PostWork'));
const MyPostedJobs = lazy(() => import('./components/user_section/user_dashboard/MyPostedJobs/MyPostedJobs'));
const WorkerDashboard = lazy(() => import('./components/worker_section/WorkerDashboard/WorkerDashboard'));
const WorkerProfile = lazy(() => import('./components/worker_section/WorkerProfile/WorkerProfile'));
const CompleteProfile = lazy(() => import('./components/worker_section/CompleteProfile/CompleteProfile'));
const BookingRequestsPage = lazy(() => import('./components/worker_section/BookingRequestsPage/BookingRequestsPage'));
const AvailableWork = lazy(() => import('./components/worker_section/AvailableWork/AvailableWork'));
const AppliedWork = lazy(() => import('./components/worker_section/AppliedWork/AppliedWork'));
const ClientReviews = lazy(() => import('./components/worker_section/ClientReviews/ClientReviews'));

const PageLoader = () => <div className="app-loader" role="status" aria-live="polite">Loading HelperLoc...</div>;

const withSuspense = (element) => (
  <Suspense fallback={<PageLoader />}>
    {element}
  </Suspense>
);

const withNoIndex = (title, canonicalPath, element) => (
  <>
    <SEO
      title={createPageTitle(title)}
      description={`${title} is an account-only HelperLoc page and is not intended for search indexing.`}
      canonicalPath={canonicalPath}
      noindex
    />
    {element}
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/registration"
        element={(
          <PublicOnlyRoute>
            {withSuspense(withNoIndex('Create HelperLoc Account', '/registration', <RegisterForm />))}
          </PublicOnlyRoute>
        )}
      />

      <Route
        path="/login"
        element={(
          <PublicOnlyRoute>
            {withSuspense(withNoIndex('Login to HelperLoc', '/login', <LoginForm />))}
          </PublicOnlyRoute>
        )}
      />

      <Route path="/" element={<Layout />}>
        <Route index element={withSuspense(<Home />)} />
        <Route path="/how-it-works" element={withSuspense(<HowItWorks />)} />
        <Route path="/about-us" element={withSuspense(<About />)} />
        <Route path="/contact-us" element={withSuspense(<Contact />)} />
        <Route path="/privacy-policy" element={withSuspense(<LegalPage type="privacy" />)} />
        <Route path="/terms-of-service" element={withSuspense(<LegalPage type="terms" />)} />
        <Route path="/:serviceSlug/:locationSlug" element={withSuspense(<ServiceLocation />)} />

        <Route
          path="/user-dashboard/user-profile"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('HelperLoc User Profile', '/user-dashboard/user-profile', <UserProfile />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/user-dashboard/current-booking"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('Current HelperLoc Bookings', '/user-dashboard/current-booking', <CurrentBooking />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/user-dashboard/past-booking"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('Past HelperLoc Bookings', '/user-dashboard/past-booking', <PastBooking />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/user-dashboard/post-work"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('Post Work on HelperLoc', '/user-dashboard/post-work', <PostWork />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/user-dashboard/my-posted-jobs"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('My Posted Jobs on HelperLoc', '/user-dashboard/my-posted-jobs', <MyPostedJobs />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/user-dashboard/recent-chats"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('HelperLoc User Chats', '/user-dashboard/recent-chats', <RecentChats role="user" />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/booking-confirmed"
          element={(
            <ProtectedRoute allowedRoles={['user']}>
              {withSuspense(withNoIndex('HelperLoc Booking Confirmed', '/booking-confirmed', <Booking_Confirmed />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/help-and-support"
          element={(
            <ProtectedRoute allowedRoles={['user', 'worker']}>
              {withSuspense(withNoIndex('HelperLoc Help and Support', '/help-and-support', <Help />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker-category"
          element={(
            <ProtectedRoute allowedRoles={['user', 'worker']}>
              {withSuspense(withNoIndex('HelperLoc Worker Categories', '/worker-category', <Worker_Category />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker-category/listed-worker/:category"
          element={(
            <ProtectedRoute allowedRoles={['user', 'worker']}>
              {withSuspense(withNoIndex('HelperLoc Listed Workers', '/worker-category/listed-worker', <Listed_Worker />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker-category/listed-worker/:category/:id"
          element={(
            <ProtectedRoute allowedRoles={['user', 'worker']}>
              {withSuspense(withNoIndex('HelperLoc Worker Detail', '/worker-category/listed-worker/detail', <Worker_Detail />))}
            </ProtectedRoute>
          )}
        />

        <Route
          path="/worker/dashboard"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Worker Dashboard', '/worker/dashboard', <WorkerDashboard />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/profile"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Worker Profile', '/worker/profile', <WorkerProfile />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/completed-work"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Completed Work', '/worker/completed-work', <CompleteProfile />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/booking-request"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Booking Requests', '/worker/booking-request', <BookingRequestsPage />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/available-work"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Available Work', '/worker/available-work', <AvailableWork />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/recent-chats"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Worker Chats', '/worker/recent-chats', <RecentChats role="worker" />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/applied-work"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Applied Work', '/worker/applied-work', <AppliedWork />))}
            </ProtectedRoute>
          )}
        />
        <Route
          path="/worker/client-review"
          element={(
            <ProtectedRoute allowedRoles={['worker']}>
              {withSuspense(withNoIndex('HelperLoc Client Reviews', '/worker/client-review', <ClientReviews />))}
            </ProtectedRoute>
          )}
        />
      </Route>
    </Route>
  )
);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
