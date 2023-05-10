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

	const updateTag = async (data:any, tag: Tag): Promise<any> => {
		return fetch(`${config.API_URL}transcript/tag/${tag.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
	}

	const deleteTag = async (tag: Tag): Promise<any> => {
		return fetch(`${config.API_URL}transcript/tag/${tag.id}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	return {
		getTags,
		createTag,
		updateTag,
		deleteTag
	}
}
