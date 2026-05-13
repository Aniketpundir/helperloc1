import React from 'react'
import "./App.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout_User/Layout'
import Home from './pages/Home/Home'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />
      </Route>
    </Route>
  )
)

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App