module.exports = class Subject {
  constructor (models, logger) {
    this.subjectModel = models.subject
    this.logger = logger
  }

  async getSubjectByName (name) {
    try {
      const subject = await this.subjectModel.findOne({
        attributes: ['id', 'name'],
        where: {
          name
        }
      })
      return subject
    } catch (error) {
      this.logger.error('Error in function  getSubjectByName' + error)
      throw (error)
    }
  }
}
