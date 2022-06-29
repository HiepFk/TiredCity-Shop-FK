const Review = require("../models/reviewModel");

const userController = {
  addReview: async (req, res) => {
    try {
      const newReview = new Review(req.body);
      const saveReview = await newReview.save();
      res.status(200).json({
        status: "success",
        message: "Thêm nhận xét thành công",
        data: { saveReview },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  updateReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { review },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  getAllReviews: async (req, res) => {
    try {
      const review = await Review.find();
      res.status(200).json({
        status: "success",
        results: review.length,
        data: { review },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err });
    }
  },

  getReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).populate({
        path: "product",
        select: " name",
      });
      res.status(200).json({
        status: "success",
        data: { review },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteReview: async (req, res) => {
    try {
      const doc = await Review.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({
          status: "error",
          message: "Không tìm thấy với id ",
        });
        return;
      }
      res.status(204).json({
        status: "success",
        message: "Xóa thành công",
      });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  },

  // Phần user
  userAddReview: async (req, res) => {
    try {
      const data = { ...req.body };
      data.user = req.user.id;
      const newReview = new Review(data);
      const saveReview = await newReview.save();
      res.status(200).json({
        status: "success",
        message: "Thêm nhận xét thành công",
        data: { saveReview },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Tạo đánh giá thất bại. Thử lại lần sau",
      });
    }
  },
};

module.exports = userController;
