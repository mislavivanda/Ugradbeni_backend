'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('student',
      [{
        studentID: '451-2021',
        name: 'Mislav',
        surname: 'Ivanda',
        oib: '385898323',
        email: 'mislavivanda454@gmail.com',
        date_of_birth: '1999/08/11',
        userID: 3
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('student', null, {})
  }
}
