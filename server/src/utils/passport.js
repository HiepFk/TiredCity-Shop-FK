const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/userModel");

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
      console.log(profile.displayName);
      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: "test@gmail.com",
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log(user);
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          console.log("Dm");

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
