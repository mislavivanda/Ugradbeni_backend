'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teachingSession', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teachingType: {
        type: Sequelize.STRING
      },
      start: {
        type: Sequelize.DATE
      },
      stop: {
        type: Sequelize.DATE
      },
      date: {
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teachingSession')
  }
}
