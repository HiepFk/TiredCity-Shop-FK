const productController = require("../controllers/productController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const router = require("express").Router();

router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getProduct);

router.use(isAuthenticatedUser);
router.use(isAdmin);

router.route("/").post(
  // productController.uploadImages,
  // productController.saveImages,
  productController.addProduct
);
router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
