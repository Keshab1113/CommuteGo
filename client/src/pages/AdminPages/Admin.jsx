import React from 'react'
import AdminHeader from '../../component/AdminComponents/AdminHeader'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { toast } from "react-toastify";


const Admin = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (!user.isAdmin) {
    toast.warning("You need access for admin page")
    return <Navigate to="/"/>
  }
  return (
    <div>
      <AdminHeader/>
      <Outlet/>
    </div>
  )
}

export default Admin
