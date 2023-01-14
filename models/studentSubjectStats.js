'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class studentSubjectStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.student, { foreignKey: 'studentID' })
      this.belongsTo(models.subject, { foreignKey: 'subjectID' })
    }
  };
  studentSubjectStats.init({
    predavanja: DataTypes.INTEGER,
    auditorne: DataTypes.INTEGER,
    labovi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'studentSubjectStats',
    freezeTableName: true,
    timestamps: false
  })
  return studentSubjectStats
}
