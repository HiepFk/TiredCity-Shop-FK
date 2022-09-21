const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const corsOptions = require("./src/config/corsOptions");
const credentials = require("./src/middleware/credentials");

const globalErrorHandler = require("./src/middleware/errorHandle");

const AppError = require("./src/utils/appError");

const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const reviewRoute = require("./src/routes/reviewRoute");
const orderRoute = require("./src/routes/orderRoute");

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(morgan("common"));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use("/", limiter);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(mongoSanitize());

app.use(xss());

// Các router api
app.use("/v1/user", userRoute);
app.use("/v1/product", productRoute);
app.use("/v1/review", reviewRoute);
app.use("/v1/order", orderRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
