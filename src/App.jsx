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

// import { loginSuccess } from "./Redux/Slice/authSlice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/*
        ── PUBLIC ONLY ROUTES ──
        Agar user already logged in hai toh yahan aane par
        automatically redirect ho jayega — chahe URL type kare tab bhi.
      */}
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

      {/*
        ── PROTECTED ROUTES (sirf logged-in users) ──
        Agar login nahi hai toh /login par redirect hoga.
      */}
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

        {/*
          ── WORKER ONLY ROUTES ──
          Sirf workers ke liye — users yahan nahi ja sakte.
          Apna WorkerDashboard component import karke lagao.
        */}
        {/* 
        <Route
          path='/worker/dashboard'
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
        */}
      </Route>
    </Route>
  )
)

const App = () => {

  // store.dispatch(loginSuccess({
  //   token: 'fake-token-123',
  //   user: {
  //     fullName: 'Rahul Sharma',
  //     email: 'rahul@example.com',
  //     role: 'user',
  //   },
  //   remember: false,
  // }))
  return (
    // Redux Provider — poori app ko wrap karta hai
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App