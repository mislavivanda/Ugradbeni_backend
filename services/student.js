module.exports = class Student {
  constructor (models, logger) {
    this.studentModel = models.student
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
      throw (error)
    }
  }
}
