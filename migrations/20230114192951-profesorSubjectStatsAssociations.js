'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      'professorSubjectStats',
      'profesorID',
      {
        type: Sequelize.STRING,
        references: {
          model: 'profesor',
          key: 'profesorID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'professorSubjectStats',
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
        'professorSubjectStats',
        'profesorID'
      ),
      queryInterface.removeColumn(
        'professorSubjectStats',
        'subjectID'
      )
    ])
  }
}
