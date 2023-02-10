module.exports = class Student {
  constructor (models, logger) {
    this.studentModel = models.student
    this.subjectModel = models.subject
    this.studentTeachingStatsModel = models.studentSubjectStats
    this.logger = logger
  }

  async getStudentByUserID (userID) {
    try {
      const student = await this.studentModel.findOne({
        attributes: ['studentID', 'name', 'surname', 'email'],
        where: {
          userID
        }
      })
      return student
    } catch (error) {
      this.logger.error('Error in function  getUser' + error)
      throw error
    }
  }

  async getStudentTeachingStats (studentID) {
    try {
      const studentTeachingStats = await this.studentTeachingStatsModel.findAll({
        include: {
          model: this.subjectModel
        },
        where: {
          studentID
        }
      })
      const responseDataFormat = [] // formatiraj tako da za svaki dio predmeta(lab,auditorne,predavanja) imamo zasebnu stavku
      for (let i = 0; i < studentTeachingStats.length; i++) {
        if (studentTeachingStats[i].subject.predavanjaTotal > 0) {
          responseDataFormat.push({
            name: studentTeachingStats[i].subject.name + '(pred)',
            score: studentTeachingStats[i].predavanja,
            total: studentTeachingStats[i].subject.predavanjaTotal
          })
        }
        if (studentTeachingStats[i].subject.laboviTotal > 0) {
          responseDataFormat.push({
            name: studentTeachingStats[i].subject.name + '(lab)',
            score: studentTeachingStats[i].labovi,
            total: studentTeachingStats[i].subject.laboviTotal
          })
        }
        if (studentTeachingStats[i].subject.auditorneTotal > 0) {
          responseDataFormat.push({
            name: studentTeachingStats[i].subject.name + '(audit)',
            score: studentTeachingStats[i].auditorne,
            total: studentTeachingStats[i].subject.auditorneTotal
          })
        }
      }
      return responseDataFormat
    } catch (error) {
      this.logger.error('Error in function  getStudentTeachingStats' + error)
      throw error
    }
  }
}
