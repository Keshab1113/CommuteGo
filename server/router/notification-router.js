const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const {
  getNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notification-controller.js");

router.route("/").get(authMiddleware, getNotifications);
router.route("/read-all").patch(authMiddleware, markAllAsRead);
router.route("/:id").get(authMiddleware, getNotificationById);
router.route("/:id/read").patch(authMiddleware, markAsRead);
router.route("/:id").delete(authMiddleware, deleteNotification);

module.exports = router;
