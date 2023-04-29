import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User, Environment, Transcript } from '../entity'

import { verifyToken } from '../services/authService'


export const getStatisticsByEnvironment = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})
		const environment = await environmentRepository.findOneBy({
			users: user
		})
		const teamMembersCount = await userRepository.count({
			where: {
				environment: environment
			}
		})
		const transcriptCount = await transcriptRepository.count({
			where: {
				environment: environment
			}
		})

		const statistics = {
			numberOfUsers: teamMembersCount,
			numberOfTranscriptCreated: transcriptCount
		}

		res.json(statistics)
	}
	catch (error) {
		res.status(500).json(error)
	}

}
