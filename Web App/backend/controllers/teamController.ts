import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User, Environment } from '../entity'

import { verifyToken } from '../services/authService'


export const getTeamMembersByEnvironment = async (req: Request, res: Response) => {
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
		const teamMembers = await userRepository.find({
			where: {
				environment: environment
			}
		})
		res.json(teamMembers)
	}
	catch (error) {
		res.status(500).json(error)
	}

}
