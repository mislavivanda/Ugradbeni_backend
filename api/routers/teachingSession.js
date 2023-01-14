const express = require('express')
const teachingSessionRouter = express.Router()
// const teachingSessionController=require('../controlers/teachingSession');
module.exports = (mainRouter) => {
  mainRouter.use('/', teachingSessionRouter)
}
