const Feedback = require("../models/feedback-model");

const feedbackForm = async (req, res) => {
    try {
        const response = req.body;
        await Feedback.create(response);
        return res.status(200).json({ message: "feedback send successfully" });
    } catch (error) {
        return res.status(500).json({ message: "feedback not send" });
    }
}
const getFeedbackDatas = async (req, res) => {
    try {
        const response = await Feedback.find();
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "No FeedbackData Found." });
            
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(`Feedbackdata: ${error}`);
    }
}
const updateFeedBackById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await Feedback.updateOne({ _id: id }, {
            $set: updatedUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}
const getFeedBackById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Feedback.findOne({ _id: id });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}
const deleteFeedBackById = async (req, res) => {
    try {
        const id = req.params.id;
        await Feedback.deleteOne({ _id: id });
        return res.status(200).json({ message: "FeedBack Deleted Successfully." });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { feedbackForm, getFeedbackDatas, updateFeedBackById, getFeedBackById, deleteFeedBackById };