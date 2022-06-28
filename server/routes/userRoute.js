const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);

router.use(authController.protect);
router.get("/me", userController.getMe);
router.patch("/updateMyPassword", authController.updatePassword);
router.patch("/updateInfo", userController.updateMe);

router.use(authController.isAdmin);

router.route("/").post(userController.addUser).get(userController.getAllUsers);

router
  .route("/:id")
  .patch(userController.updateUser)
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
