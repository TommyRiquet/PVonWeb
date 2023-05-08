import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Log, User, Environment } from '../entity'
import { verifyToken } from '../services/authService'


export const getLogs = async (req: Request, res: Response) => {
	const logRepository = AppDataSource.getRepository(Log)
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
		const logs = await logRepository.find({
			select: ['id', 'action', 'timestamp', 'user', 'targetEnvironment', 'targetTranscript', 'targetUser', 'targetTag'],
			where: {
				environment: environment
			},
			relations: ['user', 'targetEnvironment', 'targetTranscript', 'targetUser', 'targetTag'],
			order: {
				timestamp: 'DESC'
			}
		})
		logs.forEach(log => {
			if (log.user && log.user.password)
				log.user.password = undefined
			if (log.targetEnvironment && log.targetEnvironment.users)
				log.targetEnvironment?.users.forEach(user => {
					user.password = undefined
				})
			if (log.targetUser && log.targetUser.password)
				log.targetUser.password = undefined
		})
		res.json(logs)
	}
	catch (error) {
		res.status(500).json(error)
	}
}
