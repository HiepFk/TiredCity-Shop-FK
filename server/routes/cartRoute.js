const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.use(authController.protect);

// Thiếu của người dùng

router.use(authController.isAdmin);
router.route("/").post(cartController.addCart);
router.route("/:id").patch(cartController.updateCart);

router.route("/").get(cartController.getAllCarts);
router.route("/:id").get(cartController.getCart);

module.exports = router;
