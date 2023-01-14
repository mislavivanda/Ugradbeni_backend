import { nodelogger } from '../loaders/loggers'
const bcrypt = require('bcrypt')
const { cryptography } = require('../config')
module.exports = {
  encrypt: async function (passwordPlaintext) {
    try {
      let salt = Buffer.alloc(cryptography.saltSizeBytes)
      salt = await bcrypt.genSalt(cryptography.slowHashRounds)
      return await bcrypt.hash(passwordPlaintext, salt)
    } catch (error) {
      nodelogger.error('Error in hashing password ' + error)
      throw (error)
    }
  }
}
