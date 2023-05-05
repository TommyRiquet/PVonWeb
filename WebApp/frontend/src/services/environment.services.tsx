import config from '../config.json'

import { User } from './users.services'

import { Transcript } from './transcripts.services'

export interface Statistics {
	numberOfUsers: number
	numberOfTranscriptCreated: number
}

interface Environment {
	id: number
	name: string
	description: string
}

export interface Log {
	id: number
	action : string
	user: User
	timestamp: string
	targetUser?: User
	targetEnvironment?: Environment
	targetTranscript?: Transcript
}


export const useEnvironmentAPI = () => {

	const getEnvironment = async (): Promise<Environment> => {
		return fetch(`${config.API_URL}environment/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	const updateEnvironment = async (data: any): Promise<Environment> => {
		return fetch(`${config.API_URL}environment/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
	}

	const getEnvironmentStatistics = async (): Promise<Statistics> => {
		return fetch(`${config.API_URL}environment/statistics/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	const getEnvironmentLogs = async (): Promise<Log[]> => {
		return fetch(`${config.API_URL}environment/history/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	return {
		getEnvironment,
		updateEnvironment,
		getEnvironmentStatistics,
		getEnvironmentLogs
	}
}
