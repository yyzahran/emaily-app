const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require('./config/keys');
require('./models/User');
require('./services/passport');

// Connecting to mongoDB
mongoose.connect(mongoURI);

const app = express();

// Middleware: they process every request
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [cookieKey], // You can provide multiple keys and one will get selected randomly when encrypting cookie
    })
);
app.use(passport.initialize());
app.use(passport.session());

// const authRoutes = require('./routes/authRoutes');
// authRoutes(app)
// The above two can be subbed by this:
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
