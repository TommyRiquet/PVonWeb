import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { Tag, Transcript } from '../entity'

import { registerLog } from '../services/logService'
import { getUserAndEnvironment } from './commonController'


export const getTagsByEnvironment = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)

	try {

		const { environment } = await getUserAndEnvironment(req)

		const number = req.query.limit || 500

		const tag = await tagRepository.find({
			take: number,
			where: {
				environment: environment,
				deleted: false
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

	try {

		const { user, role, environment } = await getUserAndEnvironment(req)

		if (role !== 'admin' && role !== 'owner') {
			res.status(401).json({ status: 401, message: 'Unauthorized' })
			return
		}

		const tagExists = await tagRepository.findOneBy({
			name: req.body.name,
			environment: environment,
			deleted: false
		})

		if (tagExists)
			return res.status(409).json({ message: 'Tag already exists' })

		const tag = new Tag()
		tag.name = req.body.name
		tag.description = req.body.description
		tag.environment = environment

		await tagRepository.save(tag)

		registerLog(user.id, environment, 'create', {tag: tag})

		res.json({ status: 200, message: 'Tag created' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}


export const updateTag = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)

	try {

		const { user, role, environment } = await getUserAndEnvironment(req)

		if (role !== 'admin' && role !== 'owner') {
			res.status(401).json({ status: 401, message: 'Unauthorized' })
			return
		}

		const tagExists = await tagRepository.findOneBy({
			name: req.body.name,
			environment: environment,
			deleted: false
		})



		const tag = await tagRepository.findOneBy({
			id: req.params.id
		})

		if (tagExists)
			return res.status(409).json({ message: 'Tag already exists' })

		tag.name = req.body.name
		tag.description = req.body.description

		await tagRepository.save(tag)

		registerLog(user.id, environment, 'update', {tag: tag})

		res.json({ status: 200, message: 'Tag updated' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}


export const deleteTag = async (req: Request, res: Response) => {
	const tagRepository = AppDataSource.getRepository(Tag)
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	try {

		const { user, role, environment } = await getUserAndEnvironment(req)

		if (role !== 'admin' && role !== 'owner') {
			res.status(401).json({ status: 401, message: 'Unauthorized' })
			return
		}

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

		tag.deleted = true

		await tagRepository.save(tag)
		await transcriptRepository.save(transcripts)

		registerLog(user.id, environment, 'delete', {tag: tag})

		res.json({ status: 200, message: 'Tag deleted' })

	}
	catch (error) {
		res.status(500).json(error)
	}
}

