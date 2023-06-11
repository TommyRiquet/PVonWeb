import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Log } from '../entity'

import { getUserAndEnvironment } from './commonController'


export const getLogs = async (req: Request, res: Response) => {
	const logRepository = AppDataSource.getRepository(Log)

	try {
		const { environment } = await getUserAndEnvironment(req)

		const logs = await logRepository.find({
			select: ['id', 'action', 'timestamp', 'user', 'targetEnvironment', 'targetTranscript', 'targetUser', 'targetTag'],
			where: {
				environment: environment
			},
			relations: ['user', 'targetEnvironment', 'targetTranscript', 'targetUser', 'targetTag'],
			order: {
				timestamp: 'DESC'
			},
			take: req.query.limit || 500
		})
		logs.forEach(log => {
			if (log.user && log.user.password)
				log.user.password = undefined
			if (log.targetUser && log.targetUser.password)
				log.targetUser.password = undefined
		})
		res.json(logs)
	}
	catch (error) {
		res.status(500).json(error)
	}
}

export const deleteLog = async (req: Request, res: Response) => {
	const logRepository = AppDataSource.getRepository(Log)

	try {
		const { error, role, environment } = await getUserAndEnvironment(req)

		if (error)
			return res.status(403).json({ message: error.message })

		if (role !== 'admin' && role !== 'owner')
			return res.status(403).json({ message: 'You are not allowed to delete logs' })

		await logRepository.delete({
			id: req.params.id,
			environment: environment
		})

		res.json({ message: 'Logs deleted' })
	}
	catch (error) {
		res.status(500).json(error)
	}
}
