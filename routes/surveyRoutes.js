const sgMail = require('@sendgrid/mail')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const keys = require('../config/keys')

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!')
	})

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body

		const survey = {
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => email),
			_user: req.user.id,
			dateSent: Date.now()
		}

		try {
			sgMail.setApiKey(keys.sendGridKey)
			const msg = {
				to: survey.recipients,
				from: 'test@example.com',
				subject: 'Sending with SendGrid is Fun',
				html: `${surveyTemplate(survey)}`
			}
			sgMail.sendMultiple(msg)

			req.user.credits -= 1
			const user = await req.user.save()

			res.send(user)
		} catch (error) {
			res.status(422).send(error)
		}
	})
}
