/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Bell, User, Settings, LogOut, ChevronDown, Menu, Check, Clock, MapPin, UserCheck, Backpack, MessageSquare, Users, AlertTriangle, Globe, Sparkles, Star } from 'lucide-react'
import { useAuth } from '../../store/auth'
import { useNotifications } from '../../context/NotificationContext'

const typeStyles = {
  info: { icon: Bell, color: 'bg-cyan-500/10 text-cyan-400' },
  success: { icon: Check, color: 'bg-emerald-500/10 text-emerald-400' },
  warning: { icon: AlertTriangle, color: 'bg-yellow-500/10 text-yellow-400' },
  error: { icon: AlertTriangle, color: 'bg-red-500/10 text-red-400' },
}

const entityIcons = {
  destination: MapPin,
  localBuddy: UserCheck,
  trip: Backpack,
  feedback: MessageSquare,
  user: Users,
  review: Star,
  experience: Globe,
  system: Sparkles,
}

const AdminTopbar = ({ isOpen, setIsOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { user } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const location = useLocation()
  const navigate = useNavigate()
  const notifRef = useRef(null)

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/admin') return 'Dashboard'
    const segments = path.split('/')
    const lastSegment = segments[segments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markAsRead(notif._id)
    }
    setNotificationsOpen(false)
    navigate(`/admin/notifications/${notif._id}`)
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000)
    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const recentNotifications = notifications.slice(0, 6)

  return (
    <header className={`fixed top-0 right-0 z-30 h-16 bg-[#1C1B1B] border-b border-white/10 transition-all duration-300 ${
      isOpen ? 'left-64' : 'left-20'
    }`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-[360px] sm:w-[400px] rounded-2xl bg-[#1C1B1B] border border-white/10 shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      <p className="text-xs text-gray-500">
                        {unreadCount > 0 ? `${unreadCount} unread` : 'No new notifications'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-cyan-400 transition-colors"
                          title="Mark all as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <Link
                        to="/admin/notifications"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        View all
                      </Link>
                    </div>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto">
                    {recentNotifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                          <Bell className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-400">No notifications yet</p>
                        <p className="text-xs text-gray-600 mt-1">Website activity will appear here</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {recentNotifications.map((notif) => {
                          const EntityIcon = entityIcons[notif.entityType] || Sparkles
                          const colorClass = typeStyles[notif.type]?.color || typeStyles.info.color

                          return (
                            <div
                              key={notif._id}
                              onClick={() => handleNotificationClick(notif)}
                              className={`p-4 hover:bg-white/5 cursor-pointer transition-all group ${
                                !notif.isRead ? 'bg-cyan-500/5' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-9 h-9 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                                  <EntityIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className={`text-sm font-medium truncate ${!notif.isRead ? 'text-white' : 'text-gray-300'}`}>
                                      {notif.title}
                                    </p>
                                    {!notif.isRead && (
                                      <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{notif.message}</p>
                                  <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-600">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(notif.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-white/10 bg-white/5">
                    <Link
                      to="/admin/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-cyan-400 hover:text-cyan-300 hover:bg-white/5 transition-all"
                    >
                      See all notifications
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                {user?.username?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.isAdmin ? 'Administrator' : 'User'}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#1C1B1B] border border-white/10 shadow-xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <p className="font-medium text-white">{user?.username || 'Admin'}</p>
                    <p className="text-sm text-gray-500">{user?.email || 'admin@commutego.com'}</p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>
                  </div>
                  <div className="p-2 border-t border-white/10">
                    <Link
                      to="/logout"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar
