import config from '../config.json'


export interface Transcript {
	id: number
	name: string
	occurenceDate: string
	adminName: string
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

	return {
		getListTranscript
	}
}
