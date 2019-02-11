const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

const app = express()

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey]
	})
)

app.use(passport.initialize())
app.use(passport.session())

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('Mongodb is connected'))
	.catch(err => console.log({ err }))

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
