const requireCredits = require('../middleware/requireCredits');
const requireLogin = require('../middleware/requireLogin');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // Fetching the 'surveys' model

module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const recipientsObjects = recipients
            .split(',')
            .map((email) => ({ email: email.trim() }));

        const newSurvey = await new Survey({
            title,
            subject,
            body,
            recipients: recipientsObjects,
            _user: req.user.id,
            dateSent: Date.now(),
        }).save();

        const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

        const resp = await mailer.send();
        console.log(resp);
    });
};
