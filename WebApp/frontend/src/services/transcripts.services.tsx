import config from '../config.json'

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

	const updateTranscript = async (data: any, transcript: Transcript, selectedTags: Tag[]): Promise<any> => {
		return fetch(`${config.API_URL}transcript/${transcript.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				...data,
				tags: selectedTags
			})
		}).then(res => res.json())
	}

	const getOrganizationOptions = async (): Promise<Array<Organization>> => {
		return fetch(`${config.API_URL}transcript/organizations`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			}
		}).then(res => res.json())
	}

	const createTranscript = async (data: any, selectedTags: Tag[], organization?: string): Promise<any> => {
		return fetch(`${config.API_URL}transcript/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				...data,
				companyName: organization,
				tags: selectedTags
			})
		}).then(res => res.json())
	}

	return {
		getListTranscript,
		updateTranscript,
		getOrganizationOptions,
		createTranscript
	}
}
