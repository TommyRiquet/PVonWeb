import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User } from '../entity'

import { getUserAndEnvironment } from './commonController'


export const getTeamMembersByEnvironment = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)

	try {

		const { environment } = await getUserAndEnvironment(req)

		const teamMembers = await userRepository.find({
			select: ['id', 'firstName', 'lastName', 'email', 'phoneNumber'],
			where: {
				userEnvironments: {
					environment: environment
				}
			}
		})
		res.json(teamMembers)
	}
	catch (error) {
		res.status(500).json(error)
	}

}
