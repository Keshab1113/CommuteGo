import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  Trash2,
  Clock,
  MapPin,
  UserCheck,
  Backpack,
  MessageSquare,
  Users,
  Star,
  Globe,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Loader2,
  Inbox,
} from "lucide-react";
import { useNotifications } from "../../../context/NotificationContext";

const typeStyles = {
  info: { icon: Bell, color: "bg-cyan-500/10 text-cyan-400", border: "border-cyan-500/20" },
  success: { icon: Check, color: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/20" },
  warning: { icon: AlertTriangle, color: "bg-yellow-500/10 text-yellow-400", border: "border-yellow-500/20" },
  error: { icon: Trash2, color: "bg-red-500/10 text-red-400", border: "border-red-500/20" },
};

const entityIcons = {
  destination: MapPin,
  localBuddy: UserCheck,
  trip: Backpack,
  feedback: MessageSquare,
  user: Users,
  review: Star,
  experience: Globe,
  system: Sparkles,
};

const AdminNotifications = () => {
  const { notifications, unreadCount, loading, fetchNotifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.isRead;
    return notif.type === filter;
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRowClick = (notif) => {
    if (!notif.isRead) markAsRead(notif._id);
    navigate(`/admin/notifications/${notif._id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-500" />
            Notifications
          </h1>
          <p className="text-sm text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchNotifications(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Refresh
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all"
            >
              <Check className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "info", label: "Info" },
          { id: "success", label: "Success" },
          { id: "warning", label: "Warnings" },
          { id: "error", label: "Errors" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.id
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1C1B1B] rounded-2xl border border-white/10 overflow-hidden"
        >
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-lg font-medium text-gray-300">No notifications found</p>
              <p className="text-sm text-gray-500 mt-1">
                {filter === "all" ? "Website activity will appear here" : "Try changing the filter"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredNotifications.map((notif) => {
                const EntityIcon = entityIcons[notif.entityType] || Sparkles;
                const styles = typeStyles[notif.type] || typeStyles.info;

                return (
                  <div
                    key={notif._id}
                    className={`p-4 sm:p-5 hover:bg-white/5 transition-all group ${
                      !notif.isRead ? "bg-cyan-500/[0.03]" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${styles.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <EntityIcon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleRowClick(notif)}>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className={`text-sm font-semibold ${!notif.isRead ? "text-white" : "text-gray-300"}`}>
                                {notif.title}
                              </h3>
                              {!notif.isRead && (
                                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-medium">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDateTime(notif.createdAt)}
                              </span>
                              <span className={`px-2 py-0.5 rounded-md border ${styles.border} ${styles.color.split(" ")[1]}`}>
                                {notif.type}
                              </span>
                              <span className="capitalize text-gray-500">{notif.entityType}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notif.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notif._id);
                                }}
                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
                                title="Mark as read"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notif._id);
                              }}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AdminNotifications;
