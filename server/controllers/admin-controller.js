const User = require("../models/user-model")
const Feedback = require("../models/feedback-model")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},{password:0});
        // console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id },{password:0});
        return res.status(200).json(data);
    } catch (error) {
       next(error);
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, {
            $set: updatedUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
       next(error);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully." });
    } catch (error) {
       console.log(error);
    }
}
module.exports = { getAllUsers, deleteUserById, getUserById, updateUserById };