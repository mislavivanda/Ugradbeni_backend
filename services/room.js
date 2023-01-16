module.exports = class Room {
  constructor (models, logger) {
    this.roomModel = models.room
    this.logger = logger
  }

  async getRoomByName (name) {
    try {
      const room = await this.roomModel.findOne({
        attributes: ['id', 'name'],
        where: {
          name
        }
      })
      return room
    } catch (error) {
      this.logger.error('Error in function  getRoomByName' + error)
      throw (error)
    }
  }
}
