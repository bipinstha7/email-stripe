const mongoose = require('mongoose')

const { Schema } = mongoose

const SurveySchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [String]
})

mongoose.model('Survey', SurveySchema)
