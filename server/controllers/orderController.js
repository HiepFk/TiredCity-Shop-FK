const Order = require("../models/orderModel");

const orderController = {
  addOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const saveOrder = await newOrder.save();
      res.status(200).json({
        status: "success",
        message: "Đặt hàng thành công",
        data: { saveOrder },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  updateOrder: async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { order },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json({
        status: "success",
        results: orders.length,
        data: { orders },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: { order },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const doc = await Order.findByIdAndDelete(req.params.id);
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
};

module.exports = orderController;
