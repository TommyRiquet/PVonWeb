import { User } from '../entity'
import { AppDataSource } from '../config/database'
import { Request, Response } from 'express'
import { verifyToken } from '../services/authService'
const argon2 = require('argon2')


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


export const updateUser = async (req: Request, res: Response) => {
	
	try{
		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const userRepository = AppDataSource.getRepository(User)

		const user = await userRepository.createQueryBuilder('user')
		.select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.phoneNumber', 'user.role'])
		.where('user.id = :id', { id })
		.getOne()

		user.firstName = req.body.firstName
		user.lastName = req.body.lastName
		user.email = req.body.email
		user.phoneNumber = req.body.phoneNumber

		await userRepository.save(user)

		res.json(user)
	}
	catch (error) {
		res.status(500).json(error)
	}
}

export const changePassword = async (req: Request, res: Response) => {
	
	try{
		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const userRepository = AppDataSource.getRepository(User)

		const user = await userRepository.createQueryBuilder('user')
		.select(['user.id', 'user.password'])
		.where('user.id = :id', { id })
		.getOne()

		if (await argon2.verify(user.password, req.body.oldPassword) === false) {
			res.status(401).json({ status: 401, message: 'Incorrect password' })
			return
		}
		if (req.body.newPassword1 !== req.body.newPassword2) {
			res.status(401).json({ status: 401, message: 'Passwords do not match' })
			return
		}
		if(req.body.newPassword1.length < 8) {
			res.status(401).json({ status: 401, message: 'Password must be at least 8 characters long' })
			return
		}

		user.password = await argon2.hash(req.body.newPassword1)

		await userRepository.save(user)

		res.status(200).json({ status: 200, message: 'Password changed' })
	}
	catch (error) {
		res.status(500).json({message: error})
	}
}
