import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import ChatSocketBridge from "../../common/ChatSocketBridge/ChatSocketBridge"
import WorkerProfileAlert from "../../common/WorkerProfileAlert/WorkerProfileAlert"

const Layout = () => {
    return (
        <>
            <ChatSocketBridge />
            <Navbar />
            <WorkerProfileAlert />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
