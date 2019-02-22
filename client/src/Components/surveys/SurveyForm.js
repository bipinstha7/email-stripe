import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Survey Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipients List', name: 'emails' }
]

class SurveyForm extends Component {
	renderFields() {
		return FIELDS.map(({ label, name }) => {
			return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log('values', values))}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat left white-text">
						cancel
					</Link>
					<button className="teal btn-flat right white-text" type="submit">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		)
	}
}
function validate(values) {
	const errors = {}

	errors.emails = validateEmails(values.emails || '')

	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide ${name}`
		}
	})

	return errors
}

export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm)
