const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["info", "success", "warning", "error"],
    default: "info",
  },
  entityType: {
    type: String,
    enum: [
      "destination",
      "localBuddy",
      "trip",
      "feedback",
      "user",
      "review",
      "experience",
      "system",
    ],
    default: "system",
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "entityType",
    default: null,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: -1,
  },
});

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ entityType: 1, entityId: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
