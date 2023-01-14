'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      'studentAttendance',
      'studentID',
      {
        type: Sequelize.STRING,
        references: {
          model: 'student',
          key: 'studentID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'studentAttendance',
      'sessionID',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'teachingSession',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn(
        'studentAttendance',
        'studentID'
      ),
      queryInterface.removeColumn(
        'studentAttendance',
        'sessionID'
      )
    ])
  }
}
