require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MongoDb_URL;
    
const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Database connection Successfully");
    } catch (error) {
        console.error("Database connection failed");
        process.exit(0);
    }
} 

module.exports = connectDb;