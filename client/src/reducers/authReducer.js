import { FETCH_USER } from '../actions/Types'

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USER:
			return {}
		default:
			return state
	}
}
