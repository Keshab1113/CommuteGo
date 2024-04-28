import React from 'react'
import Navbar from './component/Header/Navbar'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
          <Navbar />
          <Outlet/>
          <Footer/>
    </div>
  )
}

export default Layout
