const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const app = express();

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

app.use(cors());

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
app.use("/api", limiter);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(mongoSanitize());

app.use(xss());

// Các router api
app.use("/v1/user", userRoute);
app.use("/v1/product", productRoute);
app.use("/v1/review", reviewRoute);
app.use("/v1/cart", cartRoute);
app.use("/v1/order", orderRoute);

//////////////
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this on this server!`, 404));
});

module.exports = app;
