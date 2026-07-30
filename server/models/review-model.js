const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Polymorphic reference
  targetType: {
    type: String,
    enum: ['destination', 'localBuddy', 'experience', 'trip'],
    required: true
  },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },

  // Review content
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 1000 },

  // Media
  images: [{ type: String }],

  // Feedback categories
  categories: {
    safety: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 },
    experience: { type: Number, min: 1, max: 5 }
  },

  // Helpfulness votes
  helpfulCount: { type: Number, default: 0 },
  notHelpfulCount: { type: Number, default: 0 },

  // Status
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

reviewSchema.index({ targetType: 1, targetId: 1 });
reviewSchema.index({ reviewerId: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
