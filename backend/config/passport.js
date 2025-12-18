const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const setupPassport = () => {
  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
          scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists with this Google ID
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
              return done(null, user);
            }

            // Check if user exists with same email
            const existingUser = await User.findOne({
              email: profile.emails[0].value,
            });

            if (existingUser) {
              // Link Google account to existing user
              existingUser.googleId = profile.id;
              if (!existingUser.avatar && profile.photos[0]) {
                existingUser.avatar = profile.photos[0].value;
                existingUser.profileImage = profile.photos[0].value;
              }
              await existingUser.save();
              return done(null, existingUser);
            }

            // Create new user
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              displayName: profile.displayName,
              avatar: profile.photos[0]?.value,
              profileImage: profile.photos[0]?.value,
              emailVerified: true,
              isProfileComplete: false,
            });

            done(null, user);
          } catch (error) {
            done(error, null);
          }
        }
      )
    );
  } else {
    console.warn('Google OAuth not configured - missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
  }
};

module.exports = setupPassport;
