import React, { useState, useContext } from "react";
import { User, LogOut, Settings, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { ThemeContext } from "../../context/ThemeContext";
import { cn } from "../../lib/utils";

const User = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpenUserMenu}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform", anchorElUser && "rotate-180")} />
      </button>

      {anchorElUser && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={handleCloseUserMenu}
          />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden animate-scale-in">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-sm">{user?.username || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="p-2">
              <Link
                to="/admin/profile"
                onClick={handleCloseUserMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <Link
                to="/admin/settings"
                onClick={handleCloseUserMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </div>
            <div className="p-2 border-t border-gray-100 dark:border-gray-800">
              <Link
                to="/logout"
                onClick={handleCloseUserMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
