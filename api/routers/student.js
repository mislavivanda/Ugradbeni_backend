const express = require('express')
const studentRouter = express.Router()
const { studentController } = require('../controlers')
module.exports = (mainRouter) => {
  mainRouter.use('/student', studentRouter)
  studentRouter.post('/teachingstats', studentController.getStudentTeachingStats)
}
