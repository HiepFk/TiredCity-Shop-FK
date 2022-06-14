const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.use(authController.protect);

router
  .route("/user")
  .post(cartController.userAddCart)
  .get(cartController.userGetCart);
router
  .route("/user/:id")
  .patch(cartController.userUpdateCart)
  .delete(cartController.userDeleteCart);

router.use(authController.isAdmin);
router.route("/").post(cartController.addCart);
router.route("/:id").patch(cartController.updateCart);

router.route("/").get(cartController.getAllCarts);
router
  .route("/:id")
  .get(cartController.getCart)
  .delete(cartController.deleteCart);

module.exports = router;
