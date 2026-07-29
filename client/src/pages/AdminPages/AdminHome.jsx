import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2, Bus, Users, MessageSquare, TrendingUp, Clock, CheckCircle, XCircle, ArrowUpDown, MoreVertical } from 'lucide-react';
import { Link } from "react-router-dom";
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../store/auth';
import { toast } from "react-toastify";

const AdminHome = () => {
  const { darkMode } = useContext(ThemeContext);
  const { authorizationToken } = useAuth();
  const [stats, setStats] = useState({
    users: 127,
    busData: 843,
    feedbacks: 24,
  });

  const recentActivity = [
    { type: 'user', message: 'New user registered: Priya Sharma', time: '2 mins ago' },
    { type: 'bus', message: 'Bus added: Kolkata Express', time: '15 mins ago' },
    { type: 'feedback', message: 'New feedback received', time: '1 hour ago' },
    { type: 'booking', message: '5 new bookings today', time: '2 hours ago' },
  ];

  const quickActions = [
    { icon: Plus, label: 'Add Bus', to: '/admin/busdata/addBus', color: 'from-cyan-500 to-emerald-500' },
    { icon: Users, label: 'Manage Users', to: '/admin/users', color: 'from-blue-500 to-purple-500' },
    { icon: MessageSquare, label: 'View Feedbacks', to: '/admin/feedbacks', color: 'from-orange-500 to-red-500' },
    { icon: Bus, label: 'Manage Buses', to: '/admin/busdata', color: 'from-pink-500 to-rose-500' },
  ];

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Bus Routes', value: stats.busData, icon: Bus, color: 'from-cyan-500 to-emerald-500', change: '+8%' },
    { label: 'Feedbacks', value: stats.feedbacks, icon: MessageSquare, color: 'from-orange-500 to-red-500', change: '-3%' },
    { label: 'Active Bookings', value: '89', icon: TrendingUp, color: 'from-purple-500 to-pink-500', change: '+24%' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#141313]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white dark:bg-[#1C1B1B] border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800 hover:shadow-premium transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              <button className="text-sm text-cyan-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#0a0a0a]"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'user' ? 'bg-blue-500/10 text-blue-500' :
                    activity.type === 'bus' ? 'bg-cyan-500/10 text-cyan-500' :
                    activity.type === 'feedback' ? 'bg-orange-500/10 text-orange-500' :
                    'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {activity.type === 'user' && <Users className="w-5 h-5" />}
                    {activity.type === 'bus' && <Bus className="w-5 h-5" />}
                    {activity.type === 'feedback' && <MessageSquare className="w-5 h-5" />}
                    {activity.type === 'booking' && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={action.to}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {action.label}
                    </span>
                    <ArrowUpDown className="w-4 h-4 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Feedbacks Preview */}
        <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-[#1C1B1B] border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Feedbacks</h2>
            <Link to="/admin/feedbacks" className="text-sm text-cyan-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Message</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm">Priya Sharma</td>
                  <td className="py-3 px-4 text-sm text-gray-500">priya@example.com</td>
                  <td className="py-3 px-4 text-sm truncate max-w-xs">Great service! Highly recommend...</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-600">Pending</span></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm">Rahul Verma</td>
                  <td className="py-3 px-4 text-sm text-gray-500">rahul@example.com</td>
                  <td className="py-3 px-4 text-sm truncate max-w-xs">Very good experience...</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600">Resolved</span></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
