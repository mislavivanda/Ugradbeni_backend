module.exports = class Users {
  constructor (models, logger) {
    this.usersModel = models.users
    this.logger = logger
  }

  async getUser (username) {
    try {
      const user = await this.usersModel.findOne({
        attributes: ['id', 'username', 'password', 'role'],
        where: {
          username
        }
      })
      return user
    } catch (error) {
      this.logger.error('Error in function  getUser' + error)
      throw (error)
    }
  }
}
