'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class professorSubjectStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.profesor, { foreignKey: 'profesorID' })
      this.belongsTo(models.subject, { foreignKey: 'subjectID' })
    }
  };
  professorSubjectStats.init({
    predavanja: DataTypes.INTEGER,
    auditorne: DataTypes.INTEGER,
    labovi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'professorSubjectStats',
    freezeTableName: true,
    timestamps: false
  })
  return professorSubjectStats
}
