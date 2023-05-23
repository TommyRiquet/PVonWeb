const argon2 = require('argon2')

import { User } from '../entity'

import { AppDataSource } from '../config/database'

import { Request, Response } from 'express'

import { generateToken, verifyToken} from '../services/authService'


export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const userRepository = AppDataSource.getRepository(User)

		const user = await userRepository.findOneBy({
			email: email
		})

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const isPasswordValid = await argon2.verify(user.password, password)

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const token = generateToken(user.id)
		res.json({ token })

	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}


export const verify = async (req: Request, res: Response) => {
	try {
		const token = req.body.token
		const payload = verifyToken(token)
		if (payload) {
			res.status(200).json({ message: 'Valid token' })
		} else {
			res.status(401).json({ message: 'Invalid token' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
