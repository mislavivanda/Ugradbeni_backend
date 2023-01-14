'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class pings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.student, { foreignKey: 'studentID' })
      this.belongsTo(models.teachingSession, { foreignKey: 'sessionID' })
    }
  };
  pings.init({
    time: DataTypes.DATE,
    present: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pings',
    freezeTableName: true,
    timestamps: false
  })
  return pings
}
