import React from 'react'
import Navbar from './component/Header/Navbar'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet/>
          </main>
          <Footer/>
    </div>
  )
}

export default Layout
