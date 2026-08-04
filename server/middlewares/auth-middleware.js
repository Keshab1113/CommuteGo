const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRECT_KEY);
        const userData = await User.findById(isVerified.userID).select({ password: 0 });

        if (!userData) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
}

module.exports = { authMiddleware };