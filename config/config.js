const dotenv = require('dotenv')
const envFound = dotenv.config()
const { nodelogger } = require('../loaders/loggers')
if (envFound.error) {
  throw new Error("Couldn't find .env file")
}
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: (msg) => nodelogger.info(`Node logger: ${msg}`)
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: (msg) => nodelogger.info(`Node logger: ${msg}`)
  }
}
