const { Op } = require('sequelize')
module.exports = class ProfesorSubjectStats {
  constructor (models, logger) {
    this.pofesorSubjectStatsModel = models.professorSubjectStats
    this.logger = logger
  }

  async incrementProfesorSubjectStatsRecord (profesorID, subjectID, teachingType) {
    try {
      return await this.professorSubjectStats.increment(
        teachingType, {
          by: 1,
          where: {
            [Op.and]: [
              { profesorID },
              { subjectID }
            ]
          }
        })
    } catch (error) {
      this.logger.error('Error in function incrementProfesorSubjectStatsRecord' + error)
      throw (error)
    }
  }
}
