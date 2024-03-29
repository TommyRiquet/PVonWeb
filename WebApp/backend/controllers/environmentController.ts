import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User, Environment, Transcript, Tag } from '../entity'

import { verifyToken } from '../services/authService'

import { getUserAndEnvironment } from './commonController'


export const getEnvironments = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)

	try {
		const email = verifyToken(req.headers.authorization.split(' ')[1]).email

		const user = await userRepository.findOne({
			where: {
				email: email
			},
			relations: {
				userEnvironments: {
					environment: true
				}
			}
		})
		const environments = user.userEnvironments.map(userEnv => userEnv.environment)

		res.json(environments)
	}
	catch (error) {
		res.status(500).json(error)
	}
}

export const updateEnvironment = async (req: Request, res: Response) => {
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const { error, role, environment } = await getUserAndEnvironment(req)

		if (error)
			return res.status(403).json({ message: error.message })

		if (role !== 'admin' && role !== 'owner')
			return res.status(403).json({ message: 'You are not allowed to update this environment' })

		environment.name = req.body.name
		environment.description = req.body.description

		await environmentRepository.save(environment)

		res.json(environment)
	}
	catch (error) {
		res.status(500).json(error)
	}
}




export const getStatisticsByEnvironment = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)
	const transcriptRepository = AppDataSource.getRepository(Transcript)
	const tagRepository = AppDataSource.getRepository(Tag)

	try {
		const { environment } = await getUserAndEnvironment(req)

		const teamMembersCount = await userRepository.count({
			where: {
				userEnvironments: {
					environment: environment
				}
			}
		})
		const transcriptCount = await transcriptRepository.count({
			where: {
				environment: environment,
				deleted: false
			}
		})
		const deletedTranscriptCount = await transcriptRepository.count({
			where: {
				environment: environment,
				deleted: true
			}
		})

		const TagCount = await tagRepository.count({
			where: {
				environment: environment
			}
		})

		const statistics = {
			numberOfUsers: teamMembersCount,
			numberOfTranscriptCreated: transcriptCount,
			numberOfTranscriptDeleted: deletedTranscriptCount,
			numberOfTagCreated: TagCount
		}

		res.json(statistics)
	}
	catch (error) {
		res.status(500).json(error)
	}

}
