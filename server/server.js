require('dotenv').config()
const express = require("express");
const app = express();
const connectDB = require("./utils/db.js");
const errorMiddleware = require('./middlewares/error-middleware.js');
const cors = require("cors");
const authRoute = require("./router/auth-router.js")
const feedbackRoute = require("./router/feedback-router.js")
const busdataRoute = require("./router/busdata-router.js")
const adminRoute = require("./router/admin-router.js")


const corsOptions = {
    origin: process.env.CROSS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", feedbackRoute);
app.use(errorMiddleware);
app.use("/api/form", busdataRoute);
app.use("/api/admin", busdataRoute);
app.use("/api/admin", feedbackRoute);
app.use("/api/admin", adminRoute);

const port = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
})