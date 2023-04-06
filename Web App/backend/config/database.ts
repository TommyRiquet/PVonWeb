import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../models/User'
import { Environment } from '../models/Environment'
import { Transcript } from '../models/Transcript'

import config from './config'

const dbConfig = process.env.NODE_ENV === 'production' ? config.production : config.development

const AppDataSource = new DataSource({
	type: 'mysql',
	host: dbConfig.host,
	port: 3306,
	username: dbConfig.username,
	password: dbConfig.password,
	database: dbConfig.database,
	entities: [User, Environment, Transcript],
	synchronize: true,
	logging: false
})

export { AppDataSource }
