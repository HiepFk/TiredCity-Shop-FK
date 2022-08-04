const Cart = require("../models/cartModel");
const catchAsync = require("./../middleware/catchAsync");
const AppError = require("./../utils/appError");

const cartController = {
  addCart: catchAsync(async (req, res) => {
    const newCart = new Cart(req.body);

    const saveCart = await newCart.save();
    res.status(200).json({
      status: "success",
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      data: { saveCart },
    });
  }),

  updateCart: catchAsync(async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cart) {
      return next(new AppError("No cart found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { cart },
    });
  }),
  getAllCarts: catchAsync(async (req, res) => {
    const cart = await Cart.find();
    res.status(200).json({
      status: "success",
      results: cart.length,
      data: { cart },
    });
  }),

  getCart: catchAsync(async (req, res) => {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return next(new AppError("No cart found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { cart },
    });
  }),
  deleteCart: catchAsync(async (req, res) => {
    const doc = await Cart.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No cart found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      message: "Xóa thành công",
    });
  }),

  // Phần user
  userAddCart: catchAsync(async (req, res) => {
    const data = { ...req.body };
    data.user = req.user.id;
    const newCart = new Cart(data);
    const saveCart = await newCart.save();
    res.status(200).json({
      status: "success",
      message: "Thêm sản phẩm vào giỏ hàng thành công",
      data: { saveCart },
    });
  }),
  userUpdateCart: catchAsync(async (req, res) => {
    const cart = await Cart.findOneAndUpdate({ user: req.user.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cart) {
      return next(new AppError("No cart found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { cart },
    });
  }),
  userDeleteCart: catchAsync(async (req, res) => {
    const doc = await Cart.findOneAndDelete({ user: req.user.id });
    if (!doc) {
      return next(new AppError("No cart found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      message: "Xóa thành công",
    });
  }),
  userGetCart: catchAsync(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new AppError("No cart found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { cart },
    });
  }),
};

module.exports = cartController;
