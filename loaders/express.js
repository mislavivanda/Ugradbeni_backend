const mainRouter = require('../api')
const bodyParser = require('body-parser')
const config = require('../config')

module.exports = (app, httplogger) => {
  app.use(httplogger)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(`/${config.rootpath}`, mainRouter)
  app.use((err, req, res, next) => {
    // main midleware error handler
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message
      }
    })
  })
}
