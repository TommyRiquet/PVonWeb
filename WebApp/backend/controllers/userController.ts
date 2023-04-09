import { User } from '../entity'
import { AppDataSource } from '../config/database'
import { Request, Response } from 'express'
import { verifyToken } from '../services/authService'

export const getUser = async (req: Request, res: Response) => {

	try{
		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const userRepository = AppDataSource.getRepository(User)

		const user = await userRepository.createQueryBuilder('user')
		.select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.phoneNumber', 'user.role'])
		.where('user.id = :id', { id })
		.getOne()

		res.json(user)
	}
	catch (error) {
		res.status(500).json(error)
	}
}