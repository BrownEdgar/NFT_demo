// var GoogleStrategy = require('passport-google-oauth20').Strategy;

const passport = require('passport');


passport.serializeUser(function (user, done) {
  console.log(`serializeUser`, user)
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log(`deserializeUser`, user)
  done(null, user);
});

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    cb(null, profile)
  }
));