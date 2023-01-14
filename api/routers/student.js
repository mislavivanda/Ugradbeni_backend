const express = require('express')
const studentTeachingStatsRouter = express.Router()
// const studentTeachingStatsController = require('../controlers/studentTeachingStats')
module.exports = (mainRouter) => {
  mainRouter.use('/', studentTeachingStatsRouter)
}
