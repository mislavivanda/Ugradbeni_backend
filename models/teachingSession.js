'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class teachingSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.profesor, { foreignKey: 'profesorID' })
      this.belongsTo(models.room, { foreignKey: 'roomID' })
      this.belongsTo(models.subject, { foreignKey: 'subjectID' })
      this.hasMany(models.studentAttendance, { foreignKey: 'sessionID' })
      this.hasMany(models.pings, { foreignKey: 'sessionID' })
    }
  };
  teachingSession.init({
    teachingType: DataTypes.STRING,
    start: DataTypes.DATE,
    stop: DataTypes.DATE,
    date: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'teachingSession',
    freezeTableName: true,
    timestamps: false
  })
  return teachingSession
}
