const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const {
  sendMessage,
  markMessageAsRead,
  deleteMessage
} = require("../controllers/message-controller.js");

// All routes require authentication
router.use(authMiddleware);

router.post("/", sendMessage);
router.patch("/:id/read", markMessageAsRead);
router.delete("/:id", deleteMessage);

module.exports = router;
