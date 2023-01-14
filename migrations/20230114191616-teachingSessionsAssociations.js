'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      'teachingSession',
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
      'teachingSession',
      'roomID',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'room',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    ),
    queryInterface.addColumn(
      'teachingSession',
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
        'teachingSession',
        'profesorID'
      ),
      queryInterface.removeColumn(
        'teachingSession',
        'roomID'
      ),
      queryInterface.removeColumn(
        'teachingSession',
        'subjectID'
      )
    ])
  }
}
