const catchAsync = require("../middleware/catchAsync");
const AppError = require("../utils/appError");
const createSendToken = require("../utils/jwtToken");
const User = require("./../models/userModel");

const authController = {
  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Incorrect email ", 401));
    }

    if (!(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect password", 401));
    }
    createSendToken(user, 200, req, res, (msg = "Login success"));
  }),
  signup: catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      email: req.body.email,
      name: "User",
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, req, res, (msg = "SignUp success"));
  }),

  googleAuth: catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      createSendToken(user, 200, req, res, (msg = "Login success"));
    } else {
      const newUser = new User({
        ...req.body,
      });
      const savedUser = await newUser.save();
      createSendToken(savedUser, 201, req, res, (msg = "SignUp success"));
    }
  }),

  logout: (req, res, next) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
      // secure: req.secure || req.headers["x-forwarded-proto"] == "https",
      // sameSite: "none",
    });
    res.status(200).json({ status: "success", message: "You are loggedout" });
  },
  updatePassword: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, req, res, (msg = "Update password success"));
  }),

  forgotPassword: catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    try {
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "There was an error sending the email.Try again later",
          500
        )
      );
    }
  }),

  resetPassword: catchAsync(async (req, res, next) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token is invaild or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, req, res, (msg = "Login success"));
  }),
};

module.exports = authController;
