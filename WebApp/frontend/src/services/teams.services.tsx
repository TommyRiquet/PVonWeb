import config from '../config.json'


interface User {
	id: number
	firstname: string
	lastname: string
	email: string
	role: string
}

export const useTeamAPI = () => {

	const getListMembers = async (): Promise<Array<User>> => {
		return fetch(`${config.API_URL}team/members/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	return {
		getListMembers
	}
}
