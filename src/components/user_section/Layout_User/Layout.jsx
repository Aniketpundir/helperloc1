import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import ChatSocketBridge from "../../common/ChatSocketBridge/ChatSocketBridge"

const Layout = () => {
    return (
        <>
            <ChatSocketBridge />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
