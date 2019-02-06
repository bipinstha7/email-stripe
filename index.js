const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})
