const mongoose = require("mongoose");

const localBuddySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  displayName: { type: String, required: true },

  // Languages & Skills
  languages: [{ type: String, required: true }],
  interests: [{ type: String }],
  certifications: [{ type: String }],

  // Pricing
  hourlyRate: { type: Number },
  dayRate: { type: Number, required: true },
  priceNegotiable: { type: Boolean, default: false },
  currency: { type: String, default: 'INR' },

  // Performance metrics
  responseTime: { type: String },
  experienceCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },

  // Availability
  availability: [{
    dayOfWeek: { type: Number },
    startTime: { type: String },
    endTime: { type: String }
  }],
  isAvailableNow: { type: Boolean, default: false },

  // Content
  profileImage: { type: String },
  introVideo: { type: String },
  bio: { type: String, maxlength: 500 },

  // Location
  location: {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, default: 'India' },
    coordinates: { lat: Number, lng: Number }
  },

  // Status
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedBy: { type: String, enum: ['admin', 'user'], default: 'admin' },
  isVerified: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  // Stats
  tripsCompleted: { type: Number, default: 0 },
  memberSince: { type: Date }
}, { timestamps: true });

localBuddySchema.index({ userId: 1 });
localBuddySchema.index({ 'location.city': 1 });
localBuddySchema.index({ languages: 1 });
localBuddySchema.index({ dayRate: 1 });
localBuddySchema.index({ rating: -1 });

const LocalBuddy = new mongoose.model("LocalBuddy", localBuddySchema);

module.exports = LocalBuddy;
