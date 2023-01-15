const express = require('express')
const profesorTeachingStatsRouter = express.Router()
// const profesorTeachingStatsController = require('../controlers')
module.exports = (mainRouter) => {
  mainRouter.use('/profesor', profesorTeachingStatsRouter)
}
