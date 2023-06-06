import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User } from '../entity'

import { verifyToken } from '../services/authService'

export const getUserAndEnvironment = async (req: Request) => {

	const userRepository = AppDataSource.getRepository(User)

	try {
		const email = verifyToken(req.headers.authorization.split(' ')[1]).email

		const envId = parseInt(req.headers['x-env-id'])

		const user = await userRepository.findOne({
			where: { email: email },
			relations: {
				userEnvironments: {
					environment: true
				}
			}
		})

		const role = user.userEnvironments.find(env => env.environment.id === envId).role

		const environment = user.userEnvironments.find(env => env.environment.id === envId).environment

		return { user, role, environment }
	}
	catch (error) {
		return error
	}
}
