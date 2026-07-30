const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware");
const { adminMiddleware } = require("../middlewares/admin-middleware");
const {
    feedbackForm,
    getFeedbackDatas,
    getApprovedReviews,
    updateFeedBackById,
    getFeedBackById,
    deleteFeedBackById
} = require("../controllers/feedback-controller");

// Public routes
router.route("/reviews/approved").get(getApprovedReviews);
router.route("/").post(feedbackForm);

// Admin routes (protected)
router.route("/").get(authMiddleware, adminMiddleware, getFeedbackDatas);
router.route("/:id").get(authMiddleware, adminMiddleware, getFeedBackById);
router.route("/:id").patch(authMiddleware, adminMiddleware, updateFeedBackById);
router.route("/:id").delete(authMiddleware, adminMiddleware, deleteFeedBackById);

module.exports = router;
