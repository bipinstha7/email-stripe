import axios from 'axios'
import { FETCH_USER } from './Types'

const fetchUser = () => {
	axios.get('/api/current_user')
}
