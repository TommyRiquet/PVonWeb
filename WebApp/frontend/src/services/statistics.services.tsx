import useAPI from './common.services'
import { User } from './users.services'
import { Transcript } from './transcripts.services'
import { Tag } from './tags.services'
import { Environment } from './environment.services'

export interface Statistics {
	numberOfUsers: number
	numberOfTranscriptCreated: number
	numberOfTranscriptDeleted: number
	numberOfTagCreated: number
}

export interface Log {
	id: number
	action : string
	user: User
	timestamp: string
	targetUser?: User
	targetEnvironment?: Environment
	targetTranscript?: Transcript
	targetTag?: Tag
}


export const useStatisticsAPI = () => {

	const { API } = useAPI()

	const getEnvironmentStatistics = async (): Promise<Statistics> => {
		return API.get('environment/statistics/').then(res => res.data)
	}

	const getEnvironmentLogs = async (limit?: number): Promise<Log[]> => {
		if (limit)
			return API.get(`environment/history/?limit=${limit}`).then(res => res.data)
		else
			return API.get('environment/history/').then(res => res.data)
	}

	const deleteLog = async (id: number): Promise<void> => {
		return API.delete(`environment/history/${id}/`)
	}

	return {
		getEnvironmentStatistics,
		getEnvironmentLogs,
		deleteLog
	}
}
