'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      'studentSubjectStats',
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
      'studentSubjectStats',
      'subjectID',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'subject',
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
        'studentSubjectStats',
        'studentID'
      ),
      queryInterface.removeColumn(
        'studentSubjectStats',
        'subjectID'
      )
    ])
  }
}
