import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Tag, User, Environment, Transcript } from '../entity'

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

		if (!user)
			return res.status(404).json({ message: 'User not found' })


		const environment = await environmentRepository.findOneBy({
			users: user
		})
		const tag = await tagRepository.find({
			take: number,
			where: {
				environment: environment,
				isActive: true
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

		if (!user)
			return res.status(404).json({ message: 'User not found' })


		if(user.role !== 'admin')
			return res.status(403).json({ message: 'You are not allowed to create a tag' })

		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const tagExists = await tagRepository.findOneBy({
			name: req.body.name,
			environment: environment,
			isActive: true
		})

		if (tagExists)
			return res.status(409).json({ message: 'Tag already exists' })

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

		if (!user)
			return res.status(404).json({ message: 'User not found' })

		if(user.role !== 'admin')
			return res.status(403).json({ message: 'You are not allowed to update this tag' })

		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const tagExists = await tagRepository.findOneBy({
			name: req.body.name,
			environment: environment,
			isActive: true
		})



		const tag = await tagRepository.findOneBy({
			id: req.params.id
		})

		if (tagExists)
			return res.status(409).json({ message: 'Tag already exists' })

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


export const deleteTag = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)
	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {

		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const user = await userRepository.findOneBy({
			id: id
		})

		if (!user){
			res.status(404).json({ message: 'User not found' })
		}
		if(user.role !== 'admin') {
			res.status(403).json({ message: 'You are not allowed to delete this tag' })
		}

		const environment = await environmentRepository.findOneBy({
			users: user
		})

		const tag = await tagRepository.findOneBy({
			id: req.params.id
		})

		const transcripts = await transcriptRepository.find({
			relations: {
				tags: true
			},
			where: { tags: tag }
		})

		transcripts.forEach(transcript => {
			transcript.tags = transcript.tags.filter(t => t.id !== tag.id)
		})

		tag.isActive = false

		await tagRepository.save(tag)
		await transcriptRepository.save(transcripts)

		registerLog(id, environment, 'delete', {tag: tag})

		res.json({ status: 200, message: 'Tag deleted' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}

