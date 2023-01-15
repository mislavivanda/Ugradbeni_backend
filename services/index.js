const models = require('../models')
const { nodelogger } = require('../loaders/loggers')
const UsersServiceClass = require('./users')
const StudentServiceClass = require('./student')
const ProfesorServiceClass = require('./profesor')
const usersService = new UsersServiceClass(models, nodelogger)
const studentService = new StudentServiceClass(models, nodelogger)
const profesorService = new ProfesorServiceClass(models, nodelogger)
module.exports = {
  usersService,
  studentService,
  profesorService
}
