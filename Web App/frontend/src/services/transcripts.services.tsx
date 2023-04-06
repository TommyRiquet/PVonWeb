import config from '../config.json'


interface Transcript {
	id: number
	name: string
	occurenceDate: string
	adminName: string
}


export const useTranscriptAPI = () => {

	const getListTranscript = async (): Promise<Array<Transcript>> => {
		return fetch(`${config.API_URL}transcript/`, {
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
