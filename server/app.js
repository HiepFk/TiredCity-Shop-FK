const express = require("express");
const cookieSession = require("cookie-session");
const expressSession = require("express-session");

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

const userRoute = require("./src/routes/userRoute");
const productRoute = require("./src/routes/productRoute");
const reviewRoute = require("./src/routes/reviewRoute");
const cartRoute = require("./src/routes/cartRoute");
const orderRoute = require("./src/routes/orderRoute");

const passportRoute = require("./src/routes/passportRoute");
require("./src/utils/passport");
const passport = require("passport");

const app = express();

app.use(
  expressSession({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// app.use(
//   cookieSession({ name: "session", keys: ["hiep"], maxAge: 24 * 60 * 60 * 100 })
// );
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/v1/cart", cartRoute);
app.use("/v1/order", orderRoute);

// app.use("/auth", passportRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
