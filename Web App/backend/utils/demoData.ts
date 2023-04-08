import { User, Environment, Transcript } from '../entity/'

export const loadDemoData = async (AppDataSource) => {
	if (process.env.NODE_ENV !== 'development') return

	const userRepository = AppDataSource.getRepository(User)
	const environmentRepository = AppDataSource.getRepository(Environment)
	const transcriptRepository = AppDataSource.getRepository(Transcript)

	const userCount = await userRepository.count()
	if (userCount > 0){
		console.log('Demo data already loaded')
		return
	}

	const environment1 = new Environment()
	environment1.name = 'Development'
	environment1.description = 'Development environment'
	await environmentRepository.save(environment1)

	const user1 = new User()
	user1.firstName = 'Admin'
	user1.lastName = 'Admin'
	user1.email = 'admin@pvonweb.com'
	user1.password = 'adminadmin'
	user1.role = 'admin'
	user1.environment = environment1
	await userRepository.save(user1)

	const user2 = new User()
	user2.firstName = 'Demo'
	user2.lastName = 'Demo'
	user2.email = 'demo@pvonweb.com'
	user2.password = 'demodemo'
	user2.environment = environment1
	await userRepository.save(user2)

	const transcript1 = new Transcript()
	transcript1.name = 'Demo Transcript'
	transcript1.companyName = 'testCompany'
	transcript1.adminName = 'testAdmin'
	transcript1.secretaryName = 'testSecretary'
	transcript1.scrutineerName = 'testScrutineer'
	transcript1.shareHolders = 'testShareHolders'
	transcript1.occurenceDate = '01/01/2019'
	transcript1.environment = environment1
	await transcriptRepository.save(transcript1)


	console.log('Demo data loaded')
}
