module.exports = class Student {
  constructor (models, logger) {
    this.profesorModel = models.profesor
    this.logger = logger
  }

  async getProfesorByUserID (userID) {
    try {
      const profesor = await this.profesorModel.findOne({
        attributes: ['profesorID', 'name', 'surname', 'email'],
        where: {
          userID
        }
      })
      return profesor
    } catch (error) {
      this.logger.error('Error in function  getUser' + error)
      throw (error)
    }
  }
}
