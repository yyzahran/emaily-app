const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
    // Handling stripe payment
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const { id } = req.body;

        // Creating a stripe charge
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: id,
        });

        // Updating the user's credits
        req.user.credits += 5;
        const updatedUser = await req.user.save();

        res.send(updatedUser);
    });
};
