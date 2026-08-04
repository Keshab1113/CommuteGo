const User = require("../models/user-model.js");
const bcrypt = require("bcryptjs");
const { createNotification } = require("../utils/notification-helper.js");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome Keshab, in the router");
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const userCreated = await User.create({ username, email, password });

    await createNotification({
      title: "New user registered",
      message: `"${username}" just signed up on CommuteGo.`,
      type: "info",
      entityType: "user",
      entityId: userCreated._id,
    });

    res
      .status(201)
      .json({
        message: "Registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);
    if (user) {
      res
        .status(200)
        .json({
          message: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
          isAdmin: userExist.isAdmin,
          role: userExist.isAdmin ? "admin" : "user",
        });
    } else {
      res.status(500).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userID;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    next(error);
  }
}

module.exports = { home, signup, login, user, changePassword };
