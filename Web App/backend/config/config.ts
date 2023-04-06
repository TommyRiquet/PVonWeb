require('dotenv').config()

export default {
  development: {
    database: process.env.DB_NAME || 'pvonweb',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: parseInt(process.env.DB_PORT as string) || 3306,
    dialect: 'mysql',
    logging: false
  },
  test: {
    database: process.env.DB_NAME || 'my_app_test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: parseInt(process.env.DB_PORT as string) || 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    database: process.env.DB_NAME || 'my_app_prod',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: parseInt(process.env.DB_PORT as string) || 3306,
    dialect: 'mysql',
    logging: false
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION
}
