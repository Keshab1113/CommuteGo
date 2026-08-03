const Destination = require("../models/destination-model.js");

// Get all destinations with filtering and pagination (public - only approved)
const getAllDestinations = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      difficulty,
      minBudget,
      maxBudget,
      tags,
      search,
      category,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = { status: 'approved' };

    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (minBudget || maxBudget) {
      query.estimatedBudget = {};
      if (minBudget) query.estimatedBudget.$gte = Number(minBudget);
      if (maxBudget) query.estimatedBudget.$lte = Number(maxBudget);
    }
    if (tags) {
      query.tags = { $in: tags.split(',') };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.name': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = { [sortBy]: order === 'desc' ? -1 : 1 };

    const [destinations, total] = await Promise.all([
      Destination.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit))
        .populate('createdBy', 'username email'),
      Destination.countDocuments(query)
    ]);

    res.status(200).json({
      destinations,
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

// Get pending destinations (admin only)
const getPendingDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username email');

    res.status(200).json({ destinations });
  } catch (error) {
    next(error);
  }
};

// Approve or reject destination (admin only)
const reviewDestination = async (req, res, next) => {
  try {
    const { status } = req.body;
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};

// Get featured destinations
const getFeaturedDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({ isFeatured: true })
      .sort({ viewCount: -1 })
      .limit(6)
      .populate('createdBy', 'username email');

    res.status(200).json(destinations);
  } catch (error) {
    next(error);
  }
};

// Get single destination by ID
const getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    ).populate('createdBy', 'username email');

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};

// Create destination (admin only)
const createDestination = async (req, res, next) => {
  try {
    const destination = await Destination.create({
      ...req.body,
      createdBy: req.user?.userID || null
    });

    res.status(201).json(destination);
  } catch (error) {
    next(error);
  }
};

// Update destination (admin only)
const updateDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    next(error);
  }
};

// Delete destination (admin only)
const deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDestinations,
  getFeaturedDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  getPendingDestinations,
  reviewDestination
};
