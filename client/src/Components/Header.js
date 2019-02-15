import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				)
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				)
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">
						Emaily
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		)
	}
}

Header.propTypes = {
	auth: PropTypes.oneOfType([
		PropTypes.shape({
			_id: PropTypes.string,
			googleId: PropTypes.string
		}),
		PropTypes.bool
	])
}

Header.defaultProps = {
	auth: false
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(Header)
