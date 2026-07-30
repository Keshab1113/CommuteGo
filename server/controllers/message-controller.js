const Conversation = require("../models/conversation-model.js");
const Message = require("../models/message-model.js");

// Send a message
const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, content, type = 'text', attachments } = req.body;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Check if user is a participant
    if (!conversation.participants.includes(req.user.userID)) {
      return res.status(403).json({ message: "Not authorized to send messages" });
    }

    // Create message
    const message = await Message.create({
      conversationId,
      senderId: req.user.userID,
      content,
      type,
      attachments,
      readBy: [req.user.userID]
    });

    // Update conversation's last message
    conversation.lastMessage = {
      content: content.substring(0, 100),
      senderId: req.user.userID,
      createdAt: new Date()
    };

    // Increment unread count for other participants
    conversation.participants.forEach(participantId => {
      if (participantId.toString() !== req.user.userID) {
        const unreadIndex = conversation.unreadCount.findIndex(
          uc => uc.userId.toString() === participantId.toString()
        );

        if (unreadIndex > -1) {
          conversation.unreadCount[unreadIndex].count += 1;
        } else {
          conversation.unreadCount.push({
            userId: participantId,
            count: 1
          });
        }
      }
    });

    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('senderId', 'username email avatar');

    res.status(201).json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

// Mark message as read
const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (!message.readBy.includes(req.user.userID)) {
      message.readBy.push(req.user.userID);
      await message.save();
    }

    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    next(error);
  }
};

// Delete message (soft delete)
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete their message
    if (message.senderId.toString() !== req.user.userID) {
      return res.status(403).json({ message: "Not authorized to delete this message" });
    }

    message.isDeleted = true;
    message.content = "This message was deleted";
    await message.save();

    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  markMessageAsRead,
  deleteMessage
};
