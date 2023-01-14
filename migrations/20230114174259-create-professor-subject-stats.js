'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professorSubjectStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      predavanja: {
        type: Sequelize.INTEGER
      },
      auditorne: {
        type: Sequelize.INTEGER
      },
      labovi: {
        type: Sequelize.INTEGER
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('professorSubjectStats')
  }
}
