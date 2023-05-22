import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Transcript, User, Environment } from '../entity'

import { verifyToken } from '../services/authService'
import { registerLog } from '../services/logService'

import { fetchAPI } from '../services/externalApiService'

require('dotenv').config()

export const getTranscriptById = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {
		const transcript = await transcriptRepository.findOneBy({
			id: req.params.id,
			isActive: true
		})
		res.json(transcript)
	} catch (error) {
		res.status(500).json(error)
	}

}


export const getTranscriptByEnvironment = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)
	const userRepository = AppDataSource.getRepository(User)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id
		const number = req.query.limit || 500

		const user = await userRepository.findOne({
			where: { id: id },
			relations: ['environment']
		})
		const environment = user.environment[0]

		const transcripts = await transcriptRepository.find({
			take: number,
			where: {
				environment: environment,
				isActive: true
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
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})
		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const transcript = await transcriptRepository.findOneBy({
			id: req.params.id,
			isActive: true
		})

		transcript.name = req.body.name
		transcript.companyName = req.body.companyName
		transcript.adminName = req.body.adminName
		transcript.scrutineerName = req.body.scrutineerName
		transcript.secretaryName = req.body.secretaryName
		transcript.tags = req.body.tags

		transcriptRepository.save(transcript)

		registerLog(id, environment, 'update', {transcript: transcript})


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
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})
		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const transcript = new Transcript()

		transcript.name = req.body.name
		transcript.companyName = req.body.companyName
		transcript.adminName = req.body.adminName
		transcript.scrutineerName = req.body.scrutineerName
		transcript.secretaryName = req.body.secretaryName
		transcript.tags = req.body.tags
		transcript.environment = environment

		await transcriptRepository.save(transcript)

		registerLog(id, environment, 'create', {transcript: transcript})

		res.json({status: 200, message: 'Transcript created successfully'})

	} catch (error) {
		res.status(500).json(error)
	}
}
