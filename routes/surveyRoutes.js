const requireCredits = require('../middleware/requireCredits');
const requireLogin = require('../middleware/requireLogin');
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // Fetching the 'surveys' model

module.exports = (app) => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

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

        try {
            const resp = await mailer.send();
            console.log(resp);
            await newSurvey.save();

            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map((item) => {
                const email = item.recipient;
                const url = item.url;
                if (url) {
                    const match = p.test(new URL(url).pathname);
                    if (match) {
                        return {
                            email,
                            surveyId: match.surveyId,
                            choice: match.choice,
                        };
                    }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false },
                        },
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date(),
                    }
                ).exec();
            })
            .value();

        res.send({});
    });
};
