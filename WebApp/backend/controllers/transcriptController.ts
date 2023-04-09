import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Transcript, User, Environment } from '../entity'

import { verifyToken } from '../services/authService'


export const getTranscriptById = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {
		const transcript = await transcriptRepository.findOneBy({
			id: req.params.id
		})
		res.json(transcript)
	} catch (error) {
		res.status(500).json(error)
	}

}


export const getTranscriptByEnvironment = async (req: Request, res: Response) => {
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
		const transcript = await transcriptRepository.find({
			where: {
				environment: environment
			}
		})
		res.json(transcript)
	}
	catch (error) {
		res.status(500).json(error)
	}

}
