const Conversation = require("../models/conversation-model.js");
const Message = require("../models/message-model.js");

// Get user's conversations
const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.userID,
      isActive: true
    })
      .sort({ 'lastMessage.createdAt': -1 })
      .populate('participants', 'username email avatar')
      .populate('relatedTo.id');

    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

// Get or create conversation
const getOrCreateConversation = async (req, res, next) => {
  try {
    const { participantId, type = 'direct', relatedTo } = req.body;

    // Check if conversation already exists between participants
    const existingConversation = await Conversation.findOne({
      participants: { $all: [req.user.userID, participantId] },
      type,
      isActive: true
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Create new conversation
    const conversation = await Conversation.create({
      participants: [req.user.userID, participantId],
      type,
      relatedTo
    });

    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

// Get conversation by ID
const getConversationById = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('participants', 'username email avatar')
      .populate('relatedTo.id');

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Check if user is a participant
    if (!conversation.participants.some(p => p._id.toString() === req.user.userID)) {
      return res.status(403).json({ message: "Not authorized to view this conversation" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};

// Get messages for a conversation
const getMessages = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (!conversation.participants.includes(req.user.userID)) {
      return res.status(403).json({ message: "Not authorized to view messages" });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const messages = await Message.find({
      conversationId: req.params.id,
      isDeleted: false
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('senderId', 'username email avatar');

    res.status(200).json(messages.reverse());
  } catch (error) {
    next(error);
  }
};

// Mark conversation as read
const markAsRead = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Update unread count for current user
    const unreadIndex = conversation.unreadCount.findIndex(
      uc => uc.userId.toString() === req.user.userID
    );

    if (unreadIndex > -1) {
      conversation.unreadCount[unreadIndex].count = 0;
      await conversation.save();
    }

    // Mark all messages as read
    await Message.updateMany(
      {
        conversationId: req.params.id,
        senderId: { $ne: req.user.userID },
        readBy: { $ne: req.user.userID }
      },
      { $addToSet: { readBy: req.user.userID } }
    );

    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserConversations,
  getOrCreateConversation,
  getConversationById,
  getMessages,
  markAsRead
};
