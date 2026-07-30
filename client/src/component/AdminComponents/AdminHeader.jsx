import React, { useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Users, MapPin, UserCheck, Backpack, Star, MessageSquare, User, Settings, LogOut, Bell, Search, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../store/auth";
import { ThemeContext } from "../../context/ThemeContext";
import { cn } from "../../lib/utils";

const AdminHeader = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/destinations", label: "Destinations", icon: MapPin },
    { to: "/admin/local-buddies", label: "Local Buddies", icon: UserCheck },
    { to: "/admin/trips", label: "Trips", icon: Backpack },
    { to: "/admin/reviews", label: "Reviews", icon: Star },
    { to: "/admin/feedbacks", label: "Feedbacks", icon: MessageSquare },
    { to: "/admin/users", label: "Users", icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-[#1C1B1B] border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {sidebarOpen ? (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  CommuteGo
                </span>
                <p className="text-[10px] text-gray-500 -mt-1">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0a] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.username?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="hidden sm:block text-sm font-medium">{user?.username || 'Admin'}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", profileOpen && "rotate-180")} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      <p className="font-medium">{user?.username || 'Admin'}</p>
                      <p className="text-sm text-gray-500">{user?.email || 'keshabdas2003@gmail.com'}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/admin/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Profile</span>
                      </Link>
                      <Link
                        to="/admin/settings"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span className="text-sm">Settings</span>
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                      <Link
                        to="/logout"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-colors"
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

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 z-30 bg-white dark:bg-[#1C1B1B] border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <nav className="p-4 h-full flex flex-col">
          <div className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive(item.to)
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/25"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={cn(
                    "font-medium transition-all duration-300",
                    !sidebarOpen && "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Frontend Link */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 flex-shrink-0" />
              <span
                className={cn(
                  "font-medium transition-all duration-300",
                  !sidebarOpen && "opacity-0 w-0 overflow-hidden"
                )}
              >
                View Website
              </span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Spacer */}
      <div
        className={cn(
          "pt-16 transition-all duration-300",
          sidebarOpen ? "pl-64" : "pl-20"
        )}
      />
    </>
  );
};

export default AdminHeader;
