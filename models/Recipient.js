const mongoose = require('mongoose')

const { Schema } = mongoose

/* recipientSchema has been used as a subdocument in Survey Schema */
const recipientSchema = new Schema({
	email: String,
	responded: {
		type: Boolean,
		default: false
	}
})

module.exprots = recipientSchema
