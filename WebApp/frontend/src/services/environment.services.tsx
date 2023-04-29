import config from '../config.json'


export interface Statistics {
	numberOfUsers: number
	numberOfTranscriptCreated: number
}


export const useEnvironmentAPI = () => {

	const getEnvironmentStatistics = async (): Promise<Statistics> => {
		return fetch(`${config.API_URL}environment/statistics/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	return {
		getEnvironmentStatistics
	}
}
