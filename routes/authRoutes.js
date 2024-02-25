const passport = require('passport');

// Callback function that takes app
module.exports = (app) => {
    // Route handler for oauth
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    // Passport handling the google code
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout is attached to the req by passport
        res.send(req.user);
    });

    app.get('/api/current-user', (req, res) => {
        res.send(req.user); // user is attached here by passport serialize/deserialize functions
    });
};
