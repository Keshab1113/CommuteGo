import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, MapPin, Users, UserCheck, Backpack, MessageSquare, Mail, Settings, Home, ChevronLeft, ChevronRight } from 'lucide-react'

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/destinations", label: "Destinations", icon: MapPin },
    { to: "/admin/local-buddies", label: "Local Buddies", icon: UserCheck },
    { to: "/admin/trips", label: "Trips", icon: Backpack },
    { to: "/admin/contacts", label: "Contacts", icon: Mail },
    { to: "/admin/feedbacks", label: "Reviews", icon: MessageSquare },
    { to: "/admin/users", label: "Users", icon: Users },
  ];

  const bottomNav = [
    { to: "/admin/settings", label: "Settings", icon: Settings },
    { to: "/", label: "View Website", icon: Home },
  ];

  return (
    <aside className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 flex flex-col ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      {/* Logo */}
      <div className={`h-16 flex items-center border-b border-white/10 ${isOpen ? 'px-6' : 'justify-center px-2'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          {isOpen && (
            <div>
              <span className="text-lg font-bold text-white">CommuteGo</span>
              <p className="text-[10px] text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1C1B1B] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              } ${isOpen ? '' : 'justify-center'}`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="p-3 border-t border-white/10 space-y-1">
        {bottomNav.map((item) => (
          <a
            key={item.to}
            href={item.to}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5 ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </a>
        ))}
      </div>
    </aside>
  )
}

export default AdminSidebar
