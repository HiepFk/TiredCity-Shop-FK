const reivewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.use(authController.protect);

// Thiếu của người dùng
router.route("/user").post(reivewController.userAddReview);

router.use(authController.isAdmin);
router.route("/").post(reivewController.addReview);
router.route("/:id").patch(reivewController.updateReview);

router.route("/").get(reivewController.getAllReviews);
router.route("/:id").get(reivewController.getReview);

module.exports = router;
