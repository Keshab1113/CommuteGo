const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const { adminMiddleware } = require("../middlewares/admin-middleware.js");
const {
  getAllExperiences,
  getExperienceById,
  getExperiencesByBuddy,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experience-controller.js");

// Public routes
router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);
router.get("/buddy/:buddyId", getExperiencesByBuddy);

// Authenticated routes
router.post("/", authMiddleware, createExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

module.exports = router;
