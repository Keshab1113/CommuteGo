const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth-middleware.js");
const { adminMiddleware } = require("../middlewares/admin-middleware.js");
const {
  getAllTrips,
  getTripById,
  getAdminTripById,
  getMyTrips,
  createTrip,
  updateTrip,
  updateTripStatus,
  deleteTrip,
  requestJoinTrip,
  getTripRequests,
  respondToRequest,
  getPendingTrips,
  reviewTrip,
  getTripFilters
} = require("../controllers/trip-controller.js");

// Public routes (only approved trips)
router.get("/", getAllTrips);
router.get("/filters", getTripFilters);
router.get("/:id", getTripById);

// Public submission route (no login required)
router.post("/", createTrip);

// Authenticated routes
router.get("/my/trips", authMiddleware, getMyTrips);
router.put("/:id", authMiddleware, updateTrip);
router.patch("/:id/status", authMiddleware, updateTripStatus);
router.delete("/:id", authMiddleware, deleteTrip);

// Join requests
router.post("/:id/join", authMiddleware, requestJoinTrip);
router.get("/:id/requests", authMiddleware, getTripRequests);

// Request management
router.patch("/requests/:id", authMiddleware, respondToRequest);

// Admin routes
router.get("/admin/pending", authMiddleware, adminMiddleware, getPendingTrips);
router.get("/admin/:id", authMiddleware, adminMiddleware, getAdminTripById);
router.patch("/admin/:id/review", authMiddleware, adminMiddleware, reviewTrip);

module.exports = router;
