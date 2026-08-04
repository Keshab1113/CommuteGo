/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { notificationsApi } from "../services/api/adminApi";
import { useAuth } from "../store/auth";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  const fetchNotifications = useCallback(async (showToast = false) => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await notificationsApi.getAll({ limit: 50 });
      const data = response.data || {};
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      if (showToast) toast.success("Notifications refreshed");
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const markAsRead = useCallback(async (id) => {
    try {
      await notificationsApi.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error("Failed to mark as read");
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark all as read");
    }
  }, []);

  const deleteNotification = useCallback(async (id) => {
    try {
      await notificationsApi.delete(id);
      const removed = notifications.find((n) => n._id === id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      if (removed && !removed.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Failed to delete notification");
    }
  }, [notifications]);

  // Initial fetch and polling
  useEffect(() => {
    if (user && !isLoading) {
      fetchNotifications();

      intervalRef.current = setInterval(() => {
        fetchNotifications();
      }, 30000); // Poll every 30 seconds

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [user, isLoading, fetchNotifications]);

  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
