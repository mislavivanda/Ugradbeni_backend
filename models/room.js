'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.teachingSession, { foreignKey: 'roomID' })
    }
  };
  room.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'room',
    freezeTableName: true,
    timestamps: false
  })
  return room
}
