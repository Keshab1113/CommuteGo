require('dotenv').config()
const express = require("express");
const app = express();
const connectDB = require("./utils/db.js");
const errorMiddleware = require('./middlewares/error-middleware.js');
const cors = require("cors");
const authRoute = require("./router/auth-router.js")
const feedbackRoute = require("./router/feedback-router.js")
const adminRoute = require("./router/admin-router.js")
const destinationRoute = require("./router/destination-router.js")
const localBuddyRoute = require("./router/local-buddy-router.js")
const experienceRoute = require("./router/experience-router.js")
const tripRoute = require("./router/trip-router.js")
const reviewRoute = require("./router/review-router.js")
const conversationRoute = require("./router/conversation-router.js")
const messageRoute = require("./router/message-router.js")


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth",authRoute);
app.use("/api/form",feedbackRoute);
app.use("/api/destinations",destinationRoute);
app.use("/api/local-buddies",localBuddyRoute);
app.use("/api/experiences",experienceRoute);
app.use("/api/trips",tripRoute);
app.use("/api/reviews",reviewRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
app.use("/api/admin",adminRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
})
