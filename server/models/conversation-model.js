const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Type of conversation
  type: {
    type: String,
    enum: ['direct', 'trip-group', 'experience-inquiry'],
    default: 'direct'
  },

  // Reference (trip or experience if applicable)
  relatedTo: {
    type: { type: String },
    id: { type: mongoose.Schema.Types.ObjectId }
  },

  // Last message summary
  lastMessage: {
    content: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date }
  },

  // Unread counts per user
  unreadCount: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    count: { type: Number, default: 0 }
  }],

  // Status
  isActive: { type: Boolean, default: true },
  isPinned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

conversationSchema.index({ participants: 1 });
conversationSchema.index({ type: 1 });
conversationSchema.index({ 'lastMessage.createdAt': -1 });

const Conversation = new mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
