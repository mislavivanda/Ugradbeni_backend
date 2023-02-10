const express = require('express')
const { professorController } = require('../controlers')
// const { authenticateProfesor } = require('../middleware/login')
const profesorRouter = express.Router()
module.exports = (mainRouter) => {
  mainRouter.use('/profesor', profesorRouter)
  profesorRouter.post('/teachingstats', professorController.getProfessorTeachingStats)
}
