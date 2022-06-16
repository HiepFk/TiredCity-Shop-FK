const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getProduct);

router.use(authController.protect);
router.use(authController.isAdmin);

router
  .route("/")
  .post(
    productController.uploadImages,
    productController.saveImages,
    productController.addProduct
  );
router.route("/:id").patch(productController.updateProduct);

module.exports = router;
