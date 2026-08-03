const Trip = require("../models/trip-model.js");
const TripJoinRequest = require("../models/trip-join-request-model.js");
const User = require("../models/user-model.js");

// Get all trips with filtering (public - only approved)
const getAllTrips = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      destination,
      minBudget,
      maxBudget,
      interests,
      status = 'open',
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = { tripStatus: status, status: 'approved' };

    if (destination) query.destination = { $regex: destination, $options: 'i' };
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }
    if (interests) query.interests = { $in: interests.split(',') };

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = { [sortBy]: order === 'desc' ? -1 : 1 };

    const [trips, total] = await Promise.all([
      Trip.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit))
        .populate('creatorId', 'username email'),
      Trip.countDocuments(query)
    ]);

    res.status(200).json({
      trips,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single trip by ID
const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate('creatorId', 'username email')
     .populate('currentParticipants', 'username email');

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Only allow approved trips to be viewed publicly
    if (trip.status !== 'approved') {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

// Get user's created trips
const getMyTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ creatorId: req.user.userID })
      .sort({ createdAt: -1 })
      .populate('currentParticipants', 'username email');

    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

// Create trip
const createTrip = async (req, res, next) => {
  try {
    const userId = req.user?.userID || null;
    let user = null;
    let isAdmin = false;

    if (userId) {
      user = await User.findById(userId);
      isAdmin = user?.role === 'admin' || user?.isAdmin === true;
    }

    const tripData = {
      ...req.body,
      creatorId: userId,
      creatorName: user ? user.username : 'Anonymous Traveler',
      creatorAvatar: user ? user.avatar || null : null,
      currentParticipants: userId ? [userId] : [],
      status: isAdmin ? 'approved' : 'pending',
      submittedBy: isAdmin ? 'admin' : 'user'
    };

    const trip = await Trip.create(tripData);

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// Get pending trips (admin only)
const getPendingTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('creatorId', 'username email');

    res.status(200).json({ trips });
  } catch (error) {
    next(error);
  }
};

// Review trip (admin only)
const reviewTrip = async (req, res, next) => {
  try {
    const { status } = req.body;
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('creatorId', 'username email');

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

// Update trip (creator only)
const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.creatorId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this trip" });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('creatorId', 'username email');

    res.status(200).json(updatedTrip);
  } catch (error) {
    next(error);
  }
};

// Update trip status
const updateTripStatus = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.creatorId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this trip" });
    }

    trip.tripStatus = req.body.tripStatus;
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

// Delete/cancel trip (creator only)
const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.creatorId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this trip" });
    }

    trip.tripStatus = 'cancelled';
    await trip.save();

    res.status(200).json({ message: "Trip cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

// Request to join trip
const requestJoinTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.status !== 'open') {
      return res.status(400).json({ message: "Trip is not accepting join requests" });
    }

    if (trip.currentParticipants.includes(req.user.userID)) {
      return res.status(400).json({ message: "You are already a participant" });
    }

    // Check for existing pending request
    const existingRequest = await TripJoinRequest.findOne({
      tripId: req.params.id,
      userId: req.user.userID,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: "You already have a pending request" });
    }

    const request = await TripJoinRequest.create({
      tripId: req.params.id,
      userId: req.user.userID,
      message: req.body.message
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// Get join requests (creator only)
const getTripRequests = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.creatorId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view requests" });
    }

    const requests = await TripJoinRequest.find({ tripId: req.params.id })
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

// Respond to join request
const respondToRequest = async (req, res, next) => {
  try {
    const request = await TripJoinRequest.findById(req.params.id)
      .populate('tripId');

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const trip = await Trip.findById(request.tripId._id);

    if (trip.creatorId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to respond to requests" });
    }

    const { status } = req.body; // 'accepted' or 'rejected'

    if (status === 'accepted') {
      // Add user to trip participants
      if (!trip.currentParticipants.includes(request.userId)) {
        trip.currentParticipants.push(request.userId);
        await trip.save();
      }
    }

    request.status = status;
    request.respondedAt = new Date();
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  getMyTrips,
  createTrip,
  updateTrip,
  updateTripStatus,
  deleteTrip,
  requestJoinTrip,
  getTripRequests,
  respondToRequest,
  getPendingTrips,
  reviewTrip
};
