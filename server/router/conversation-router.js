const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const {
  getUserConversations,
  getOrCreateConversation,
  getConversationById,
  getMessages,
  markAsRead
} = require("../controllers/conversation-controller.js");

// All routes require authentication
router.use(authMiddleware);

router.get("/", getUserConversations);
router.post("/", getOrCreateConversation);
router.get("/:id", getConversationById);
router.get("/:id/messages", getMessages);
router.patch("/:id/read", markAsRead);

module.exports = router;
