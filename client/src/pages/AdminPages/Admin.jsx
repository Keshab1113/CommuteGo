import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { toast } from "react-toastify";
import AdminSidebar from '../../component/AdminComponents/AdminSidebar'
import AdminTopbar from '../../component/AdminComponents/AdminTopbar'

const Admin = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 animate-pulse"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }
  if (!user?.isAdmin) {
    toast.warning("You need access for admin page")
    return <Navigate to="/"/>
  }
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <AdminTopbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className={`pt-16 min-h-screen transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
        <div className="p-6">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default Admin
