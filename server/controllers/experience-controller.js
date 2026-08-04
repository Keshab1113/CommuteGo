const Experience = require("../models/experience-model.js");
const { createNotification } = require("../utils/notification-helper.js");

// Get all experiences with filtering
const getAllExperiences = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = { isActive: true };

    if (city) query['location.city'] = city;
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = { [sortBy]: order === 'desc' ? -1 : 1 };

    const [experiences, total] = await Promise.all([
      Experience.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit))
        .populate('localBuddyId', 'displayName profileImage rating location'),
      Experience.countDocuments(query)
    ]);

    res.status(200).json({
      experiences,
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

// Get single experience by ID
const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('localBuddyId', 'displayName profileImage rating bio languages location');

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
};

// Get experiences by local buddy
const getExperiencesByBuddy = async (req, res, next) => {
  try {
    const experiences = await Experience.find({
      localBuddyId: req.params.buddyId,
      isActive: true
    }).sort({ createdAt: -1 });

    res.status(200).json(experiences);
  } catch (error) {
    next(error);
  }
};

// Create experience (buddy only)
const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);

    await createNotification({
      title: "New experience added",
      message: `"${experience.title || "An experience"}" has been added by a local buddy.`,
      type: "info",
      entityType: "experience",
      entityId: experience._id,
    });

    res.status(201).json(experience);
  } catch (error) {
    next(error);
  }
};

// Update experience (owner only)
const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Check ownership via LocalBuddy
    const LocalBuddy = require("../models/local-buddy-model.js");
    const buddy = await LocalBuddy.findById(experience.localBuddyId);

    if (!buddy || (buddy.userId.toString() !== req.user.userID && !req.user.isAdmin)) {
      return res.status(403).json({ message: "Not authorized to update this experience" });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedExperience);
  } catch (error) {
    next(error);
  }
};

// Delete experience (owner only)
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const LocalBuddy = require("../models/local-buddy-model.js");
    const buddy = await LocalBuddy.findById(experience.localBuddyId);

    if (!buddy || (buddy.userId.toString() !== req.user.userID && !req.user.isAdmin)) {
      return res.status(403).json({ message: "Not authorized to delete this experience" });
    }

    // Soft delete
    experience.isActive = false;
    await experience.save();

    await createNotification({
      title: "Experience removed",
      message: `"${experience.title || "An experience"}" has been removed.`,
      type: "warning",
      entityType: "experience",
      entityId: experience._id,
    });

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  getExperiencesByBuddy,
  createExperience,
  updateExperience,
  deleteExperience
};
