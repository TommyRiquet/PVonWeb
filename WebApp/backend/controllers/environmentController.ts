import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User, Environment, Transcript } from '../entity'

import { verifyToken } from '../services/authService'


export const getEnvironment = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})
		const environments = await environmentRepository.findOne({
			where: {
				users: user
			}
		})

		res.json(environments)
	}
	catch (error) {
		res.status(500).json(error)
	}
}

export const updateEnvironment = async (req: Request, res: Response) => {
	const environmentRepository = AppDataSource.getRepository(Environment)
	const userRepository = AppDataSource.getRepository(User)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})

		if(user.role !== 'admin') {
			res.status(403).json({ message: 'You are not allowed to update this environment' })
		}

		const environment = await environmentRepository.findOne({
			where: {
				users: user
			}
		})

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
