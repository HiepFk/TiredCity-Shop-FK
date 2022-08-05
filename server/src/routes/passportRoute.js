const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:8000/v1/user";

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/",
  })
);
module.exports = router;
