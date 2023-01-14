'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.users, { foreignKey: 'userID' })
      this.hasMany(models.studentAttendance, { foreignKey: 'studentID' })
      this.hasMany(models.pings, { foreignKey: 'studentID' })
      this.hasMany(models.studentSubjectStats, { foreignKey: 'studentID' })
    }
  };
  student.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    oib: DataTypes.STRING,
    email: DataTypes.STRING,
    date_of_birth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'student',
    freezeTableName: true,
    timestamps: false
  })
  return student
}
