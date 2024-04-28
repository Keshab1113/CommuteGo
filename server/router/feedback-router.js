const express = require("express");
const router = express.Router();
const { feedbackForm, getFeedbackDatas } = require("../controllers/feedback-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const feedbackController = require("../controllers/feedback-controller");

router.route("/feedback").post(feedbackForm);
router.route("/feedback").get(authMiddleware, adminMiddleware, feedbackController.getFeedbackDatas);
router.route("/getallfeedbacks").get(getFeedbackDatas);
router.route("/feedback/update/:id").patch(authMiddleware, adminMiddleware, feedbackController.updateFeedBackById);
router.route("/feedback/:id").get(authMiddleware, adminMiddleware, feedbackController.getFeedBackById);
router.route("/feedback/delete/:id").delete(authMiddleware, adminMiddleware, feedbackController.deleteFeedBackById);

module.exports = router;