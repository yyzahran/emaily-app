const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('youssef.zahran@resolver.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body); // Provided by the parent class

        // Click tracking in the email
        this.addClickTracking();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
        this.addRecipients();
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((r) => {
            personalize.addTo(r);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        try {
            const request = this.sgApi.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: this.toJSON(),
            });

            const response = await this.sgApi.API(request);
            return response;
        } catch (error) {
            console.error(
                'Error occurred while sending email:',
                console.log(error.response.body.message)
            );
        }
    }
}

module.exports = Mailer;
