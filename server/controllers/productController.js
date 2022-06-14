const Product = require("../models/productModel");
const multer = require("multer"); // dùng để tải ảnh

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const saveProduct = await newProduct.save();
      res.status(200).json({
        status: "success",
        message: "Thêm sản phẩm thành công",
        data: { saveProduct },
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { product },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const query = User.find(queryObj);
      const products = await query;
      res.status(200).json({
        status: "success",
        results: users.length,
        data: { products },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (user) {
        res.status(200).json({
          status: "success",
          data: { product },
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Không có sản phẩm",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const doc = await Product.findByIdAndDelete(req.params.id);

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

module.exports = productController;
