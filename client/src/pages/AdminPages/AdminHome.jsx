import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, MapPin, UserCheck, Backpack, MessageSquare, TrendingUp, TrendingDown, Eye, EyeOff, Loader2, Clock, ChevronRight, Activity } from 'lucide-react';
import { Link } from "react-router-dom";
import { ThemeContext } from '../../context/ThemeContext';
import { toast } from "react-toastify";
import { destinationsApi, localBuddiesApi, tripsApi, adminDataApi } from '../../services/api/adminApi';

// Simple Bar Chart Component
const BarChart = ({ data, title }) => (
  <div className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-6">
    <h3 className="text-sm font-medium text-gray-400 mb-4">{title}</h3>
    <div className="flex items-end gap-2 h-32">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-t-sm transition-all"
            style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
          ></div>
          <span className="text-xs text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

// Donut Chart Component
const DonutChart = ({ data, title, colors }) => (
  <div className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-6">
    <h3 className="text-sm font-medium text-gray-400 mb-4">{title}</h3>
    <div className="flex items-center gap-6">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {data.reduce((acc, item, i) => {
            const percentage = (item.value / data.reduce((a, b) => a + b.value, 0)) * 100;
            const offset = acc.offset + (acc.total / 100) * acc.current;
            acc.current += percentage;
            acc.elements.push(
              <circle
                key={i}
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke={colors[i]}
                strokeWidth="3"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset={`-${offset}`}
                className="transition-all duration-500"
              />
            );
            return acc;
          }, { elements: [], current: 0, offset: 0 }).elements}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{data.reduce((a, b) => a + b.value, 0)}</span>
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }}></div>
              <span className="text-sm text-gray-400">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AdminHome = () => {
  const { darkMode } = useContext(ThemeContext);

  const [stats, setStats] = useState({
    users: 0,
    destinations: 0,
    localBuddies: 0,
    trips: 0,
    feedbacks: 0
  });
  const [pendingCounts, setPendingCounts] = useState({
    destinations: 0,
    buddies: 0,
    trips: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, destinationsRes, buddiesRes, tripsRes, feedbacksRes, pendingDests, pendingBuddies, pendingTrips] = await Promise.all([
          adminDataApi.getAllUsers().catch(() => ({ data: [] })),
          destinationsApi.getAll({ limit: 100 }).catch(() => ({ data: { destinations: [] } })),
          localBuddiesApi.getAll({ limit: 100 }).catch(() => ({ data: { buddies: [] } })),
          tripsApi.getAll({ limit: 100 }).catch(() => ({ data: { trips: [] } })),
          adminDataApi.getAllFeedbacks().catch(() => ({ data: [] })),
          destinationsApi.getPending().catch(() => ({ data: { destinations: [] } })),
          localBuddiesApi.getPending().catch(() => ({ data: { buddies: [] } })),
          tripsApi.getPending().catch(() => ({ data: { trips: [] } }))
        ]);

        const users = usersRes.data || [];
        const destinations = destinationsRes.data?.destinations || [];
        const buddies = buddiesRes.data?.buddies || [];
        const trips = tripsRes.data?.trips || [];
        const feedbacks = feedbacksRes.data || [];

        setStats({
          users: users.length || 0,
          destinations: destinations.length || 0,
          localBuddies: buddies.length || 0,
          trips: trips.length || 0,
          feedbacks: feedbacks.length || 0
        });

        setPendingCounts({
          destinations: pendingDests.data?.destinations?.length || 0,
          buddies: pendingBuddies.data?.buddies?.length || 0,
          trips: pendingTrips.data?.trips?.length || 0
        });

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: Users, color: 'from-blue-500 to-cyan-500', link: '/admin/users', change: '+12%' },
    { label: 'Destinations', value: stats.destinations, icon: MapPin, color: 'from-emerald-500 to-cyan-500', link: '/admin/destinations', change: '+8%', pending: pendingCounts.destinations },
    { label: 'Local Buddies', value: stats.localBuddies, icon: UserCheck, color: 'from-purple-500 to-pink-500', link: '/admin/local-buddies', change: '+15%', pending: pendingCounts.buddies },
    { label: 'Active Trips', value: stats.trips, icon: Backpack, color: 'from-orange-500 to-red-500', link: '/admin/trips', change: '+5%', pending: pendingCounts.trips },
  ];

  const statCards2 = [
    { label: 'Feedbacks', value: stats.feedbacks, icon: MessageSquare, color: 'from-rose-500 to-pink-500', link: '/admin/feedbacks', change: '+3' },
  ];

  const chartData = [
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 55 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 70 },
    { label: 'May', value: 60 },
    { label: 'Jun', value: 85 },
  ];

  const contentTypeData = [
    { label: 'Destinations', value: stats.destinations },
    { label: 'Buddies', value: stats.localBuddies },
    { label: 'Trips', value: stats.trips },
    { label: 'Feedbacks', value: stats.feedbacks },
  ];

  const chartColors = ['#06b6d4', '#8b5cf6', '#f97316', '#ec4899'];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-5 hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
              {stat.pending > 0 && (
                <Link
                  to={stat.link}
                  className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  {stat.pending} pending
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statCards2.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (index + 4) * 0.05 }}
            className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-5 hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChart data={chartData} title="Monthly Growth" />
        </div>
        <DonutChart data={contentTypeData} title="Content Distribution" colors={chartColors} />
      </div>

      {/* Quick Actions & Pending Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Destination', icon: MapPin, color: 'from-emerald-500 to-cyan-500', link: '/add-destination' },
              { label: 'Add Buddy', icon: UserCheck, color: 'from-purple-500 to-pink-500', link: '/become-local-buddy' },
              { label: 'Create Trip', icon: Backpack, color: 'from-orange-500 to-red-500', link: '/create-trip' },
              { label: 'View Website', icon: Activity, color: 'from-blue-500 to-cyan-500', link: '/' },
            ].map((action, i) => (
              <a
                key={i}
                href={action.link}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Pending Reviews</h3>
            <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium">
              {pendingCounts.destinations + pendingCounts.buddies + pendingCounts.trips} total
            </span>
          </div>
          <div className="space-y-3">
            {pendingCounts.destinations > 0 && (
              <Link
                to="/admin/destinations"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Destinations</p>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                    {pendingCounts.destinations}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </Link>
            )}
            {pendingCounts.buddies > 0 && (
              <Link
                to="/admin/local-buddies"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Local Buddies</p>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
                    {pendingCounts.buddies}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </Link>
            )}
            {pendingCounts.trips > 0 && (
              <Link
                to="/admin/trips"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Backpack className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Trips</p>
                    <p className="text-xs text-gray-500">Awaiting approval</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium">
                    {pendingCounts.trips}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </Link>
            )}
            {pendingCounts.destinations === 0 && pendingCounts.buddies === 0 && pendingCounts.trips === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-sm text-gray-400">All caught up! No pending reviews.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
