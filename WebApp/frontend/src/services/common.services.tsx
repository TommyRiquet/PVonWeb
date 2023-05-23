import axios from 'axios'

import { useAuth } from 'contexts/AuthContext'
import { useAppContext } from 'contexts/'

import config from 'config.json'

const useAPI = () => {

	const { token } = useAuth()

	const { selectedEnvironment } = useAppContext()

	const API = axios.create({
		baseURL: config.API_URL,
		headers: {
			Authorization: `Token ${token}`,
			'X-Env-Id': selectedEnvironment?.id
		}
	})

	return { API }
}

export default useAPI
