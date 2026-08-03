const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  // Trip details
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },

  // Group settings
  interests: [{ type: String }],
  maxParticipants: { type: Number, required: true },
  currentParticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Status (for trip lifecycle)
  tripStatus: {
    type: String,
    enum: ['open', 'closed', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },

  // Approval status (for admin review)
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  submittedBy: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  },

  // Trip settings
  isPublic: { type: Boolean, default: true },
  allowExternalJoin: { type: Boolean, default: true },

  // Cost splitting
  costSplitDetails: {
    transport: { type: Number, default: 0 },
    accommodation: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
    misc: { type: Number, default: 0 }
  },

  // Messaging
  groupChatEnabled: { type: Boolean, default: true },

  // Creator info (denormalized for display)
  creatorName: { type: String },
  creatorAvatar: { type: String },

  // Safety
  safetyVerified: { type: Boolean, default: false },

  // Stats
  viewCount: { type: Number, default: 0 },
  saveCount: { type: Number, default: 0 }
}, { timestamps: true });

tripSchema.index({ creatorId: 1 });
tripSchema.index({ destination: 1 });
tripSchema.index({ startDate: 1 });
tripSchema.index({ status: 1 });
tripSchema.index({ budget: 1 });
tripSchema.index({ interests: 1 });
tripSchema.index({ createdAt: -1 });

const Trip = new mongoose.model("Trip", tripSchema);

module.exports = Trip;
