import { Request, Response } from 'express'

import { AppDataSource } from '../config/database'

import { User } from '../entity'

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
