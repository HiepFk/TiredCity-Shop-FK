const reivewController = require("../controllers/reviewController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const router = require("express").Router();

router.use(isAuthenticatedUser);

router.route("/user").post(reivewController.userAddReview);

router.use(isAdmin);
router
  .route("/")
  .post(reivewController.addReview)
  .get(reivewController.getAllReviews);
router
  .route("/:id")
  .patch(reivewController.updateReview)
  .get(reivewController.getReview);

module.exports = router;
