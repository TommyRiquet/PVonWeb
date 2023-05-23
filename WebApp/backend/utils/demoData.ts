import { User, Environment, Transcript, UserEnvironment } from '../entity/'
require('dotenv').config()


const createEnvironment = async (environmentRepository, name, description) => {
	const environment = new Environment()
	environment.name = name
	environment.description = description

	await environmentRepository.save(environment)
	return environment
}


const createTranscript = async (transcriptRepository, name, companyName, adminName, secretaryName, scrutineerName, shareHolders, occurenceDate, environment) => {
	const transcript = new Transcript()
	transcript.name = name
	transcript.companyName = companyName
	transcript.adminName = adminName
	transcript.secretaryName = secretaryName
	transcript.scrutineerName = scrutineerName
	transcript.shareHolders = shareHolders
	transcript.occurenceDate = occurenceDate
	transcript.environment = environment

	await transcriptRepository.save(transcript)
	return transcript
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
	const transcriptRepository = AppDataSource.getRepository(Transcript)

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

	await createTranscript(transcriptRepository, 'Demo Transcript 1', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 2', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 3', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 4', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 5', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 6', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 7', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 8', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 9', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 10', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 11', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 12', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 13', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 14', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 15', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 16', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 17', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 18', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 19', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)
	await createTranscript(transcriptRepository, 'Demo Transcript 20', 'Demo Company', 'Admin', 'Secretary', 'Scrutineer', 'ShareHolder1, ShareHolder2', new Date(), environment1)

	console.log('Demo data loaded')
}
