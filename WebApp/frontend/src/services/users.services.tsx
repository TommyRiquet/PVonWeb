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

	const updateUser = async (user: any): Promise<User> => {
		return fetch(`${config.API_URL}user/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(user)
		}).then(res => res.json())
	}

	const changePassword = async (oldPassword: string, newPassword1: string, newPassword2: string): Promise<any> => {
		return fetch(`${config.API_URL}user/password`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				oldPassword,
				newPassword1,
				newPassword2
			})
		}).then(res => res.json())
	}

	const addUser = async (user: any): Promise<any> => {
		return fetch(`${config.API_URL}user/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(user)
		}).then(res => res.json())
	}

	return {
		getCurrentUser,
		updateUser,
		changePassword,
		addUser
	}
}