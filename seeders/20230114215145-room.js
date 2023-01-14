'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('room',
      [{
        name: 'B420'
      },
      {
        name: 'B523'
      },
      {
        name: 'A100'
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room', null, {})
  }
}
