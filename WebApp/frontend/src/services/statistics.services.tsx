import useAPI from './common.services'
import { User } from './users.services'
import { Transcript } from './transcripts.services'
import { Tag } from './tags.services'
import { Environment } from './environment.services'

export interface Statistics {
	numberOfUsers: number
	numberOfTranscriptCreated: number
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

	const getEnvironmentLogs = async (): Promise<Log[]> => {
		return API.get('environment/history/').then(res => res.data)
	}

	return {
		getEnvironmentStatistics,
		getEnvironmentLogs
	}
}
