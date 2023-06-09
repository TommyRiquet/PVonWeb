const path = require('path')

import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Transcript, UserEnvironment } from '../entity'

import { getUserAndEnvironment } from './commonController'

export const getMedia = async (req: Request, res: Response) => {
	const transcriptRepository = AppDataSource.getRepository(Transcript)
	const userEnvironmentsRepository = AppDataSource.getRepository(UserEnvironment)

	try {
		const { user, environment } = await getUserAndEnvironment(req)

		const id = req.params.id.split('.')[0]

		const transcript = await transcriptRepository.findOne({
			where: {
				id: id,
				deleted: false
			},
			relations: ['environment']
		})

		const userEnvironments = await userEnvironmentsRepository.find({
			where: {
				user: user,
				environment: transcript.environment
			}
		})

		if (!transcript) {
			return res.status(404).json({ message: 'Transcript not found' })
		}

		if (transcript.environment.id !== environment.id && userEnvironments.length === 0) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		res.sendFile(path.join(__dirname + `/../media/${req.params.id}`))
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
