import config from '../config.json'


export interface Transcript {
	id: number
	name: string
	occurenceDate: string
	adminName: string
	companyName: string
	scrutineerName: string
	secretaryName: string
}


export const useTranscriptAPI = () => {

	const getListTranscript = async (numberOfTranscript?: number): Promise<Array<Transcript>> => {
		const limit = numberOfTranscript ? `?limit=${numberOfTranscript}` : ''
		return fetch(`${config.API_URL}transcript/${limit}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	const updateTranscript = async (data: any, transcript: Transcript): Promise<any> => {
		return fetch(`${config.API_URL}transcript/${transcript.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
	}

	return {
		getListTranscript,
		updateTranscript
	}
}
