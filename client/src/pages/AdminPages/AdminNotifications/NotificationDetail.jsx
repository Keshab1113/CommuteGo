import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Bell,
  ArrowLeft,
  Clock,
  Check,
  Trash2,
  MapPin,
  UserCheck,
  Backpack,
  MessageSquare,
  Users,
  Star,
  Globe,
  Sparkles,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { notificationsApi } from "../../../services/api/adminApi";
import { useNotifications } from "../../../context/NotificationContext";

const typeStyles = {
  info: { icon: Bell, color: "bg-cyan-500/10 text-cyan-400", label: "Info" },
  success: { icon: Check, color: "bg-emerald-500/10 text-emerald-400", label: "Success" },
  warning: { icon: AlertTriangle, color: "bg-yellow-500/10 text-yellow-400", label: "Warning" },
  error: { icon: Trash2, color: "bg-red-500/10 text-red-400", label: "Error" },
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

const entityRoutes = {
  destination: "/admin/destinations",
  localBuddy: "/admin/local-buddies",
  trip: "/admin/trips",
  feedback: "/admin/feedbacks",
  user: "/admin/users",
  review: "/admin/feedbacks",
  experience: "/admin/local-buddies",
  system: null,
};

const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteNotification } = useNotifications();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await notificationsApi.getById(id);
        setNotification(response.data);
      } catch (error) {
        const msg = error.response?.data?.message || "Failed to load notification";
        toast.error(msg);
        navigate("/admin/notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await deleteNotification(id);
      navigate("/admin/notifications");
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!notification) return null;

  const EntityIcon = entityIcons[notification.entityType] || Sparkles;
  const styles = typeStyles[notification.type] || typeStyles.info;
  const relatedRoute = entityRoutes[notification.entityType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/notifications"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to notifications
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {/* Card */}
      <div className="bg-[#1C1B1B] rounded-3xl border border-white/10 overflow-hidden">
        <div className={`p-8 ${styles.color} bg-opacity-20`}>
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl ${styles.color} flex items-center justify-center`}>
              <EntityIcon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles.color}`}>
                  {styles.label}
                </span>
                <span className="text-xs text-gray-500 capitalize">{notification.entityType}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{notification.title}</h1>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Message</h2>
            <p className="text-lg text-gray-200 leading-relaxed">{notification.message}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <div className="flex items-center gap-2">
                {notification.isRead ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-white">Read</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-sm text-white">Unread</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-xs text-gray-500 mb-1">Received at</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-white">{formatDateTime(notification.createdAt)}</span>
              </div>
            </div>
          </div>

          {relatedRoute && (
            <div className="pt-4 border-t border-white/10">
              <Link
                to={relatedRoute}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Go to related {notification.entityType}s
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationDetail;
