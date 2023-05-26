import { User, Environment, Transcript, UserEnvironment } from '../entity/'
require('dotenv').config()


const createEnvironment = async (environmentRepository, name, description) => {
	const environment = new Environment()
	environment.name = name
	environment.description = description

	await environmentRepository.save(environment)
	return environment
}


const linkUserToEnvironment = async (userEnvironmentRepository, user, environment, role) => {
	environment.map(async (env) => {

		const userEnvironment = new UserEnvironment()
		userEnvironment.user = user
		userEnvironment.environment = env
		userEnvironment.role = role
		userEnvironment.userId = user.id
		userEnvironment.environmentId = env.id

		await userEnvironmentRepository.save(userEnvironment)

	})
}


const createUser = async (userRepository, firstName, lastName, email, password) => {
	const user = new User()
	user.firstName = firstName
	user.lastName = lastName
	user.email = email
	user.password = password

	await userRepository.save(user)
	return user
}


export const loadDemoData = async (AppDataSource) => {
	if (process.env.NODE_ENV !== 'development') return

	const userRepository = AppDataSource.getRepository(User)
	const userEnvironmentRepository = AppDataSource.getRepository(UserEnvironment)
	const environmentRepository = AppDataSource.getRepository(Environment)

	const userCount = await userRepository.count()
	if (userCount > 0){
		console.log('Demo data already loaded')
		return
	}

	const environment1 = await createEnvironment(environmentRepository, 'Environment 1', 'Demo Environment 1')
	const environment2 = await createEnvironment(environmentRepository, 'Environment 2', 'Demo Environment 2')
	const environment3 = await createEnvironment(environmentRepository, 'Environment 3', 'Demo Environment 3')

	const admin = await createUser(userRepository, 'Admin', 'Admin', 'admin@pvonweb.com', process.env.DEMO_DATA_ADMIN_PASSWORD)
	await linkUserToEnvironment(userEnvironmentRepository, admin, [environment1, environment2, environment3], 'admin')

	const demoUser = await createUser(userRepository, 'Demo', 'Demo', 'demo@pvonweb.com', process.env.DEMO_DATA_DEMO_PASSWORD)
	await linkUserToEnvironment(userEnvironmentRepository, demoUser, [environment1], 'user')

	console.log('Demo data loaded')
}
