module.exports = class Profesor {
  constructor(models, logger) {
    this.profesorModel = models.profesor
    this.profesorTeachingStatsModel = models.professorSubjectStats
    this.subjectModel = models.subject
    this.logger = logger
  }

  async getProfesorByUserID(userID) {
    try {
      const profesor = await this.profesorModel.findOne({
        attributes: ['profesorID', 'name', 'surname', 'email'],
        where: {
          userID,
        },
      })
      return profesor
    } catch (error) {
      this.logger.error('Error in function  getUser' + error)
      throw error
    }
  }

  async getProfesorTeachingStats(profesorID) {
    try {
      const profesorTeachingStats = await this.profesorTeachingStatsModel.findAll({
        include: {
          model: this.subjectModel,
        },
        where: {
          profesorID,
        },
      })
      const responseDataFormat = [] // formatiraj tako da za svaki dio predmeta(lab,auditorne,predavanja) imamo zasebnu stavku
      for (let i = 0; i < profesorTeachingStats.length; i++) {
        if (profesorTeachingStats[i].subject.predavanjaTotal > 0) {
          responseDataFormat.push({
            name: profesorTeachingStats[i].subject.name + '(pred)',
            score: profesorTeachingStats[i].predavanja,
            total: profesorTeachingStats[i].subject.predavanjaTotal
          })
        }
        if (profesorTeachingStats[i].subject.laboviTotal > 0) {
          responseDataFormat.push({
            name: profesorTeachingStats[i].subject.name + '(lab)',
            score: profesorTeachingStats[i].labovi,
            total: profesorTeachingStats[i].subject.laboviTotal
          })
        }
        if (profesorTeachingStats[i].subject.auditorneTotal > 0) {
          responseDataFormat.push({
            name: profesorTeachingStats[i].subject.name + '(audit)',
            score: profesorTeachingStats[i].auditorne,
            total: profesorTeachingStats[i].subject.auditorneTotal
          })
        }
      }
      return responseDataFormat
    } catch (error) {
      this.logger.error('Error in function  getProfesorTeachingStats' + error)
      throw error
    }
  }
}
