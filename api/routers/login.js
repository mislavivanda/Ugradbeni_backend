const express = require('express')
const loginRouter = express.Router()
const { loginControler } = require('../controlers')
module.exports = (mainRouter) => {
  mainRouter.use('/', loginRouter)
  loginRouter.post('/login', loginControler.login)
}
