const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const router = require("express").Router();

router.use(isAuthenticatedUser);

router.route("/user").post(orderController.userAddOrder);
router.route("/myorder").get(orderController.getMyOrder);

router.use(isAdmin);
router.route("/").post(orderController.addOrder);
router.route("/:id").patch(orderController.updateOrder);
router.route("/user/:id").get(orderController.getUserOrder);

router.route("/").get(orderController.getAllOrders);
router
  .route("/:id")
  .get(orderController.getOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
