import config from '../config.json'

export interface User {
	id: number
	email: string
	firstName: string
	lastName: string
	phoneNumber: string
}


export const useUserAPI = () => {

	const getCurrentUser = async (): Promise<User> => {
		return fetch(`${config.API_URL}user/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	return {
		getCurrentUser
	}
}
