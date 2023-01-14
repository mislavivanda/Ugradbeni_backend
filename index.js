const { nodelogger } = require('./loaders/loggers')
const { sequelize } = require('./models')
const models = require('./models')
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
    const data = await models.igracutakmica.findAll({
      include: {
        model: models.clanovitima
      },
      order: [['clanovitima', 'broj_dresa', 'ASC']]
    })
    nodelogger.info(JSON.stringify(data))
  } catch (error) {
    nodelogger.error('Greska u izvodenju' + error)
  }
}
init()
