const express = require('express')
// const { authenticateStudent } = require('../middleware/login')
const student = express.Router()
// const studentTeachingStatsController = require('../controlers')
module.exports = (mainRouter) => {
  mainRouter.use('/student', student)
}
