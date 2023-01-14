'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class studentAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.teachingSession, { foreignKey: 'sessionID' })
      this.belongsTo(models.student, { foreignKey: 'studentID' })
    }
  };
  studentAttendance.init({
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    ipAddress: DataTypes.STRING,
    macAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'studentAttendance',
    freezeTableName: true,
    timestamps: false
  })
  return studentAttendance
}
