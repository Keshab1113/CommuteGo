const Review = require("../models/review-model.js");

// Create a review
const createReview = async (req, res, next) => {
  try {
    const { targetType, targetId, rating, comment, images, categories } = req.body;

    // Check if user already reviewed this target
    const existingReview = await Review.findOne({
      reviewerId: req.user.userID,
      targetType,
      targetId
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this item" });
    }

    const review = await Review.create({
      reviewerId: req.user.userID,
      targetType,
      targetId,
      rating,
      comment,
      images,
      categories
    });

    // Update target's average rating
    await updateTargetRating(targetType, targetId);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

// Get reviews for a target
const getReviewsForTarget = async (req, res, next) => {
  try {
    const { targetType, targetId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const query = { targetType, targetId, isPublished: true };
    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('reviewerId', 'username email'),
      Review.countDocuments(query)
    ]);

    // Calculate average rating
    const avgRating = await Review.aggregate([
      { $match: { targetType, targetId, isPublished: true } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);

    res.status(200).json({
      reviews,
      averageRating: avgRating[0]?.avgRating || 0,
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

// Get user's reviews
const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ reviewerId: req.user.userID })
      .sort({ createdAt: -1 })
      .populate('targetId');

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Get all reviews (admin)
const getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [reviews, total] = await Promise.all([
      Review.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('reviewerId', 'username email'),
      Review.countDocuments()
    ]);

    res.status(200).json({
      reviews,
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

// Delete a review (author only)
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.reviewerId.toString() !== req.user.userID && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    const targetType = review.targetType;
    const targetId = review.targetId;

    await Review.findByIdAndDelete(req.params.id);

    // Update target's average rating
    await updateTargetRating(targetType, targetId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Helper function to update target's average rating
async function updateTargetRating(targetType, targetId) {
  const avgRating = await Review.aggregate([
    { $match: { targetType, targetId, isPublished: true } },
    { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);

  if (avgRating.length === 0) return;

  const { avgRating: rating, count } = avgRating[0];

  switch (targetType) {
    case 'destination':
      const Destination = require("../models/destination-model.js");
      await Destination.findByIdAndUpdate(targetId, { rating: Math.round(rating * 10) / 10, reviewCount: count });
      break;
    case 'localBuddy':
      const LocalBuddy = require("../models/local-buddy-model.js");
      await LocalBuddy.findByIdAndUpdate(targetId, { rating: Math.round(rating * 10) / 10, reviewCount: count });
      break;
    case 'experience':
      const Experience = require("../models/experience-model.js");
      await Experience.findByIdAndUpdate(targetId, { rating: Math.round(rating * 10) / 10, reviewCount: count });
      break;
  }
}

module.exports = {
  createReview,
  getReviewsForTarget,
  getMyReviews,
  deleteReview,
  getAllReviews
};
