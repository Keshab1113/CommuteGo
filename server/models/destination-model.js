const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

  // Media
  images: [{ type: String }],
  videos: [{ type: String }],

  // Characteristics
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging'],
    required: true
  },
  bestSeason: [{ type: String }],
  crowdLevel: {
    type: String,
    enum: ['Very Low', 'Low', 'Medium', 'High', 'Very High']
  },
  estimatedBudget: { type: Number, required: true },
  timeRequired: { type: String },
  safetyScore: { type: Number, min: 1, max: 10 },
  internetAvailability: { type: String },
  nearbyHospitals: { type: String },
  transportDetails: { type: String },
  localCuisine: [{ type: String }],
  photographySpots: [{ type: String }],

  // Categorization
  tags: [{ type: String }],
  category: {
    type: String,
    enum: ['adventure', 'nature', 'heritage', 'beach', 'spiritual', 'cultural']
  },

  // Location
  location: {
    name: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },

  // Extended content
  blogContent: { type: String, default: '' },
  adminNotes: { type: String, default: '' },
  additionalDetails: { type: String, default: '' },

  // How to reach routes
  howToReach: [{
    mode: { type: String, enum: ['Bus', 'Train', 'Flight', 'Personal Car'], required: true },
    steps: [{ type: String, required: true }]
  }],

  // Google Maps embed URL
  mapEmbedUrl: { type: String, default: '' },

  // Submitter contact info (collected from public user submissions)
  submitter: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' }
  },

  // Metadata
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submittedBy: { type: String, enum: ['admin', 'user'], default: 'admin' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  isVerified: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  saveCount: { type: Number, default: 0 }
}, { timestamps: true });

// Indexes for filtering
destinationSchema.index({ 'location.name': 1 });
destinationSchema.index({ difficulty: 1 });
destinationSchema.index({ tags: 1 });
destinationSchema.index({ estimatedBudget: 1 });
destinationSchema.index({ safetyScore: -1 });
destinationSchema.index({ createdAt: -1 });

const Destination = new mongoose.model("Destination", destinationSchema);

module.exports = Destination;
