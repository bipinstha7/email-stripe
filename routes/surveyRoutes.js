const sgMail = require('@sendgrid/mail')
const Path = require('path-parser')
const { URL } = require('url')

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
			await sgMail.sendMultiple(msg)

			req.user.credits -= 1
			const user = await req.user.save()

			res.send(user)
		} catch (error) {
			res.status(422).send(error)
		}
	})

	app.post('/api/surveys/webhooks', (req, res) => {
		const events = req.body.map(({ email, url }) => {
			const pathname = new URL(url).pathname
			const p = new Path('/api/surveys/:surveyId/:choice')
			const match = p.test(pathname)

			if (match) {
				return {
					email,
					surveyId: match.surveyId,
					choice: match.choice
				}
			}
		})
	})
}
