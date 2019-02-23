import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchSurveys } from '../../actions'

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys()
	}

	render() {
		return <div>SurveyList</div>
	}
}

const mapStateToProps = state => ({
	surveys: state.surveys
})

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(SurveyList)
