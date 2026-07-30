const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const { adminMiddleware } = require("../middlewares/admin-middleware.js");
const {
  getAllBuddies,
  getBuddyById,
  getBuddyByUserId,
  upsertBuddyProfile,
  updateBuddyProfile,
  updateAvailability,
  deleteBuddyProfile,
  getPendingBuddies,
  reviewBuddy
} = require("../controllers/local-buddy-controller.js");

// Public routes (only approved buddies)
router.get("/", getAllBuddies);
router.get("/:id", getBuddyById);

// Authenticated routes
router.get("/me/profile", authMiddleware, getBuddyByUserId);
router.post("/", authMiddleware, upsertBuddyProfile);
router.put("/:id", authMiddleware, updateBuddyProfile);
router.patch("/availability", authMiddleware, updateAvailability);
router.delete("/:id", authMiddleware, deleteBuddyProfile);

// Admin routes
router.get("/admin/pending", authMiddleware, adminMiddleware, getPendingBuddies);
router.patch("/admin/:id/review", authMiddleware, adminMiddleware, reviewBuddy);

module.exports = router;
