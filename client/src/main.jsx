import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import BusPage from './pages/BusPage.jsx'
import NoPage from './pages/NoPage.jsx'
import FeedBack from './pages/FeedBack.jsx'
import Contact from './pages/Contact.jsx'
import FlightPage from './pages/FlightPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from "react-toastify";
import Admin from './pages/AdminPages/Admin.jsx'
import AdminHome from './pages/AdminPages/AdminHome.jsx'
import AllUsers from './pages/AdminPages/AllUsers.jsx'
import AdminProfile from './pages/AdminPages/AdminProfile/AdminProfile.jsx'
import AdminFeedback from './pages/AdminPages/AdminFeedback.jsx'
import AdminBusdata from './pages/AdminPages/AdminBusdata.jsx'
import { Logout } from './pages/Logout.jsx'
import AddBus from './pages/AdminPages/AddBus.jsx'
import UserEdit from "./pages/AdminPages/UserEditPage/UserEdit.jsx"
import ManageFeedbacks from './pages/AdminPages/ManageFeedbacks.jsx'
import BusDataEdit from './pages/AdminPages/BusDataEditPage/BusDataEdit.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='bus' element={<BusPage />} />
        <Route path='feedback' element={<FeedBack />} />
        <Route path='contact' element={<Contact />} />
        <Route path='flight' element={<FlightPage />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='logout' element={<Logout />} />
      <Route path='/admin' element={<Admin />}>
        <Route path='' element={<AdminHome />} />
        <Route path='users' element={<AllUsers />} />
        <Route path='busdata' element={<AdminBusdata />} />
        <Route path='feedback' element={<AdminFeedback/>} />
        <Route path='profile' element={<AdminProfile />} />
        <Route path='busdata/addBus' element={<AddBus />} />
        <Route path="users/:id/edit" element={<UserEdit/>} />
        <Route path="/admin/feedbacks/:id/edit" element={<ManageFeedbacks />} />
        <Route path="/admin/busdata/:id/edit" element={<BusDataEdit />} />
      </Route>
      <Route path='*' element={<NoPage />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce />
    </React.StrictMode>
  </AuthProvider>

)
