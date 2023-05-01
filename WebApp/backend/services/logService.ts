import { Log } from '../entity'
import { AppDataSource } from '../config/database'

export const registerLog = async (user, environment, action, target) => {

	const logRepository = AppDataSource.getRepository(Log)

	const targetEnvironment = target?.environment
	const targetTranscript = target?.transcript
	const targetUser = target?.user

	try {
		const log = await logRepository.createQueryBuilder('log')
			.insert()
			.values({
				user: user,
				environment: environment,
				action: action,
				targetEnvironment: targetEnvironment,
				targetTranscript: targetTranscript,
				targetUser: targetUser
			})
			.execute()
		return log
	}
	catch (error) {
		return error
	}
}
