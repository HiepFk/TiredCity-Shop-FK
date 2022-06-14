const Cart = require("../models/cartModel");

const cartController = {
  addCart: async (req, res) => {
    try {
      const newCart = new Cart(req.body);

      const saveCart = await newCart.save();
      res.status(200).json({
        status: "success",
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        data: { saveCart },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  updateCart: async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { cart },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  getAllCarts: async (req, res) => {
    try {
      const cart = await Cart.find();
      res.status(200).json({
        status: "success",
        results: cart.length,
        data: { cart },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: { cart },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const doc = await Cart.findByIdAndDelete(req.params.id);
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
  userAddCart: async (req, res) => {
    try {
      const data = { ...req.body };
      data.user = req.user.id;
      const newCart = new Cart(data);
      const saveCart = await newCart.save();
      res.status(200).json({
        status: "success",
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        data: { saveCart },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  userUpdateCart: async (req, res) => {
    try {
      const cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { cart },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  userDeleteCart: async (req, res) => {
    try {
      const doc = await Cart.findOneAndDelete({ user: req.user.id });
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
  userGetCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });
      res.status(200).json({
        status: "success",
        data: { cart },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = cartController;
