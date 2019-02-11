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
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
				.then(existingUser => {
					if (existingUser) {
						done(null, existingUser)
					} else {
						new User({ googleId: profile.id })
							.save()
							.then(user => done(null, user))
							.catch(err => console.log('Something went wrong while creating new user', err))
					}
				})
				.catch(err => console.log('Error on finding given googleId', err))
		}
	)
)
