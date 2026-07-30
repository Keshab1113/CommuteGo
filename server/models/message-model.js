const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  content: { type: String, required: true, maxlength: 2000 },

  // Message type
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text'
  },

  // Attachments
  attachments: [{
    type: { type: String },
    url: { type: String }
  }],

  // Read status
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Reply reference
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },

  // Status
  isDeleted: { type: Boolean, default: false },
  isEdited: { type: Boolean, default: false }
}, { timestamps: true });

messageSchema.index({ conversationId: 1 });
messageSchema.index({ senderId: 1 });
messageSchema.index({ createdAt: -1 });

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
