import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'

const Landing = () => <h1>Landing</h1>
const Dashboard = () => <h1>Dashboard</h1>
const SurveyNew = () => <h1>SurveyView</h1>

const App = () => {
	return (
		<div className="container">
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/surveys" component={Dashboard} />
					<Route path="/surveys/new" component={SurveyNew} />
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
