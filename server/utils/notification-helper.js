const Notification = require("../models/notification-model.js");

/**
 * Create a notification.
 *
 * @param {Object} data
 * @param {string} data.title
 * @param {string} data.message
 * @param {string} [data.type='info'] - 'info' | 'success' | 'warning' | 'error'
 * @param {string} [data.entityType='system']
 * @param {string|mongoose.Types.ObjectId} [data.entityId]
 * @param {string|mongoose.Types.ObjectId} [data.recipient] - null for admin-wide notifications
 */
const createNotification = async (data) => {
  try {
    if (!data.title || !data.message) {
      console.error("Notification requires title and message", data);
      return null;
    }

    const notification = await Notification.create({
      title: data.title,
      message: data.message,
      type: data.type || "info",
      entityType: data.entityType || "system",
      entityId: data.entityId || null,
      recipient: data.recipient || null,
    });

    return notification;
  } catch (error) {
    console.error("Failed to create notification:", error);
    return null;
  }
};

module.exports = { createNotification };
