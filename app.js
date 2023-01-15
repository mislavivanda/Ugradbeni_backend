const express = require('express')
const loaders = require('./loaders')
const { nodelogger } = require('./loaders/loggers')
const config = require('./config')
const app = express()

async function start () {
  try {
    await loaders.load(app)
    app.listen(config.port, () => {
      nodelogger.info(`App listening on ${config.port} `)
    })
  } catch (error) {
    nodelogger.error('Error in starting application server' + error)
  }
}

start()
