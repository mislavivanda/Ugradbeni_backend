const { Op } = require('sequelize')
module.exports = class Ping {
  constructor (models, logger) {
    this.pingModel = models.pings
    this.logger = logger
  }

  async createPingRecord (pingObject) {
    try {
      this.pingModel.create(pingObject)
    } catch (error) {
      this.logger.error('Error in function createPingRecord' + error)
      throw (error)
    }
  }

  async studentPresentRecordsForSession (studentID, sessionID) {
    try {
      return this.pingModel.findAll({
        where: {
          [Op.and]: [
            { studentID },
            { sessionID },
            { present: true }
          ]
        }
      })
    } catch (error) {
      this.logger.error('Error in function studentPresentRecordsForSession' + error)
      throw (error)
    }
  }
}
