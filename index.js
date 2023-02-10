const { nodelogger } = require('./loaders/loggers')
const { sequelize } = require('./models')
async function DatabaseConnection () {
  nodelogger.info('Connecting to database....')
  try {
    await sequelize.authenticate()
    nodelogger.info('Connected to database.')
  } catch (error) {
    nodelogger.info('Error in database connection ' + error)
    process.exit(1)
  }
}

async function init () {
  try {
    await DatabaseConnection()
  } catch (error) {
    nodelogger.error('Greska u izvodenju' + error)
  }
}
init()
