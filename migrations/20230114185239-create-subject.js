'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subject', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      predavanjaTotal: {
        type: Sequelize.INTEGER
      },
      predavanjaPercentage: {
        type: Sequelize.INTEGER
      },
      laboviTotal: {
        type: Sequelize.INTEGER
      },
      laboviPercentage: {
        type: Sequelize.INTEGER
      },
      auditorneTotal: {
        type: Sequelize.INTEGER
      },
      auditornePercentage: {
        type: Sequelize.INTEGER
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subject')
  }
}
