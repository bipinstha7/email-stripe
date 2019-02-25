const sgMail = require('@sendgrid/mail')
const Path = require('path-parser')
const { URL } = require('url')
const { uniqBy } = require('lodash')
const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('Survey')

const keys = require('../config/keys')

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select('-recipients')

		res.send(surveys)
	})

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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
			await Survey.create(survey)
			req.user.credits -= 1
			const user = await req.user.save()

			res.send(user)
		} catch (error) {
			res.status(422).send(error)
		}
	})

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice')

		const events = req.body.map(({ email, url }) => {
			const match = p.test(new URL(url).pathname)

			if (match) {
				return {
					email,
					surveyId: match.surveyId,
					choice: match.choice
				}
			}
		})

		const compactEvents = events.filter(event => event !== undefined)
		const uniqueEvents = uniqBy(compactEvents, 'email', 'surveyId')

		uniqueEvents.map(({ email, surveyId, choice }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email, responded: false }
					}
				},
				{
					$inc: { [choice]: 1 },
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date()
				}
			).exec()
		})

		res.send({})
	})
}
