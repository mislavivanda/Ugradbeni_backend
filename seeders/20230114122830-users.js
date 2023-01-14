'use strict'
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')
const { cryptography } = require('../config')
// const crypto = require('../services/crypto') -> iz nekog glupog razloga ne radi s ovim
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashes = []; const plaintextPasswords = ['admin', 'profesor123', 'student123']
    for (let i = 0; i < 3; i++) {
      let salt = Buffer.alloc(cryptography.saltSizeBytes)
      salt = await bcrypt.genSalt(cryptography.slowHashRounds)
      hashes[i] = await bcrypt.hash(plaintextPasswords[i], salt)
    }
    await queryInterface.bulkInsert('users',
      [{
        username: 'admin',
        password: hashes[0],
        role: 1
      },
      {
        username: 'sven',
        password: hashes[1],
        role: 2
      },
      {
        username: 'mivand',
        password: hashes[2],
        role: 3
      }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
