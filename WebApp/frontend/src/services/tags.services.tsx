import useAPI from './common.services'

export interface Tag {
	id: number
	name: string
	description: string
}


export const useTagsAPI = () => {

	const { API } = useAPI()

	const getTags = async (): Promise<Array<Tag>> => {
		return API.get('transcript/tag/').then(res => res.data)
	}

	const createTag = async (tag: any): Promise<any> => {
		return API.post('transcript/tag/', tag).then(res => res.data)
	}

	const updateTag = async (data:any, tag: Tag): Promise<any> => {
		return API.patch(`transcript/tag/${tag.id}/`, data).then(res => res.data)
	}

	const deleteTag = async (tag: Tag): Promise<any> => {
		return API.delete(`transcript/tag/${tag.id}/`).then(res => res.data)
	}

	return {
		getTags,
		createTag,
		updateTag,
		deleteTag
	}
}
