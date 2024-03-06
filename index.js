const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const { mongoURI, cookieKey } = require('./config/keys');
/** MongoDB models */
require('./models/User');
require('./models/Survey');
require('./services/passport');

// Connecting to mongoDB
mongoose.connect(mongoURI);

const app = express();

// Middleware: they process every request
app.use(bodyParser.json()); // Parsing any request that comes to express and assigns it to req.body object
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [cookieKey], // You can provide multiple keys and one will get selected randomly when encrypting cookie
    })
);
app.use(passport.initialize());
app.use(passport.session());

/** Routing logic */
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app)
// The above two can be subbed by the following line:
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like main.js  or main.css
    app.use(express.static('client/build'));

    // Express will serve up index.html if it doesn't recognize the route (handled by react-router)
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
