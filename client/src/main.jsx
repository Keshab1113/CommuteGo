import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import NoPage from './pages/NoPage.jsx'
import FeedBack from './pages/FeedBack.jsx'
import Contact from './pages/Contact.jsx'
import FlightPage from './pages/FlightPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import HiddenDestinations from './pages/HiddenDestinations.jsx'
import AddDestination from './pages/AddDestination.jsx'
import LocalBuddies from './pages/LocalBuddies.jsx'
import AddLocalBuddy from './pages/AddLocalBuddy.jsx'
import TravelMatchmaking from './pages/TravelMatchmaking.jsx'
import Trips from './pages/Trips.jsx'
import CreateTrip from './pages/CreateTrip.jsx'
import { AuthProvider } from './store/auth.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Admin from './pages/AdminPages/Admin.jsx'
import AdminHome from './pages/AdminPages/AdminHome.jsx'
import AllUsers from './pages/AdminPages/AllUsers.jsx'
import AdminProfile from './pages/AdminPages/AdminProfile/AdminProfile.jsx'
import AdminSettings from './pages/AdminPages/AdminSettings/AdminSettings.jsx'
import AdminNotifications from './pages/AdminPages/AdminNotifications/AdminNotifications.jsx'
import NotificationDetail from './pages/AdminPages/AdminNotifications/NotificationDetail.jsx'
import AdminFeedback from './pages/AdminPages/AdminFeedback.jsx'
import AdminContact from './pages/AdminPages/AdminContact.jsx'
import AdminDestinations from './pages/AdminPages/AdminDestinations.jsx'
import AdminLocalBuddies from './pages/AdminPages/AdminLocalBuddies.jsx'
import AdminTrips from './pages/AdminPages/AdminTrips.jsx'
import { Logout } from './pages/Logout.jsx'
import UserEdit from "./pages/AdminPages/UserEditPage/UserEdit.jsx"
import ManageFeedbacks from './pages/AdminPages/ManageFeedbacks.jsx'
import Landing from './components/Landing/Landing.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='services' element={<Landing />} />
        <Route path='feedback' element={<FeedBack />} />
        <Route path='contact' element={<Contact />} />
        <Route path='flight' element={<FlightPage />} />
        <Route path='hidden-destinations' element={<HiddenDestinations />} />
        <Route path='add-destination' element={<AddDestination />} />
        <Route path='local-buddies' element={<LocalBuddies />} />
        <Route path='become-local-buddy' element={<AddLocalBuddy />} />
        <Route path='travel-matchmaking' element={<TravelMatchmaking />} />
        <Route path='trips' element={<Trips />} />
        <Route path='create-trip' element={<CreateTrip />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} />
        <Route path='terms-of-service' element={<TermsOfService />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='logout' element={<Logout />} />
      <Route path='/admin' element={<Admin />}>
        <Route path='' element={<AdminHome />} />
        <Route path='users' element={<AllUsers />} />
        <Route path='destinations' element={<AdminDestinations />} />
        <Route path='local-buddies' element={<AdminLocalBuddies />} />
        <Route path='trips' element={<AdminTrips />} />
        <Route path='feedbacks' element={<AdminFeedback />} />
        <Route path='contacts' element={<AdminContact />} />
        <Route path='profile' element={<AdminProfile />} />
        <Route path='settings' element={<AdminSettings />} />
        <Route path='notifications' element={<AdminNotifications />} />
        <Route path='notifications/:id' element={<NotificationDetail />} />
        <Route path="users/:id/edit" element={<UserEdit />} />
        <Route path="/admin/feedbacks/:id/edit" element={<ManageFeedbacks />} />
      </Route>
      <Route path='*' element={<NoPage />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <NotificationProvider>
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
          />
        </React.StrictMode>
      </NotificationProvider>
    </ThemeProvider>
  </AuthProvider>
)
