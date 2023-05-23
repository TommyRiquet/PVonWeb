import config from '../config.json'

import { AxiosResponse } from 'axios'

export interface Environment {
	id: number
	name: string
	description: string
}

export const useEnvironmentAPI = () => {

	const getEnvironments = async (): Promise<AxiosResponse<Environment[]>> => {
		return fetch(`${config.API_URL}environment/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	const updateEnvironment = async (data: any, environmentId: string): Promise<any> => {
		return fetch(`${config.API_URL}environment/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`,
				'X-Env-Id': environmentId
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
	}


	return {
		getEnvironments,
		updateEnvironment
	}
}
