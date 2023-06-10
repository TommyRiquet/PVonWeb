import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User, Environment, Transcript, Log, Tag, UserEnvironment, Warrant } from '../entity'

import config from './config'

const AppDataSource = new DataSource({
	type: 'mysql',
	host: config.host,
	port: 3306,
	username: config.username,
	password: config.password,
	database: config.database,
	entities: [User, Environment, Transcript, Log, Tag, UserEnvironment, Warrant],
	synchronize: true,
	logging: false
})

export { AppDataSource }
