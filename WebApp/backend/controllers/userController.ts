const argon2 = require('argon2')

import { User, Environment } from '../entity'
import { AppDataSource } from '../config/database'
import { Request, Response } from 'express'

import { verifyToken } from '../services/authService'
import { sendPasswordMail } from '../services/mailService'
import { registerLog } from '../services/logService'

import { generateRandomPassword } from '../utils/utils'
import { getUserAndEnvironment } from './commonController'


export const getUser = async (req: Request, res: Response) => {

	try{
		const id = verifyToken(req.headers.authorization.split(' ')[1]).id

		const userRepository = AppDataSource.getRepository(User)

		const user = await userRepository.findOne({
			where: { id: id },
			relations: {
				userEnvironments: {
					environment: true
				}
			}
		})

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
			.select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.phoneNumber'])
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

export const addUser = async (req: Request, res: Response) => {
	const userRepository = AppDataSource.getRepository(User)

	try{

		const { user, environment } = await getUserAndEnvironment(req)

		const isEmailUsed = await userRepository.findOne({ where: { email: req.body.email }})
		if (isEmailUsed) {
			res.status(401).json({ status: 401, message: 'User already invited' })
			return
		}

		const password = generateRandomPassword()

		const newUser = new User()
		newUser.firstName = req.body.firstName
		newUser.lastName = req.body.lastName
		newUser.email = req.body.email
		newUser.phoneNumber = req.body.phoneNumber
		newUser.password = await argon2.hash(password)

		newUser.userEnvironments = [{ userId: newUser.id, user: newUser, environmentId: environment.id, environment: environment, role: 'user' }]

		await userRepository.save(newUser)


		sendPasswordMail(newUser, password)
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
