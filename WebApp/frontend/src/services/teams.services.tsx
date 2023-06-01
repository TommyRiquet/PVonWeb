import useAPI from './common.services'


interface User {
	id: number
	firstname: string
	lastname: string
	email: string
	role: string
}

export const useTeamAPI = () => {

	const { API } = useAPI()

	const getListMembers = async (): Promise<Array<User>> => {
		return API.get('team/members/').then(res => res.data)
	}

	const addUser = async (user: any): Promise<any> => {
		return API.post('team/', user).then(res => res.data)
	}

	const kickUser = async (user: any): Promise<any> => {
		return API.delete(`team/${user.id}/`).then(res => res.data)
	}

	return {
		getListMembers,
		addUser,
		kickUser
	}
}
