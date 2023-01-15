'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profesor',
      [{
        profesorID: '12345',
        name: 'Sven',
        surname: 'Gotovac',
        oib: '334244454',
        email: 'Sven.Gotovac@fesb.hr',
        date_of_birth: '1960/08/11',
        userID: 2
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profesor', null, {})
  }
}
