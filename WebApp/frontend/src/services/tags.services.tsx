import config from '../config.json'


export interface Tag {
	id: number
	name: string
	description: string
}


export const useTagsAPI = () => {

	const getTags = async (): Promise<Array<Tag>> => {
		return fetch(`${config.API_URL}transcript/tag/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	const createTag = async (tag: any): Promise<any> => {
		return fetch(`${config.API_URL}transcript/tag/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(tag)
		}).then(res => res.json())
	}

	return {
		getTags,
		createTag
	}
}
