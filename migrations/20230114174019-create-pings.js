'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DATE
      },
      present: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pings')
  }
}
