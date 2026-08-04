const LocalBuddy = require("../models/local-buddy-model.js");
const { createNotification } = require("../utils/notification-helper.js");

// Get all local buddies with filtering (public - only approved)
const getAllBuddies = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      language,
      minPrice,
      maxPrice,
      interests,
      search,
      sortBy = 'rating',
      order = 'desc'
    } = req.query;

    const query = { isActive: true, status: 'approved' };

    if (city) query['location.city'] = city;
    if (language) query.languages = { $in: language.split(',') };
    if (minPrice || maxPrice) {
      query.dayRate = {};
      if (minPrice) query.dayRate.$gte = Number(minPrice);
      if (maxPrice) query.dayRate.$lte = Number(maxPrice);
    }
    if (interests) query.interests = { $in: interests.split(',') };
    if (search) {
      query.$or = [
        { displayName: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = { [sortBy]: order === 'desc' ? -1 : 1 };

    const [buddies, total] = await Promise.all([
      LocalBuddy.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit))
        .populate('userId', 'username email'),
      LocalBuddy.countDocuments(query)
    ]);

    res.status(200).json({
      buddies,
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

// Get single buddy by ID
const getBuddyById = async (req, res, next) => {
  try {
    const buddy = await LocalBuddy.findById(req.params.id)
      .populate('userId', 'username email');

    if (!buddy) {
      return res.status(404).json({ message: "Local Buddy not found" });
    }

    res.status(200).json(buddy);
  } catch (error) {
    next(error);
  }
};

// Get buddy by user ID
const getBuddyByUserId = async (req, res, next) => {
  try {
    const buddy = await LocalBuddy.findOne({ userId: req.user.userID })
      .populate('userId', 'username email');

    if (!buddy) {
      return res.status(404).json({ message: "Local Buddy profile not found" });
    }

    res.status(200).json(buddy);
  } catch (error) {
    next(error);
  }
};

// Create or update buddy profile
const upsertBuddyProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userID || null;
    const existingBuddy = userId
      ? await LocalBuddy.findOne({ userId })
      : null;

    if (existingBuddy) {
      // Update existing
      const updatedBuddy = await LocalBuddy.findByIdAndUpdate(
        existingBuddy._id,
        req.body,
        { new: true, runValidators: true }
      ).populate('userId', 'username email');
      return res.status(200).json(updatedBuddy);
    }

    // Create new
    const createdBuddy = await LocalBuddy.create({
      ...req.body,
      userId
    });

    const buddy = await LocalBuddy.findById(createdBuddy._id)
      .populate('userId', 'username email');

    await createNotification({
      title: "New local buddy application",
      message: `"${buddy.displayName || buddy.userId?.username || "A user"}" applied to become a local buddy.`,
      type: "info",
      entityType: "localBuddy",
      entityId: buddy._id,
    });

    res.status(201).json(buddy);
  } catch (error) {
    next(error);
  }
};

// Update buddy profile (owner only)
const updateBuddyProfile = async (req, res, next) => {
  try {
    const buddy = await LocalBuddy.findById(req.params.id);

    if (!buddy) {
      return res.status(404).json({ message: "Local Buddy not found" });
    }

    if (buddy.userId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const updatedBuddy = await LocalBuddy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    res.status(200).json(updatedBuddy);
  } catch (error) {
    next(error);
  }
};

// Update availability
const updateAvailability = async (req, res, next) => {
  try {
    const buddy = await LocalBuddy.findOne({ userId: req.user.userID });

    if (!buddy) {
      return res.status(404).json({ message: "Local Buddy not found" });
    }

    buddy.availability = req.body.availability;
    buddy.isAvailableNow = req.body.isAvailableNow || false;
    await buddy.save();

    res.status(200).json(buddy);
  } catch (error) {
    next(error);
  }
};

// Delete buddy profile (owner only)
const deleteBuddyProfile = async (req, res, next) => {
  try {
    const buddy = await LocalBuddy.findById(req.params.id);

    if (!buddy) {
      return res.status(404).json({ message: "Local Buddy not found" });
    }

    if (buddy.userId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this profile" });
    }

    await LocalBuddy.findByIdAndDelete(req.params.id);

    await createNotification({
      title: "Local buddy deleted",
      message: `"${buddy.displayName || buddy.userId?.username || "A local buddy"}" profile has been removed.`,
      type: "error",
      entityType: "localBuddy",
      entityId: buddy._id,
    });

    res.status(200).json({ message: "Local Buddy profile deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get pending buddy applications (admin only)
const getPendingBuddies = async (req, res, next) => {
  try {
    const buddies = await LocalBuddy.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('userId', 'username email');

    res.status(200).json({ buddies });
  } catch (error) {
    next(error);
  }
};

// Review buddy application (admin only)
const reviewBuddy = async (req, res, next) => {
  try {
    const { status } = req.body;
    const buddy = await LocalBuddy.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!buddy) {
      return res.status(404).json({ message: "Local Buddy not found" });
    }

    await createNotification({
      title: `Local buddy ${status === "approved" ? "approved" : "rejected"}`,
      message: `"${buddy.displayName || buddy.userId?.username || "A local buddy"}" has been ${status === "approved" ? "approved" : "rejected"}.`,
      type: status === "approved" ? "success" : "warning",
      entityType: "localBuddy",
      entityId: buddy._id,
    });

    res.status(200).json(buddy);
  } catch (error) {
    next(error);
  }
};

// Get available filter values (interests, cities)
const getBuddyFilters = async (req, res, next) => {
  try {
    const [interests, cities] = await Promise.all([
      LocalBuddy.distinct('interests', { status: 'approved', isActive: true }),
      LocalBuddy.distinct('location.city', { status: 'approved', isActive: true }),
    ]);

    res.status(200).json({
      interests: interests.filter(Boolean).sort(),
      cities: cities.filter(Boolean).sort(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBuddies,
  getBuddyById,
  getBuddyByUserId,
  upsertBuddyProfile,
  updateBuddyProfile,
  updateAvailability,
  deleteBuddyProfile,
  getPendingBuddies,
  reviewBuddy,
  getBuddyFilters,
};
