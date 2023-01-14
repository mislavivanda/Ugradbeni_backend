const { DatabaseConnection } = require('./sequelize')
const exprr = require('./express')
const { httplogger, nodelogger } = require('./loggers')
module.exports = {
  load: async function (app) {
    try {
      await DatabaseConnection(nodelogger)
      nodelogger.info('Sequelize loaded. Connected to database')
      try {
        await exprr(app, httplogger)
        nodelogger.info('Express loaded')
      } catch (error) {
        nodelogger.error(error)
        throw new Error()
      }
    } catch (error) {
      nodelogger.error(error)
      throw new Error()
    }
  }
}
