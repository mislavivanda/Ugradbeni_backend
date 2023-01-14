'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.student, { foreignKey: 'userID' })
      this.hasMany(models.profesor, { foreignKey: 'userID' })
    }
  };
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
    timestamps: false
  })
  return users
}
