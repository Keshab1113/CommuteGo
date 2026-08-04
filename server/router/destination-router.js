const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const { adminMiddleware } = require("../middlewares/admin-middleware.js");
const {
  getAllDestinations,
  getFeaturedDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getPendingDestinations,
  reviewDestination,
  getDestinationFilters,
  askSubmitter
} = require("../controllers/destination-controller.js");

// Public routes (only approved destinations)
router.get("/", getAllDestinations);
router.get("/featured", getFeaturedDestinations);
router.get("/:id", getDestinationById);

// User submission route (public - no login required)
router.post("/", createDestination);

// Filter metadata
router.get("/filters", getDestinationFilters);

// Admin routes
router.get("/admin/pending", authMiddleware, adminMiddleware, getPendingDestinations);
router.patch("/admin/:id/review", authMiddleware, adminMiddleware, reviewDestination);
router.post("/admin/:id/ask", authMiddleware, adminMiddleware, askSubmitter);
router.put("/:id", authMiddleware, adminMiddleware, updateDestination);
router.delete("/:id", authMiddleware, adminMiddleware, deleteDestination);

module.exports = router;
