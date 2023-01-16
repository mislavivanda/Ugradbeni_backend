const express = require('express')
const teachingSessionRouter = express.Router()
const { teachingSessionController } = require('../controlers')
// const { authenticateProfesor } = require('../middleware/login');
module.exports = (mainRouter) => {
  mainRouter.use('/', teachingSessionRouter)
  teachingSessionRouter.post('/teachingsession/profesor', teachingSessionController.handleProfesorTeachingSessionCall)
  teachingSessionRouter.post('/teachingsession/student', teachingSessionController.handleStudentTeachingSessionCall)
}
