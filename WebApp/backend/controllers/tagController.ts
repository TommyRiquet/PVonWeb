import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Tag, User, Environment } from '../entity'

import { verifyToken } from '../services/authService'
import { registerLog } from '../services/logService'


export const getTagsByEnvironment = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const number = req.query.limit || 500

		const user = await userRepository.findOneBy({
			id: id
		})

		if (!user){
			res.status(404).json({ message: 'User not found' })
		}

		const environment = await environmentRepository.findOneBy({
			users: user
		})
		const tag = await tagRepository.find({
			take: number,
			where: {
				environment: environment
			}
		})
		res.json(tag)
	}
	catch (error) {
		res.status(500).json(error)
	}
}

export const createTag = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})

		if (!user){
			res.status(404).json({ message: 'User not found' })
		}
		if(user.role !== 'admin') {
			res.status(403).json({ message: 'You are not allowed to create a tag' })
		}

		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const tag = new Tag()
		tag.name = req.body.name
		tag.description = req.body.description
		tag.environment = environment

		await tagRepository.save(tag)

		registerLog(id, environment, 'create', {tag: tag})

		res.json({ status: 200, message: 'Tag created' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}


export const updateTag = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})

		if (!user){
			res.status(404).json({ message: 'User not found' })
		}
		if(user.role !== 'admin') {
			res.status(403).json({ message: 'You are not allowed to update this tag' })
		}

		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const tag = await tagRepository.findOneBy({
			id: req.params.id
		})

		tag.name = req.body.name
		tag.description = req.body.description

		await tagRepository.save(tag)

		registerLog(id, environment, 'update', {tag: tag})

		res.json({ status: 200, message: 'Tag updated' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}


