const Product = require("../models/productModel");
const multer = require("multer"); // dùng để tải ảnh
const cloudinary = require("./../utils/cloudinary");

const multerStorage = multer.diskStorage({}); // file ở bộ nhớ
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new res.status(404).json({
        status: "error",
        message: "Ảnh ko đúng",
      }),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const productController = {
  uploadImages: upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  saveImages: async (req, res, next) => {
    // const result = await cloudinary.uploader.upload(
    //   req.files.imageCover[0].path,
    //   {
    //     resource_type: "auto",
    //   }
    // );
    // req.body.imageCover = result.secure_url;
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (item) => {
        const file = await cloudinary.uploader.upload(item.path, {
          resource_type: "auto",
        });
        const url = file.secure_url;
        req.body.images.push(url);
      })
    );

    next();
  },
  addProduct: async (req, res) => {
    try {
      const data = { ...req.body };
      data.imageCover = data.images[0];
      const newProduct = new Product(data);
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
      const query = Product.find(queryObj);
      const products = await query;
      // const products = await Product.find();
      res.status(200).json({
        status: "success",
        results: products.length,
        data: { products },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  getProduct: async (req, res) => {
    try {
      let product =
        (await Product.findOne({ slug: req.params.id })) ||
        (await Product.findById(req.params.id));

      product = await product.populate("reviews");
      if (product) {
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
      console.log(err);
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
