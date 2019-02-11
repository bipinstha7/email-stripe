const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./services/passport')
require('./models/User')

const app = express()

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('Mongodb is connected'))
	.catch(err => console.log({ err }))

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
