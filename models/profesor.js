'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.users, { foreignKey: 'userID' })
      this.hasMany(models.teachingSession, { foreignKey: 'profesorID' })
      this.hasMany(models.professorSubjectStats, { foreignKey: 'profesorID' })
    }
  };
  profesor.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    oib: DataTypes.STRING,
    email: DataTypes.STRING,
    date_of_birth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'profesor',
    freezeTableName: true,
    timestamps: false
  })
  return profesor
}
