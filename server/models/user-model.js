const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});


//Hashed Password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//Compare Password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
}


//Json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
