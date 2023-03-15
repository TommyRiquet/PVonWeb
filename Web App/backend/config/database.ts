import { Sequelize } from "sequelize";
const config = require('./config')

const ENV = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  config.default[ENV].database,
  config.default[ENV].username,
  config.default[ENV].password,
  {
    host: config.default[ENV].host,
    port: config.default[ENV].port,
    dialect: config.default[ENV].dialect,
    logging: false,
  }
);

export { sequelize };