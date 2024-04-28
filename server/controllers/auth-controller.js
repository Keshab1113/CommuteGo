const User = require("../models/user-model.js");
const bcrypt = require("bcryptjs");

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
      return res.status(200).json({ message: "Invalid Credentials" });
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

module.exports = { home, signup, login, user };
