const express = require('express')
// const { authenticateProfesor } = require('../middleware/login')
const profesor = express.Router()
module.exports = (mainRouter) => {
  mainRouter.use('/profesor', profesor)
}
