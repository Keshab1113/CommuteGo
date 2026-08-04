const Feedback = require("../models/feedback-model");
const { createNotification } = require("../utils/notification-helper.js");

// Submit feedback/contact form (public)
const feedbackForm = async (req, res) => {
    try {
        const response = req.body;
        const feedback = await Feedback.create(response);

        await createNotification({
            title: response.type === "review" ? "New review submitted" : "New feedback received",
            message: response.type === "review"
                ? `A new ${response.rating || ""}-star review has been submitted.`
                : `New ${response.type || "feedback"} from ${response.name || "a visitor"}.`,
            type: "info",
            entityType: "feedback",
            entityId: feedback._id,
        });

        return res.status(200).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Feedback submission error:", error);
        return res.status(500).json({ message: "Failed to submit feedback", error: error.message });
    }
}

// Get all feedback (admin) - contacts and pending reviews
const getFeedbackDatas = async (req, res) => {
    try {
        const { type, status } = req.query;
        let query = {};

        if (type) query.type = type;
        if (status) query.status = status;

        const response = await Feedback.find(query).sort({ createdAt: -1 });
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "No Feedback Found." });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(`Feedbackdata: ${error}`);
    }
}

// Get approved reviews (public)
const getApprovedReviews = async (req, res) => {
    try {
        const reviews = await Feedback.find({
            type: 'review',
            status: 'approved'
        }).sort({ createdAt: -1 }).limit(10);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
}

// Update feedback status (admin)
const updateFeedBackById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await Feedback.findByIdAndUpdate(
            id,
            { ...updatedUserData, reviewedAt: new Date() },
            { new: true }
        );

        if (updatedData && updatedUserData.status) {
            await createNotification({
                title: `Feedback ${updatedUserData.status}`,
                message: `Feedback from ${updatedData.name || "a visitor"} has been ${updatedUserData.status}.`,
                type: updatedUserData.status === "approved" ? "success" : "warning",
                entityType: "feedback",
                entityId: updatedData._id,
            });
        }

        return res.status(200).json(updatedData);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update feedback" });
    }
}

const getFeedBackById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Feedback.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

const deleteFeedBackById = async (req, res) => {
    try {
        const id = req.params.id;
        await Feedback.findByIdAndDelete(id);
        return res.status(200).json({ message: "Feedback Deleted Successfully." });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    feedbackForm,
    getFeedbackDatas,
    getApprovedReviews,
    updateFeedBackById,
    getFeedBackById,
    deleteFeedBackById
};
