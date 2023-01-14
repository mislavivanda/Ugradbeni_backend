const express = require('express')
const profesorTeachingStatsRouter = express.Router()
// const profesorTeachingStatsController = require('../controlers/profesorTeachingStats')
module.exports = (mainRouter) => {
  mainRouter.use('/', profesorTeachingStatsRouter)
}
