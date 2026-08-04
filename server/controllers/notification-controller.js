const Notification = require("../models/notification-model.js");

// Get notifications for the authenticated user/admin
const getNotifications = async (req, res, next) => {
  try {
    const userId = req.userID;
    const isAdmin = req.user?.isAdmin === true;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Admins see admin-wide notifications (recipient: null) + their own.
    // Regular users only see notifications addressed to them.
    let query = {};
    if (isAdmin) {
      query = { $or: [{ recipient: null }, { recipient: userId }] };
    } else {
      query = { recipient: userId };
    }

    if (unreadOnly === "true" || unreadOnly === true) {
      query.isRead = false;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Notification.countDocuments(query),
      Notification.countDocuments({
        ...(isAdmin ? { $or: [{ recipient: null }, { recipient: userId }] } : { recipient: userId }),
        isRead: false,
      }),
    ]);

    res.status(200).json({
      notifications,
      unreadCount,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single notification by id
const getNotificationById = async (req, res, next) => {
  try {
    const userId = req.userID;
    const isAdmin = req.user?.isAdmin === true;
    const { id } = req.params;

    const notification = await Notification.findById(id).lean();
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Authorization check
    if (notification.recipient) {
      if (notification.recipient.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized to view this notification" });
      }
    } else if (!isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this notification" });
    }

    // Mark as read on open
    if (!notification.isRead) {
      await Notification.findByIdAndUpdate(id, { isRead: true });
      notification.isRead = true;
    }

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

// Mark single notification as read
const markAsRead = async (req, res, next) => {
  try {
    const userId = req.userID;
    const isAdmin = req.user?.isAdmin === true;
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.recipient) {
      if (notification.recipient.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
    } else if (!isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read", notification });
  } catch (error) {
    next(error);
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.userID;
    const isAdmin = req.user?.isAdmin === true;

    let query = {};
    if (isAdmin) {
      query = { $or: [{ recipient: null }, { recipient: userId }], isRead: false };
    } else {
      query = { recipient: userId, isRead: false };
    }

    const result = await Notification.updateMany(query, { isRead: true });

    res.status(200).json({ message: "All notifications marked as read", modifiedCount: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};

// Delete a notification
const deleteNotification = async (req, res, next) => {
  try {
    const userId = req.userID;
    const isAdmin = req.user?.isAdmin === true;
    const { id } = req.params;

    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.recipient) {
      if (notification.recipient.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
    } else if (!isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Notification.findByIdAndDelete(id);

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
