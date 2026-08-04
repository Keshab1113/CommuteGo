const Destination = require("../models/destination-model.js");
const Conversation = require("../models/conversation-model.js");
const Message = require("../models/message-model.js");
const { createNotification } = require("../utils/notification-helper.js");

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

    await createNotification({
      title: `Destination ${status === "approved" ? "approved" : "rejected"}`,
      message: `"${destination.name}" has been ${status === "approved" ? "approved and published" : "rejected"}.`,
      type: status === "approved" ? "success" : "warning",
      entityType: "destination",
      entityId: destination._id,
    });

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

// Create destination (public user submission or admin)
const createDestination = async (req, res, next) => {
  try {
    const { submitter, ...rest } = req.body;

    const destination = await Destination.create({
      ...rest,
      submitter: submitter || {},
      createdBy: req.user?.userID || null
    });

    await createNotification({
      title: "New destination submitted",
      message: `"${destination.name}" has been submitted and is awaiting review.`,
      type: destination.status === "approved" ? "success" : "info",
      entityType: "destination",
      entityId: destination._id,
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

// Ask the submitting user a question (admin only)
const askSubmitter = async (req, res, next) => {
  try {
    const { message } = req.body;
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    if (!destination.createdBy) {
      return res.status(400).json({
        message: "Cannot ask question: destination was submitted anonymously."
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const adminId = req.user.userID;
    const submitterId = destination.createdBy.toString();

    // Find or create direct conversation between admin and submitter
    let conversation = await Conversation.findOne({
      participants: { $all: [adminId, submitterId] },
      type: 'direct',
      isActive: true
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [adminId, submitterId],
        type: 'direct',
        relatedTo: { type: 'destination', id: destination._id }
      });
    }

    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId: adminId,
      content: message.trim(),
      type: 'text'
    });

    // Update conversation lastMessage and unread count for submitter
    conversation.lastMessage = {
      content: message.trim(),
      senderId: adminId,
      createdAt: newMessage.createdAt
    };

    const unreadIndex = conversation.unreadCount.findIndex(
      uc => uc.userId.toString() === submitterId
    );
    if (unreadIndex > -1) {
      conversation.unreadCount[unreadIndex].count += 1;
    } else {
      conversation.unreadCount.push({ userId: submitterId, count: 1 });
    }
    await conversation.save();

    res.status(201).json({ message: "Question sent", conversationId: conversation._id });
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

    await createNotification({
      title: "Destination deleted",
      message: `"${destination.name}" has been removed from the platform.`,
      type: "error",
      entityType: "destination",
      entityId: destination._id,
    });

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get available filter values (tags, categories, difficulty)
const getDestinationFilters = async (req, res, next) => {
  try {
    const [tags, categories, difficulties] = await Promise.all([
      Destination.distinct('tags', { status: 'approved' }),
      Destination.distinct('category', { status: 'approved' }),
      Destination.distinct('difficulty', { status: 'approved' }),
    ]);

    res.status(200).json({
      tags: tags.filter(Boolean).sort(),
      categories: categories.filter(Boolean).sort(),
      difficulties: difficulties.filter(Boolean).sort(),
    });
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
  reviewDestination,
  getDestinationFilters,
  askSubmitter,
};
