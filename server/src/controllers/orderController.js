const Order = require("../models/orderModel");
const catchAsync = require("./../middleware/catchAsync");
const AppError = require("./../utils/appError");

const orderController = {
  addOrder: catchAsync(async (req, res) => {
    const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    res.status(200).json({
      status: "success",
      message: "Đặt hàng thành công",
      data: { saveOrder },
    });
  }),
  updateOrder: catchAsync(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return next(new AppError("No order found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { order },
    });
  }),
  getAllOrders: catchAsync(async (req, res) => {
    const orders = await Order.find().populate({
      path: "user",
      select: "name email ",
    });
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  }),

  getOrder: catchAsync(async (req, res) => {
    const order = await Order.findById(req.params.id).populate({
      path: "user",
      select: "name email ",
    });
    if (!order) {
      return next(new AppError("No order found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: { order },
    });
  }),
  deleteOrder: catchAsync(async (req, res) => {
    const doc = await Order.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No order found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      message: "Xóa thành công",
    });
  }),

  userAddOrder: catchAsync(async (req, res) => {
    const data = { ...req.body };
    data.user = req.user.id;
    data.time = new Date();
    const newOrder = new Order(data);
    const saveOrder = await newOrder.save();
    res.status(200).json({
      status: "success",
      message: "Đặt hàng thành công",
      data: { saveOrder },
    });
  }),
  getMyOrder: catchAsync(async (req, res) => {
    const order = await Order.find({ user: req.user.id }).populate({
      path: "products",
    });
    res.status(200).json({
      status: "success",
      data: { order },
    });
  }),
};

module.exports = orderController;
