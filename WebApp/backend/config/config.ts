require('dotenv').config()

export default {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    dialect: 'mysql',
    logging: false
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT as string),
    dialect: 'mysql',
    logging: false
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    port: parseInt(process.env.DB_PORT as string),
    dialect: 'mysql',
    logging: false
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION
}
