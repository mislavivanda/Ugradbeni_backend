const { Op } = require('sequelize')
module.exports = class StudentSubjectStats {
  constructor (models, logger) {
    this.studentSubjectStatsModel = models.studentSubjectStats
    this.logger = logger
  }

  async incrementStudentSubjectStatsRecord (studentID, subjectID, typeName) {
    try {
      return await this.studentSubjectStatsModel.increment(
        typeName, {
          by: 1,
          where: {
            [Op.and]: [
              { studentID },
              { subjectID }
            ]
          }
        })
    } catch (error) {
      this.logger.error('Error in function incrementStudentSubjectStatsRecord' + error)
      throw (error)
    }
  }
}
