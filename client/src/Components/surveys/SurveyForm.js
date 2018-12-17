import React, { Component } from 'react'
import { readuxForm } from 'redux-form'

class SurveyForm extends Component {
	render() {
		return <div>SurveyForm</div>
	}
}

export default reduxFor({ form: 'surveyForm' })(SurveyForm)
