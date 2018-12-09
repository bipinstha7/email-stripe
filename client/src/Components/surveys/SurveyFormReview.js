import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import formFields from './formFields'
import { submitSurvey } from '../../actions/index'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = formFields.map(({ label, name }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		)
	})

	return (
		<div>
			<h5>Please Confirm Your Entries</h5>
			{reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="green btn-flat right white-text"
			>
				Send Survey <i className="material-icons right">email</i>{' '}
			</button>
		</div>
	)
}

const mapStateToProps = state => ({
	formValues: state.form.surveyForm.values
})

export default connect(
	mapStateToProps,
	{ submitSurvey }
)(withRouter(SurveyFormReview))
