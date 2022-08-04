const Review = require("../models/reviewModel");
const catchAsync = require("./../middleware/catchAsync");
const AppError = require("./../utils/appError");
const userController = {
  addReview: catchAsync(async (req, res) => {
    const newReview = new Review(req.body);
    const saveReview = await newReview.save();
    res.status(200).json({
      status: "success",
      message: "Thêm nhận xét thành công",
      data: { saveReview },
    });
  }),
  updateReview: catchAsync(async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { review },
    });
  }),
  getAllReviews: catchAsync(async (req, res) => {
    const review = await Review.find();
    res.status(200).json({
      status: "success",
      results: review.length,
      data: { review },
    });
  }),

  getReview: catchAsync(async (req, res) => {
    const review = await Review.findById(req.params.id).populate({
      path: "product",
      select: " name",
    });
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { review },
    });
  }),
  deleteReview: catchAsync(async (req, res) => {
    const doc = await Review.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      message: "Xóa thành công",
    });
  }),

  // Phần user
  userAddReview: catchAsync(async (req, res) => {
    const data = { ...req.body };
    data.user = req.user.id;
    const newReview = new Review(data);
    const saveReview = await newReview.save();
    res.status(200).json({
      status: "success",
      message: "Thêm nhận xét thành công",
      data: { saveReview },
    });
  }),
};

module.exports = userController;
