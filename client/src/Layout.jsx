import React from 'react'
import Navbar from './component/Header/Navbar'
import Footer from './component/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Docker from './components/Docker/Docker'

const Layout = () => {
  return (
    <div>
          <Navbar />
          <Outlet/>
          <Footer/>
          <Docker/>
    </div>
  )
}

export default Layout
