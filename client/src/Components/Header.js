import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return 'Still Deciding'
			case false:
				return 'I am loggedout'
			default:
				return 'I am Logged in'
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="" className="left brand-logo">
						Emaily
					</a>
					<ul className="right">
						{this.renderContent()}
						{/* <li>
							<a href="">Login With Google</a>
						</li> */}
					</ul>
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
