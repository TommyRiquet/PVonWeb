import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Transcript, User } from '../entity'

import { verifyToken } from '../services/authService'
import { registerLog } from '../services/logService'

import { fetchAPI } from '../services/externalApiService'
import { getUserAndEnvironment } from './commonController'

require('dotenv').config()

export const getTranscriptById = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {
		const transcript = await transcriptRepository.findOneBy({
			id: req.params.id,
			deleted: false
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
			relations: ['tags']
		})

		res.json(transcripts)
	}
	catch (error) {
		res.status(500).json(error)
	}

}


export const updateTranscript = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {

		const { user, environment } = await getUserAndEnvironment(req)

		const transcript = await transcriptRepository.findOneBy({
			id: req.params.id,
			deleted: false
		})

		transcript.name = req.body.name
		transcript.companyName = req.body.companyName
		transcript.adminName = req.body.adminName
		transcript.scrutineerName = req.body.scrutineerName
		transcript.secretaryName = req.body.secretaryName
		transcript.tags = req.body.tags

		transcriptRepository.save(transcript)

		registerLog(user.id, environment, 'update', {transcript: transcript})


		res.json({status: 200, message: 'Transcript updated successfully'})
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
	const userRepository = AppDataSource.getRepository(User)

	try {

		const { user, environment } = await getUserAndEnvironment(req)

		const transcript = new Transcript()

		transcript.name = req.body.name
		transcript.companyName = req.body.companyName
		transcript.adminName = req.body.adminName
		transcript.scrutineerName = req.body.scrutineerName
		transcript.secretaryName = req.body.secretaryName
		transcript.tags = req.body.tags
		transcript.environment = environment

		await transcriptRepository.save(transcript)

		registerLog(user.id, environment, 'create', {transcript: transcript})

		res.json({status: 200, message: 'Transcript created successfully'})

	} catch (error) {
		res.status(500).json(error)
	}
}
