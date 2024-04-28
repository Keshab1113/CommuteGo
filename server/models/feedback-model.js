const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
    fullname: { type: String, required:true },
    email: { type: String, required:true },
    phone: { type: String, required:true },
    message: { type: String, required: true },
    isDone: { type: Boolean, default: false,
    }
})

const Feedback = new model("Feedback", feedbackSchema);
module.exports = Feedback;