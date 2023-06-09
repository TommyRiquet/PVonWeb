import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Transcript, Warrant } from '../entity'

import { getUserAndEnvironment } from './commonController'

import { registerLog } from '../services/logService'
import { fetchAPI } from '../services/externalApiService'
import { generatePdf } from '../services/pdfGenerator'

require('dotenv').config()

export const getTranscriptById = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {
		const transcript = await transcriptRepository.find({
			where: {
				id: req.params.id,
				deleted: false
			},
			relations: ['environment', 'warrants']
		})
		res.json(transcript)
	} catch (error) {
		res.status(500).json(error)
	}

}


export const getTranscriptByEnvironment = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {
		const number = req.query.limit || 500

		const { environment } = await getUserAndEnvironment(req)

		const transcripts = await transcriptRepository.find({
			take: number,
			where: {
				environment: environment,
				deleted: false
			},
			relations: ['tags', 'warrants']
		})

		res.json(transcripts)
	}
	catch (error) {
		res.status(500).json(error)
	}

}


export const updateTranscript = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)
	const warrantRepository = AppDataSource.getRepository(Warrant)

	try {

		let organizations = await fetchAPI(process.env.FAKE_API_URL + '/organizations/')

		if (organizations){

			const { user, environment } = await getUserAndEnvironment(req)

			const Listtranscript = await transcriptRepository.find({
				where: {
					id: req.params.id,
					deleted: false
				},
				relations: ['environment']
			})

			const transcript = Listtranscript[0]

			if (transcript.environment.id !== environment.id) {
				res.status(401).json({status: 401, message: 'Unauthorized'})
				return
			}

			transcript.name = req.body.name
			transcript.companyName = req.body.companyName
			transcript.adminName = req.body.adminName
			transcript.scrutineerName = req.body.scrutineerName
			transcript.secretaryName = req.body.secretaryName
			transcript.isConvocation = req.body.isConvocation
			transcript.isExact = req.body.isExact
			transcript.tags = req.body.tags

			const warrants = await warrantRepository.find({
				where: {
					transcript: transcript
				}
			})


			warrants.forEach((warrant, index) => {
				req.body.warrants.forEach((warrantBody) => {
					if (warrant.id === warrantBody.id) {
						warrants[index].state = warrantBody.state
						warrants[index].duration = warrantBody.duration
					}
				})
			})

			await warrantRepository.save(warrants)


			const organization = organizations.find((organization) => organization.name === transcript.companyName)

			const link = await generatePdf(organization, transcript, warrants)

			if ('filename' in link)
				transcript.link = link.filename

			await transcriptRepository.save(transcript)

			registerLog(user.id, environment, 'update', {transcript: transcript})


			res.json({status: 200, message: 'Transcript updated successfully'})
		}
		else
			res.status(500).json({status: 500, message: 'Generate pdf error'})
	}
	catch (error) {
		res.status(500).json(error)
	}
}


export const getAllOrganization = async (_: Request, res: Response) => {

	try {
		await fetchAPI(process.env.FAKE_API_URL + '/organizations')
			.then((data) => {
				res.json(data)
			})

	} catch (error) {
		res.status(500).json(error)
	}


}

export const createTranscript = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)
	const warrantRepository = AppDataSource.getRepository(Warrant)

	try {

		const { user, environment } = await getUserAndEnvironment(req)

		let organization = await fetchAPI(process.env.FAKE_API_URL + '/organizations/'+ parseInt(req.body.organization.id))

		if (organization){
			const transcript = new Transcript()

			transcript.name = req.body.name
			transcript.companyName = organization.name
			transcript.adminName = req.body.adminName
			transcript.scrutineerName = req.body.scrutineerName
			transcript.secretaryName = req.body.secretaryName
			transcript.tags = req.body.tags
			transcript.isConvocation = req.body.isConvocation
			transcript.isExact = req.body.isExact
			transcript.environment = environment

			await transcriptRepository.save(transcript)

			const warrants = []

			await req.body.warrants.map(async (warrant) => {
				const NewWarrant = new Warrant()
				NewWarrant.transcript = transcript
				NewWarrant.adminName = warrant.adminName
				NewWarrant.state = warrant.state
				NewWarrant.duration = warrant.duration
				warrants.push(NewWarrant)
				await warrantRepository.save(NewWarrant)
			})

			const link = await generatePdf(organization, transcript, warrants)

			if ('filename' in link)
				transcript.link = link.filename

			await transcriptRepository.save(transcript)

			registerLog(user.id, environment, 'create', {transcript: transcript})

			res.json({status: 200, message: 'Transcript created successfully', link: link})

		}
		else
			res.status(500).json({status: 500, message: 'Organization not found'})


	} catch (error) {
		res.status(500).json(error)
	}
}


export const deleteTranscript = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {

		const { user, environment } = await getUserAndEnvironment(req)

		const Listtranscript = await transcriptRepository.find({
			where: {
				id: req.params.id,
				deleted: false
			},
			relations: ['environment']
		})

		const transcript = Listtranscript[0]

		if (transcript.environment.id !== environment.id) {
			res.status(401).json({status: 401, message: 'Unauthorized'})
			return
		}

		transcript.deleted = true

		await transcriptRepository.save(transcript)

		registerLog(user.id, environment, 'delete', {transcript: transcript})

		res.json({ status: 200, message: 'Transcript deleted' })

	}
	catch (error) {
		res.status(500).json(error)
	}

}
