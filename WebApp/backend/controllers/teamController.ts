const argon2 = require('argon2')

import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User, UserEnvironment  } from '../entity'

import { sendPasswordMail } from '../services/mailService'
import { registerLog } from '../services/logService'

import { generateRandomPassword } from '../utils/utils'
import { getUserAndEnvironment } from './commonController'

export const getTeamMembersByEnvironment = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)

	try {

		const { environment } = await getUserAndEnvironment(req)

		let teamMembers = await userRepository.find({
			where: {
				userEnvironments: {
					environment: environment
				}
			},
			relations: {
				userEnvironments: {
					environment: true
				}
			}
		})

		teamMembers = teamMembers.map(teamMember => {
			const userEnvironment = teamMember.userEnvironments.find(userEnv => userEnv.environment.id === environment.id)
			return {
				id: teamMember.id,
				firstName: teamMember.firstName,
				lastName: teamMember.lastName,
				email: teamMember.email,
				phoneNumber: teamMember.phoneNumber,
				language: teamMember.language,
				password: undefined,
				userEnvironments: undefined,
				role: userEnvironment.role
			}
		})

		res.json(teamMembers)
	}
	catch (error) {
		res.status(500).json(error)
	}

}

export const addUser = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)
	const userEnvRepository = AppDataSource.getRepository(UserEnvironment)

	try{

		const { user, role, environment } = await getUserAndEnvironment(req)

		if (role !== 'admin') {
			res.status(401).json({ status: 401, message: 'Unauthorized' })
			return
		}

		const existingUserInCurrentEnvironment = await userRepository.createQueryBuilder('user')
			.innerJoin('user.userEnvironments', 'userEnvironments')
			.where('userEnvironments.environmentId = :environmentId', { environmentId: environment.id })
			.andWhere('user.email = :email', { email: req.body.email })
			.getOne()

		if (existingUserInCurrentEnvironment) {
			res.status(401).json({ status: 401, message: 'User already exists in this environment' })
			return
		}

		const existingUser = await userRepository.findOne({ where: { email: req.body.email }})

		if (existingUser) {
			const userEnv = new UserEnvironment()
			userEnv.environmentId = environment.id
			userEnv.environment = environment
			userEnv.userId = existingUser.id
			userEnv.user = existingUser
			userEnv.role = 'user'

			await userEnvRepository.save(userEnv)

			registerLog(user.id, environment, 'create', {user: existingUser})

			res.status(200).json({ status: 200, message: 'User added' })
			return
		}

		const password = await argon2.hash(req.body.password)

		const newUser = new User()
		newUser.firstName = req.body.firstName
		newUser.lastName = req.body.lastName
		newUser.email = req.body.email
		newUser.phoneNumber = req.body.phoneNumber
		newUser.password = password

		const createdUser = await userRepository.save(newUser)

		const userEnv = new UserEnvironment()
		userEnv.environmentId = environment.id
		userEnv.environment = environment
		userEnv.userId = createdUser.id
		userEnv.user = createdUser
		userEnv.role = 'user'

		await userEnvRepository.save(userEnv)

		sendPasswordMail(newUser, req.body.password)
			.then(() => {
				res.status(200).json({ status: 200, message: 'User added' })
				registerLog(user.id, environment, 'create', {user: newUser})
			}).catch((error) => {
				res.status(500).json({message: error})
			})

	}
	catch (error) {
		res.status(500).json(error)
	}
}


export const kickUserFromEnvironment = async (req: Request, res: Response) => {

	const userEnvRepository = AppDataSource.getRepository(UserEnvironment)
	const userRepository = AppDataSource.getRepository(User)

	try{

		const { user, role, environment } = await getUserAndEnvironment(req)

		if (role !== 'admin') {
			res.status(401).json({ status: 401, message: 'Unauthorized' })
			return
		}

		const userEnv = await userEnvRepository.findOne({
			where: {
				userId: req.params.id,
				environmentId: environment.id
			}
		})

		const userToDelete = await userRepository.findOne({
			where: {
				id: req.params.id
			}
		})

		if (!userEnv) {
			res.status(404).json({ status: 404, message: 'User not found in this environment' })
			return
		}

		registerLog(user.id, environment, 'delete', {user: userToDelete})

		await userEnvRepository.remove(userEnv)

		res.status(200).json({ status: 200, message: 'User removed' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}

