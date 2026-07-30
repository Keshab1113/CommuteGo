const mongoose = require("mongoose");

const tripJoinRequestSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  message: { type: String, maxlength: 500 },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },

  // For rejected requests
  rejectionReason: { type: String },

  // Response timestamp
  respondedAt: { type: Date }
}, { timestamps: true });

tripJoinRequestSchema.index({ tripId: 1, userId: 1 });
tripJoinRequestSchema.index({ userId: 1 });
tripJoinRequestSchema.index({ status: 1 });

const TripJoinRequest = new mongoose.model("TripJoinRequest", tripJoinRequestSchema);

module.exports = TripJoinRequest;
