import useAPI from './common.services'

import { Tag } from './tags.services'


export interface Transcript {
	id: number
	name: string
	occurenceDate: string
	adminName: string
	companyName: string
	scrutineerName: string
	secretaryName: string
	tags: Tag[]
}

export interface ExternalUser {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}
export interface Organization {
	organisation_name: string
	organisation_address: string
	organisation_localité: string
	organisation_code_postal: string
	organisation_phone: string
	organisation_email: string
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

	const updateTranscript = async (data: any, transcript: Transcript, selectedTags: Tag[]): Promise<any> => {
		return API.patch(`transcript/${transcript.id}/`, {
			...data,
			tags: selectedTags
		}).then(res => res.data)
	}

	const getOrganizationOptions = async (): Promise<Array<Organization>> => {
		return API.get('transcript/organizations').then(res => res.data)
	}

	const createTranscript = async (data: any, selectedTags: Tag[], organization?: string): Promise<any> => {
		return API.post('transcript/', {
			...data,
			companyName: organization,
			tags: selectedTags
		}).then(res => res.data)
	}

	return {
		getListTranscript,
		updateTranscript,
		getOrganizationOptions,
		createTranscript
	}
}
