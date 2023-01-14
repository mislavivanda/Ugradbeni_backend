'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.teachingSession, { foreignKey: 'subjectID' })
      this.hasMany(models.professorSubjectStats, { foreignKey: 'subjectID' })
      this.hasMany(models.studentSubjectStats, { foreignKey: 'subjectID' })
    }
  };
  subject.init({
    name: DataTypes.STRING,
    predavanjaTotal: DataTypes.INTEGER,
    predavanjaPercentage: DataTypes.INTEGER,
    laboviTotal: DataTypes.INTEGER,
    laboviPercentage: DataTypes.INTEGER,
    auditorneTotal: DataTypes.INTEGER,
    auditornePercentage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject',
    freezeTableName: true,
    timestamps: false
  })
  return subject
}
