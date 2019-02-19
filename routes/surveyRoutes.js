const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('Survey')

module.exports = app => {
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body

		const survey = {
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })), // return array of object with email property as {email: email}
			_user: req.user.id,
			dateSent: Date.now()
		}

		const mailer = new Mailer(survey, surveyTemplate(survey))

		try {
			await mailer.send()

			await Survey.create(survey)

			req.user.credits -= 1
			const user = await req.user.save()

			res.sed(user)
		} catch (error) {
			res.status(422).send(error)
		}
	})
}
