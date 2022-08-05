const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/userModel");
const { createSendToken } = require("./jwtToken");
const GOOGLE_CLIENT_ID =
  "495993861829-2qdmhrjdf1leitdnh78mr027pjqling0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const newUser = {
        googleId: profile.id,
        name: profile.name.familyName + " " + profile.name.givenName,
        // email: "test@gmail.com",
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
          // createSendToken(user, 200, req, res, (msg = "Login success"));
        } else {
          user = await User.create(newUser);
          // createSendToken(user, 201, req, res, (msg = "SignUp success"));
          done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
