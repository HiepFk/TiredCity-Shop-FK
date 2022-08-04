const Product = require("../models/productModel");
const multer = require("multer"); // dùng để tải ảnh
const cloudinary = require("./../utils/cloudinary");

const catchAsync = require("./../middleware/catchAsync");
const AppError = require("./../utils/appError");

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

  addProduct: catchAsync(async (req, res) => {
    const data = { ...req.body };
    data.imageCover = data.images[0];
    const newProduct = new Product(data);
    const saveProduct = await newProduct.save();
    res.status(200).json({
      status: "success",
      message: "Thêm sản phẩm thành công",
      data: { saveProduct },
    });
  }),
  updateProduct: catchAsync(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Cập nhật thành công",
      data: { product },
    });
  }),
  getAllProducts: catchAsync(async (req, res) => {
    const queryObj = { ...req.query };
    const query = Product.find(queryObj);
    const products = await query;
    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  }),

  getProduct: catchAsync(async (req, res) => {
    let product =
      (await Product.findOne({ slug: req.params.id })) ||
      (await Product.findById(req.params.id));
    if (!product) {
      return next(new AppError("No product found with that ID", 404));
    }
    product = await product.populate("reviews");

    res.status(200).json({
      status: "success",
      data: { product },
    });
  }),
  deleteProduct: catchAsync(async (req, res) => {
    const doc = await Product.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No product found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      message: "Xóa thành công",
    });
  }),
};

module.exports = productController;
