'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('studentSubjectStats',
      [{
        predavanja: 0,
        auditorne: 0,
        labovi: 0,
        studentID: '451-2021',
        subjectID: 1
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studentSubjectStats', null, {})
  }
}
