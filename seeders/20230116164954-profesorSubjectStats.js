'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('professorSubjectStats',
      [{
        predavanja: 0,
        auditorne: 0,
        labovi: 0,
        profesorID: '12345',
        subjectID: 1
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('professorSubjectStats', null, {})
  }
}
