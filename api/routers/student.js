const express = require('express')
const studentTeachingStatsRouter = express.Router()
// const studentTeachingStatsController = require('../controlers')
module.exports = (mainRouter) => {
  mainRouter.use('/student', studentTeachingStatsRouter)
}
