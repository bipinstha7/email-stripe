const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const keys = require('../config/keys')

const User = mongoose.model('User')

/** Here user is the data passed from the
 *  done through GoogleStrategy below.
 *  It may be either existingUser or user
 */
passport.serializeUser((user, done) => {
	done(null, user.id)
})

/* id === user.id from the serializeUser */
passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(err => console.log('Error on deserialize user', err))
})

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
			/**	when app is deployed to the server,
			 *  heroku tries to load with https,
			 * 	And if it can't find proxy:true - throws error
			 * */
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id })

			if (existingUser) {
				return done(null, existingUser)
			}

			const user = await new User({ googleId: profile.id }).save()
			done(null, user)
		}
	)
)
