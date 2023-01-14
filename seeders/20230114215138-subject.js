'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subject',
      [{
        name: 'Ugradbeni računalni sustavi',
        predavanjaTotal: 13,
        predavanjaPercentage: 70,
        laboviTotal: 9,
        laboviPercentage: 100,
        auditorneTotal: 0,
        auditornePercentage: 0
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subject', null, {})
  }
}
