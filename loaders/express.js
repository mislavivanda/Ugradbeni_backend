const mainRouter = require('../api')
const bodyParser = require('body-parser')
const config = require('../config')
// const ping = require('ping')

module.exports = (app, httplogger) => {
  /*   ping.sys.probe('192.168.0.11', (isAlive) => {
      console.log('Ping result isAlive ' + isAlive)
    }) */
  app.use(httplogger)
  app.use(bodyParser.json())
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
