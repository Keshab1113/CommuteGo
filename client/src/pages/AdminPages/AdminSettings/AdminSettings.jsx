import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Settings,
  User,
  Lock,
  Bell,
  Shield,
  Globe,
  Save,
  Loader2,
  Check,
  AlertTriangle,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Mail,
  Clock,
  Fingerprint,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../../store/auth";
import { adminDataApi } from "../../../services/api/adminApi";

const AdminSettings = () => {
  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  // General form
  const [generalForm, setGeneralForm] = useState({
    username: "",
    email: "",
    bio: "",
  });

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newUserSignup: true,
    pendingApprovals: true,
    feedbackReceived: true,
    weeklyReports: false,
  });

  // Platform preferences
  const [platform, setPlatform] = useState({
    maintenanceMode: false,
    autoApproveDestinations: false,
    autoApproveBuddies: false,
    publicRegistration: true,
  });

  // Load persisted preferences
  useEffect(() => {
    const savedPrefs = localStorage.getItem("commutego_admin_prefs");
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.platform) setPlatform(parsed.platform);
      } catch (e) {
        console.error("Failed to parse admin preferences", e);
      }
    }
  }, []);

  // Sync user into general form
  useEffect(() => {
    if (user) {
      setGeneralForm({
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const persistPreferences = (nextNotifications, nextPlatform) => {
    localStorage.setItem(
      "commutego_admin_prefs",
      JSON.stringify({
        notifications: nextNotifications || notifications,
        platform: nextPlatform || platform,
      })
    );
  };

  const handleGeneralSave = async () => {
    if (!generalForm.username.trim() || !generalForm.email.trim()) {
      toast.error("Username and email are required");
      return;
    }

    setSaving(true);
    try {
      await adminDataApi.updateUser(user._id, {
        username: generalForm.username.trim(),
        email: generalForm.email.trim(),
        bio: generalForm.bio.trim(),
      });

      setUser({
        ...user,
        username: generalForm.username.trim(),
        email: generalForm.email.trim(),
        bio: generalForm.bio.trim(),
      });

      toast.success("Profile settings saved successfully");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to save profile settings";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    setPasswordSaving(true);
    try {
      await adminDataApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      toast.success("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to change password";
      toast.error(msg);
    } finally {
      setPasswordSaving(false);
    }
  };

  const toggleNotification = (key) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    persistPreferences(next, platform);
    toast.success(`${key.replace(/([A-Z])/g, " $1")} ${next[key] ? "enabled" : "disabled"}`);
  };

  const togglePlatform = (key) => {
    const next = { ...platform, [key]: !platform[key] };
    setPlatform(next);
    persistPreferences(notifications, next);
    toast.success(`${key.replace(/([A-Z])/g, " $1")} ${next[key] ? "enabled" : "disabled"}`);
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

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "platform", label: "Platform", icon: Globe },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-500" />
            Admin Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account preferences and platform configuration
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 bg-[#1C1B1B] rounded-2xl border border-white/10 p-4 h-fit"
        >
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Signed in as
            </p>
            <p className="text-sm font-medium text-white truncate">{user.username}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 bg-[#1C1B1B] rounded-2xl border border-white/10 p-6 sm:p-8 min-h-[500px]"
        >
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">General Information</h3>
                  <p className="text-xs text-gray-500">Update your basic profile details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={generalForm.username}
                      onChange={(e) => setGeneralForm({ ...generalForm, username: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={generalForm.email}
                      onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-300">Admin Bio</label>
                  <textarea
                    rows={4}
                    value={generalForm.bio}
                    onChange={(e) => setGeneralForm({ ...generalForm, bio: e.target.value })}
                    placeholder="Write a short description about your role on CommuteGo..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500">This bio is visible only on your admin profile.</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Link
                  to="/admin/profile"
                  className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  View public profile <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleGeneralSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all disabled:opacity-70"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Security</h3>
                  <p className="text-xs text-gray-500">Update your password and review session details</p>
                </div>
              </div>

              {/* Change Password */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white">Change Password</h4>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Current Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showNew ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                        }
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check className="w-3 h-3 text-emerald-500" /> Password must be at least 6 characters
                </div>

                <div className="pt-2">
                  <button
                    onClick={handlePasswordSave}
                    disabled={passwordSaving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-70"
                  >
                    {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                    {passwordSaving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>

              {/* Session Info */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h4 className="text-sm font-medium text-white">Session Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <Fingerprint className="w-5 h-5 text-cyan-500" />
                    <div>
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="text-sm text-white font-mono truncate">{user._id}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-xs text-gray-500">Account Created</p>
                      <p className="text-sm text-white">{formatDateTime(user.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                  <p className="text-xs text-gray-500">Choose which alerts you want to receive</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: "emailAlerts", label: "Email Alerts", desc: "Receive important email notifications" },
                  { key: "newUserSignup", label: "New User Signups", desc: "Get notified when a new user registers" },
                  { key: "pendingApprovals", label: "Pending Approvals", desc: "Alerts for destinations, buddies or trips awaiting review" },
                  { key: "feedbackReceived", label: "New Feedback", desc: "Notify when travelers submit feedback" },
                  { key: "weeklyReports", label: "Weekly Reports", desc: "Receive a weekly summary of platform activity" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key] ? "bg-cyan-500" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications[item.key] ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "platform" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Platform Configuration</h3>
                  <p className="text-xs text-gray-500">Control platform-wide settings and moderation rules</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show a maintenance banner to public visitors", icon: AlertTriangle, color: "text-yellow-400 bg-yellow-500/10" },
                  { key: "autoApproveDestinations", label: "Auto-Approve Destinations", desc: "New destinations are published without review", icon: MapPin, color: "text-emerald-400 bg-emerald-500/10" },
                  { key: "autoApproveBuddies", label: "Auto-Approve Local Buddies", desc: "Skip manual review for buddy applications", icon: User, color: "text-purple-400 bg-purple-500/10" },
                  { key: "publicRegistration", label: "Public Registration", desc: "Allow new users to sign up on the website", icon: Globe, color: "text-blue-400 bg-blue-500/10" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{item.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => togglePlatform(item.key)}
                          className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                            platform[item.key] ? "bg-cyan-500" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              platform[item.key] ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                <p className="text-sm text-yellow-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Platform toggles are stored locally and used by the admin dashboard UI. Connect them to backend endpoints to make them enforceable.
                </p>
              </div>
            </div>
          )}

          {activeTab === "danger" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
                  <p className="text-xs text-gray-500">Irreversible account actions</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Sign out of all sessions</p>
                      <p className="text-xs text-gray-500">Log out from this device immediately</p>
                    </div>
                  </div>
                  <Link
                    to="/logout"
                    className="px-5 py-2.5 rounded-xl bg-white/5 text-white text-sm font-medium hover:bg-red-500/10 hover:text-red-400 transition-all border border-white/10"
                  >
                    Logout
                  </Link>
                </div>

                <div className="h-px bg-red-500/10" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Delete admin account</p>
                      <p className="text-xs text-gray-500">This will permanently remove your account and cannot be undone</p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toast.info("Account deletion must be performed from the Users management page by another admin.")
                    }
                    className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all border border-red-500/20"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
