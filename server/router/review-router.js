const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const { adminMiddleware } = require("../middlewares/admin-middleware.js");
const {
  createReview,
  getReviewsForTarget,
  getMyReviews,
  deleteReview,
  getAllReviews
} = require("../controllers/review-controller.js");

// Public routes
router.get("/:targetType/:targetId", getReviewsForTarget);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, getAllReviews);

// Authenticated routes
router.post("/", authMiddleware, createReview);
router.get("/my/reviews", authMiddleware, getMyReviews);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
