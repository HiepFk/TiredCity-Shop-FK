const User = require("../models/userModel");
const catchAsync = require("./../middleware/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...notallowed) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!notallowed.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const userController = {
  addUser: catchAsync(async (req, res) => {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    res.status(201).json({
      status: "success",
      message: "Thêm người dùng thành công",
      data: { saveUser },
    });
  }),
  updateUser: catchAsync(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { user },
    });
  }),
  getAllUsers: catchAsync(async (req, res) => {
    const queryObj = { ...req.query };
    const query = User.find(queryObj);
    const users = await query;
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  }),

  getUser: catchAsync(async (req, res) => {
    let user =
      (await User.findOne({ name: req.params.id })) ||
      (await User.findById(req.params.id));
    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }
    user = await user.populate("reviews");

    res.status(200).json({
      status: "error",
      message: "Không có người dùng",
    });
  }),

  deleteUser: catchAsync(async (req, res) => {
    const doc = await User.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No user found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      message: "Xóa thành công",
    });
  }),

  updateMe: catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm || req.body.role) {
      return next(
        new AppError(
          "This route is not allowed to be update passWord or Role",
          404
        )
      );
    }
    const filterBody = filterObj(req.body, "role", "password");
    const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { user },
    });
  }),
  getMe: catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  }),
};

module.exports = userController;
