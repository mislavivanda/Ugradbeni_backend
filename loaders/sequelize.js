const { sequelize } = require('../models')

module.exports = {
  DatabaseConnection: async function (logger) {
    logger.info('Connecting to database....')
    try {
      await sequelize.authenticate()
      logger.info('Connected to database.')
    } catch (error) {
      logger.error('Error in database connection ' + error)
      process.exit(1)
    }
  }
}
