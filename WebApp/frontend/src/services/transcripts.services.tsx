import useAPI from './common.services'

import { Tag } from './tags.services'


export interface Warrant {
	id: number
	adminName: string
	state: string
	duration?: number
}

export interface Transcript {
	id: number
	name: string
	occurenceDate: string
	adminName: string
	companyName: string
	scrutineerName: string
	secretaryName: string
	link: string
	isConvocation: boolean
	isExact: boolean
	warrants: Warrant[]
	tags: Tag[]
}

export interface ExternalUser {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}
export interface Organization {
	id: number
	name: string
	address: string
	localité: string
	code_postal: string
	phone: string
	email: string
	registre_nationnal: string
	num_tva: string
	date_ago: string
	administrators: ExternalUser[]
	share_holders: ExternalUser[]
}



export const useTranscriptAPI = () => {

	const { API } = useAPI()

	const getListTranscript = async (numberOfTranscript?: number): Promise<Array<Transcript>> => {
		const limit = numberOfTranscript ? `?limit=${numberOfTranscript}` : ''
		return API.get(`transcript/${limit}`).then(res => res.data)
	}

	const updateTranscript = async (data: any, transcript: Transcript, selectedTags: Tag[], warrants: Warrant[]): Promise<any> => {
		return API.patch(`transcript/${transcript.id}/`, {
			...data,
			tags: selectedTags,
			warrants: warrants
		}).then(res => res.data)
	}

	const getOrganizationOptions = async (): Promise<Array<Organization>> => {
		return API.get('transcript/organizations').then(res => res.data)
	}

	const createTranscript = async (data: any, selectedTags: Tag[], organization: Organization, warrants: Warrant[]): Promise<any> => {
		return API.post('transcript/', {
			...data,
			organization: organization,
			warrants: warrants,
			tags: selectedTags
		}).then(res => res.data)
	}

	const deleteTranscript = async (transcript: Transcript): Promise<any> => {
		return API.delete(`transcript/${transcript.id}/`).then(res => res.data)
	}

	return {
		getListTranscript,
		updateTranscript,
		getOrganizationOptions,
		createTranscript,
		deleteTranscript
	}
}
