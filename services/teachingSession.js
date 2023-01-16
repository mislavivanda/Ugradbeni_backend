const { Op } = require('sequelize')
module.exports = class Session {
  constructor (models, logger) {
    this.teachingSessionModel = models.teachingSession
    this.logger = logger
  }

  async getTeachingSession (profesorID, subjectID, roomID) {
    try {
      const teachingSession = await this.teachingSessionModel.findOne({
        where: {
          [Op.and]: [
            { profesorID },
            { subjectID },
            { roomID }
          ]
        }
      })
      return teachingSession
    } catch (error) {
      this.logger.error('Error in function  getTeachingSession' + error)
      throw (error)
    }
  }

  async getActiveTeachingSessionForRoom (roomID) {
    try {
      const teachingSession = await this.teachingSessionModel.findOne({
        where: {
          [Op.and]: [
            { roomID },
            { active: true }
          ]
        }
      })
      return teachingSession
    } catch (error) {
      this.logger.error('Error in function  getActiveTeachingSessionForRoom' + error)
      throw (error)
    }
  }

  async createTeachingSession (teachingSessionObject) {
    try {
      return await this.teachingSessionModel.create(teachingSessionObject)
    } catch (error) {
      this.logger.error('Error in function  createTeachingSession' + error)
      throw (error)
    }
  }

  async closeTeachingSession (sessionID, stopDate) {
    try {
      await this.teachingSessionModel.update({
        stop: stopDate,
        active: false
      }, {
        where: {
          id: sessionID
        }
      })
    } catch (error) {
      this.logger.error('Error in function  closeTeachingSession' + error)
      throw (error)
    }
  }
}
