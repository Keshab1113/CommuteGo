import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Clock,
  Activity,
  Users,
  MapPin,
  UserCheck,
  Backpack,
  MessageSquare,
  ChevronRight,
  Loader2,
  Edit2,
  Check,
  X,
  Crown,
  ExternalLink,
  Bell,
  Zap,
  Key,
  Fingerprint,
  TrendingUp,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../../store/auth";
import {
  destinationsApi,
  localBuddiesApi,
  tripsApi,
  adminDataApi,
} from "../../../services/api/adminApi";

const AdminProfile = () => {
  const { user, setUser } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    destinations: 0,
    localBuddies: 0,
    trips: 0,
    feedbacks: 0,
  });
  const [pendingCounts, setPendingCounts] = useState({
    destinations: 0,
    buddies: 0,
    trips: 0,
  });
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: "", email: "" });
  const [saving, setSaving] = useState(false);

  // Fetch platform statistics relevant to the admin profile
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          usersRes,
          destinationsRes,
          buddiesRes,
          tripsRes,
          feedbacksRes,
          pendingDests,
          pendingBuddies,
          pendingTrips,
        ] = await Promise.all([
          adminDataApi.getAllUsers().catch(() => ({ data: [] })),
          destinationsApi.getAll({ limit: 100 }).catch(() => ({ data: { destinations: [] } })),
          localBuddiesApi.getAll({ limit: 100 }).catch(() => ({ data: { buddies: [] } })),
          tripsApi.getAll({ limit: 100 }).catch(() => ({ data: { trips: [] } })),
          adminDataApi.getAllFeedbacks().catch(() => ({ data: [] })),
          destinationsApi.getPending().catch(() => ({ data: { destinations: [] } })),
          localBuddiesApi.getPending().catch(() => ({ data: { buddies: [] } })),
          tripsApi.getPending().catch(() => ({ data: { trips: [] } })),
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
          feedbacks: feedbacks.length || 0,
        });

        setPendingCounts({
          destinations: pendingDests.data?.destinations?.length || 0,
          buddies: pendingBuddies.data?.buddies?.length || 0,
          trips: pendingTrips.data?.trips?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch profile stats:", error);
        toast.error("Failed to load platform statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Initialize edit form when user data is available
  useEffect(() => {
    if (user) {
      setEditData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({
        username: user.username || "",
        email: user.email || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    if (!editData.username.trim() || !editData.email.trim()) {
      toast.error("Username and email are required");
      return;
    }

    setSaving(true);
    try {
      await adminDataApi.updateUser(user._id, {
        username: editData.username.trim(),
        email: editData.email.trim(),
      });

      // Update auth context so the change reflects across the app
      setUser({
        ...user,
        username: editData.username.trim(),
        email: editData.email.trim(),
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statCards = [
    {
      label: "Total Users",
      value: stats.users,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      link: "/admin/users",
    },
    {
      label: "Destinations",
      value: stats.destinations,
      icon: MapPin,
      color: "from-emerald-500 to-cyan-500",
      link: "/admin/destinations",
      pending: pendingCounts.destinations,
    },
    {
      label: "Local Buddies",
      value: stats.localBuddies,
      icon: UserCheck,
      color: "from-purple-500 to-pink-500",
      link: "/admin/local-buddies",
      pending: pendingCounts.buddies,
    },
    {
      label: "Active Trips",
      value: stats.trips,
      icon: Backpack,
      color: "from-orange-500 to-red-500",
      link: "/admin/trips",
      pending: pendingCounts.trips,
    },
    {
      label: "Feedbacks",
      value: stats.feedbacks,
      icon: MessageSquare,
      color: "from-rose-500 to-pink-500",
      link: "/admin/feedbacks",
    },
    {
      label: "Pending Reviews",
      value: pendingCounts.destinations + pendingCounts.buddies + pendingCounts.trips,
      icon: Bell,
      color: "from-yellow-500 to-amber-500",
      link: "/admin/destinations",
    },
  ];

  const quickActions = [
    {
      label: "Manage Users",
      desc: "View, edit or remove platform users",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      link: "/admin/users",
    },
    {
      label: "Review Destinations",
      desc: "Approve new hidden destinations",
      icon: MapPin,
      color: "from-emerald-500 to-cyan-500",
      link: "/admin/destinations",
    },
    {
      label: "Check Feedbacks",
      desc: "Read traveler reviews & reports",
      icon: MessageSquare,
      color: "from-rose-500 to-pink-500",
      link: "/admin/feedbacks",
    },
    {
      label: "Visit Website",
      desc: "See how the public pages look",
      icon: ExternalLink,
      color: "from-violet-500 to-purple-500",
      link: "/",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your account and view platform overview
          </p>
        </div>
        <button
          onClick={handleEditToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isEditing
              ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
              : "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600"
          }`}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" /> Edit Profile
            </>
          )}
        </button>
      </motion.div>

      {/* Profile Hero */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1B1B] to-[#141313] border border-white/10 p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-cyan-500 via-emerald-500 to-purple-500 p-[3px]">
              <div className="w-full h-full rounded-3xl bg-[#0a0a0a] flex items-center justify-center text-4xl sm:text-5xl font-bold text-white">
                {user.username?.charAt(0)?.toUpperCase() || "A"}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-cyan-400 shadow-lg">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-3 max-w-md mx-auto md:mx-0">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 text-left">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 text-left">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all disabled:opacity-70"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    {user.username}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                      <Crown className="w-3 h-3" /> Admin
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                      <Sparkles className="w-3 h-3" /> Active
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  {user.email}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    Member since {formatDate(user.createdAt)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-500" />
                    Updated {formatDateTime(user.updatedAt)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-cyan-500" />
          <h3 className="text-lg font-semibold text-white">Platform Overview</h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-40 rounded-2xl bg-[#1C1B1B] border border-white/10">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-5 hover:border-cyan-500/30 transition-all group"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                  {stat.pending > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-medium">
                      {stat.pending} pending
                    </span>
                  )}
                </div>
                <Link
                  to={stat.link}
                  className="mt-4 flex items-center text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View details <ChevronRight className="w-3 h-3 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Two Column: Account Details + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Details */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-[#1C1B1B] rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Fingerprint className="w-5 h-5 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">Account Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <Key className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-gray-300 font-mono truncate">
                  {user._id}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Role
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-white font-medium">
                  {user.isAdmin ? "Administrator" : "Standard User"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <User className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-white">{user.username}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Address
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <Mail className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-white">{user.email}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created On
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-300">
                  {formatDateTime(user.createdAt)}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                <Clock className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-gray-300">
                  {formatDateTime(user.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{action.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Security & Permissions */}
      <motion.div
        variants={itemVariants}
        className="bg-[#1C1B1B] rounded-2xl border border-white/10 p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-white">Security & Permissions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Admin Access",
              desc: "Full platform control",
              icon: Crown,
              color: "text-purple-400 bg-purple-500/10",
            },
            {
              title: "User Management",
              desc: "Create, edit & delete users",
              icon: Users,
              color: "text-blue-400 bg-blue-500/10",
            },
            {
              title: "Content Moderation",
              desc: "Approve destinations, buddies & trips",
              icon: Shield,
              color: "text-emerald-400 bg-emerald-500/10",
            },
            {
              title: "Analytics Access",
              desc: "View platform statistics",
              icon: TrendingUp,
              color: "text-cyan-400 bg-cyan-500/10",
            },
          ].map((perm, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
            >
              <div className={`p-2.5 rounded-xl ${perm.color}`}>
                <perm.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{perm.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{perm.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminProfile;
