import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User, Environment, Transcript, Log } from '../entity'

import config from './config'

const dbConfig = config[process.env.NODE_ENV || 'development']

const AppDataSource = new DataSource({
	type: 'mysql',
	host: dbConfig.host,
	port: 3306,
	username: dbConfig.username,
	password: dbConfig.password,
	database: dbConfig.database,
	entities: [User, Environment, Transcript, Log],
	synchronize: true,
	logging: false
})

export { AppDataSource }
