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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path='/registration'
        element={
          // <PublicOnlyRoute>
          <RegisterForm />
          // </PublicOnlyRoute>
        }
      />
      <Route
        path='/login'
        element={
          // <PublicOnlyRoute>
          <LoginForm />
          // </PublicOnlyRoute>
        }
      />

      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/how-it-works"
          element={
            // <ProtectedRoute>
            <HowItWorks />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/about-us'
          element={
            // <ProtectedRoute>
            <About />
            // </ProtectedRoute>
          }
        />
        <Route
          path='/contact-us'
          element={
            // <ProtectedRoute>
            <Contact />
            // </ProtectedRoute>
          }
        />

        <Route path="/user-dashboard/user-profile"
          element={
            // <ProtectedRoute>
            <UserProfile />
            // </ProtectedRoute>
          }
        />

        <Route path="/user-dashboard/current-booking"
          element={
            // <ProtectedRoute>
            <CurrentBooking />
            // </ProtectedRoute>
          }
        />

        <Route path="/user-dashboard/past-booking"
          element={
            // <ProtectedRoute>
            <PastBooking />
            // </ProtectedRoute>
          }
        />

        <Route path="/user-dashboard/post-work"
          element={
            // <ProtectedRoute>
            <PostWork />
            // </ProtectedRoute>
          }
        />

        <Route path="/user-dashboard/my-posted-jobs"
          element={
            // <ProtectedRoute>
            <MyPostedJobs />
            // </ProtectedRoute>
          }
        />

        <Route path="/user-dashboard/help-and-support"
          element={
            // <ProtectedRoute>
            <Help />
            // </ProtectedRoute>
          }
        />

      </Route>
    </Route>
  )
)

const App = () => {
  return (
    // Redux Provider — poori app ko wrap karta hai
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App