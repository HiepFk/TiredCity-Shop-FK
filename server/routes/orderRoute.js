const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.use(authController.protect);

// Thiếu của người dùng

router.use(authController.isAdmin);
router.route("/").post(orderController.addOrder);
router.route("/:id").patch(orderController.updateOrder);

router.route("/").get(orderController.getAllOrders);
router.route("/:id").get(orderController.getOrder);

module.exports = router;
