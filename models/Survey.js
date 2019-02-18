const mongoose = require('mongoose')

const { Schema } = mongoose

const SurveySchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [String],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	}
})

mongoose.model('Survey', SurveySchema)
