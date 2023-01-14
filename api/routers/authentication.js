const express = require('express')
const authenticationRouter = express.Router()
// const authenticationController = require('../controlers/authentication')
module.exports = (mainRouter) => {
  mainRouter.use('/', authenticationRouter)
}
