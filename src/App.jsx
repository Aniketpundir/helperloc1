// src/App.jsx
import "./App.css"
import { Provider } from 'react-redux';
import store from './Redux/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/user_section/Layout_User/Layout'
import Home from './pages/Home/Home'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import RegisterForm from './components/Auth/RegisterForm/RegisterForm'
import LoginForm from './components/Auth/LoginForm/LoginForm'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import PublicOnlyRoute from './components/Auth/PublicOnlyRoute'
import UserProfile from "./components/user_section/user_dashboard/UserProfile/UserProfile";
import Help from "./components/user_section/user_dashboard/Help/Help";
import CurrentBooking from "./components/user_section/user_dashboard/CurrentBooking/CurrentBooking";
import PastBooking from "./components/user_section/user_dashboard/PastBooking/PastBooking"
import PostWork from "./components/user_section/user_dashboard/PostWork/PostWork";
import MyPostedJobs from "./components/user_section/user_dashboard/MyPostedJobs/MyPostedJobs";
import WorkerDashboard from "./components/worker_section/WorkerDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/registration' element={<PublicOnlyRoute><RegisterForm /></PublicOnlyRoute>} />
      <Route path='/login' element={<PublicOnlyRoute><LoginForm /></PublicOnlyRoute>} />

      <Route path='/' element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />

        {/* User-only routes */}
        <Route path="/user-dashboard/user-profile"
          element={<ProtectedRoute allowedRoles={['user']}><UserProfile /></ProtectedRoute>}
        />
        <Route path="/user-dashboard/current-booking"
          element={<ProtectedRoute allowedRoles={['user']}><CurrentBooking /></ProtectedRoute>}
        />
        <Route path="/user-dashboard/past-booking"
          element={<ProtectedRoute allowedRoles={['user']}><PastBooking /></ProtectedRoute>}
        />
        <Route path="/user-dashboard/post-work"
          element={<ProtectedRoute allowedRoles={['user']}><PostWork /></ProtectedRoute>}
        />
        <Route path="/user-dashboard/my-posted-jobs"
          element={<ProtectedRoute allowedRoles={['user']}><MyPostedJobs /></ProtectedRoute>}
        />
        <Route path="/user-dashboard/help-and-support"
          element={<ProtectedRoute allowedRoles={['user', 'worker']}><Help /></ProtectedRoute>}
        />

        {/* Worker-only routes */}
        <Route path="/worker/dashboard"
          element={<ProtectedRoute allowedRoles={['worker']}><WorkerDashboard /></ProtectedRoute>}
        />
        {/* <Route path="/worker/profile"
          element={<ProtectedRoute allowedRoles={['worker']}><WorkerProfile /></ProtectedRoute>}
        /> */}
        {/* Baaki worker routes jab pages banao tab add karna */}
        {/* /worker/booking-requests, /worker/completed-projects, etc. */}
      </Route>
    </Route>
  )
);
const App = () => {
  return (
    // Redux Provider — poori app ko wrap karta hai
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App