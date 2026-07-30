const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  localBuddyId: { type: mongoose.Schema.Types.ObjectId, ref: 'LocalBuddy', required: true },
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 2000 },

  // Duration & Pricing
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },

  // Group settings
  groupSize: {
    min: { type: Number, default: 1 },
    max: { type: Number, required: true }
  },
  currentParticipants: { type: Number, default: 0 },

  // What's included
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],

  // Location
  location: {
    meetingPoint: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: { lat: Number, lng: Number }
  },

  // Media
  images: [{ type: String }],

  // Categorization
  category: {
    type: String,
    enum: ['tour', 'food', 'adventure', 'cultural', 'photography', 'wellness']
  },
  tags: [{ type: String }],

  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

experienceSchema.index({ localBuddyId: 1 });
experienceSchema.index({ category: 1 });
experienceSchema.index({ price: 1 });
experienceSchema.index({ 'location.city': 1 });

const Experience = new mongoose.model("Experience", experienceSchema);

module.exports = Experience;
