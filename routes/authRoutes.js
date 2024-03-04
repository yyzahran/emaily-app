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

    // Passport handling the google code & redirecting after login
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout is attached to the req by passport
        res.redirect('/');
    });

    app.get('/api/current-user', (req, res) => {
        res.send(req.user); // user is attached here by passport serialize/deserialize functions
    });
};
