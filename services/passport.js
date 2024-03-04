const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users'); // Fetching the 'users' model

// Take the user model and put some identifying info into the cookie
passport.serializeUser((user, done) => {
    // user.id is the id from the database (the id of the record)
    done(null, user.id);
});

// Pull the id from the cookie and make it a user
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback', // Route user is sent to after granted permission to the app
            proxy: true,
        },
        /**
         * Callback for when user is directed back to the app
         * from the google flow
         */
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id });
            if (user) {
                // We already have a record with a given profile id
                // arguments of type (error, user)
                return done(null, user);
            }

            // New User
            const newUser = await new User({ googleId: profile.id }).save();
            done(null, newUser);
        }
    )
);

// Telling passport to use cookies to manage authentication
