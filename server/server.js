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
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 8, 
    message: 'Too many login attempts. Please try again later.'
  });

const corsOptions = {
    origin: [
        process.env.CROSS_ORIGIN,
        "https://www.commutego.com",
        "https://commute-go.vercel.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth",loginLimiter,authRoute);
app.use("/api/form",loginLimiter,feedbackRoute);
app.use(errorMiddleware);
app.use("/api/form",loginLimiter,busdataRoute);
app.use("/api/admin",loginLimiter,busdataRoute);
app.use("/api/admin",loginLimiter,feedbackRoute);
app.use("/api/admin",loginLimiter,adminRoute);

const port = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
})
