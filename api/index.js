const express = require('express')
const subRouters = require('./routers')
const mainRouter = express.Router()
for (const subRouterName in subRouters) {
  subRouters[subRouterName](mainRouter)
}
module.exports = mainRouter
