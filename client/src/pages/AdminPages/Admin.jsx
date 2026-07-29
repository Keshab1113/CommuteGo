import React from 'react'
import AdminHeader from '../../component/AdminComponents/AdminHeader'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { toast } from "react-toastify";


const Admin = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#141313]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 animate-pulse"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }
  if (!user?.isAdmin) {
    toast.warning("You need access for admin page")
    return <Navigate to="/"/>
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141313]">
      <AdminHeader/>
      <div className="pt-16">
        <Outlet/>
      </div>
    </div>
  )
}

export default Admin
