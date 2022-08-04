const cartController = require("../controllers/cartController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const router = require("express").Router();

router.use(isAuthenticatedUser);

router
  .route("/user")
  .post(cartController.userAddCart)
  .get(cartController.userGetCart);
router
  .route("/user/:id")
  .patch(cartController.userUpdateCart)
  .delete(cartController.userDeleteCart);

router.use(isAdmin);
router.route("/").post(cartController.addCart);
router.route("/:id").patch(cartController.updateCart);

router.route("/").get(cartController.getAllCarts);
router
  .route("/:id")
  .get(cartController.getCart)
  .delete(cartController.deleteCart);

module.exports = router;
