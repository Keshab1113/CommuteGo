const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },

    // Type: 'contact' = contact form, 'review' = service review
    type: { type: String, enum: ['contact', 'review'], default: 'contact' },

    // Rating for reviews
    rating: { type: Number, min: 1, max: 5 },

    // Approval status (for reviews to show on website)
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

    // Admin review
    reviewedAt: { type: Date },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },

    // Read status
    isDone: { type: Boolean, default: false }
}, { timestamps: true });

const Feedback = model("Feedback", feedbackSchema);
module.exports = Feedback;
