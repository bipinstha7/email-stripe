const passport = require('passport')

module.exports = app => {
	/* access google auth api to get the user's profile and email */
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	)

	/* redirect to home page after successful google oauth authentication */
	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/')
	})

	app.get('/api/logout', (req, res) => {
		req.logout()
		res.redirect('/surveys')
	})

	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
}
