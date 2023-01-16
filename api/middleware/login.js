const { nodelogger } = require('../../loaders/logger')
const config = require('../../config')
module.exports = {
  authenticateAdmin: (req, res, next) => {
    if (!req.session.user) {
      res.sendStatus(401)
    } else {
      if (req.session.user_type !== parseInt(config.roles.admin, 10)) {
        res.sendStatus(404)
      } else next()
    }
  },
  authenticateStudent: (req, res, next) => {
    if (!req.session.user) {
      nodelogger.info(JSON.stringify(req.session) + req.session.user + req.session.user_type)
      nodelogger.info('nema sessiona')
      res.sendStatus(401)
    } else {
      if (req.session.user_type !== parseInt(config.roles.student, 10)) {
        res.sendStatus(404)
      } else next()
    }
  },
  authenticateProfesor: (req, res, next) => {
    if (!req.session.user) {
      res.sendStatus(401)
    } else {
      if (req.session.user_type !== parseInt(config.roles.profesor, 10)) {
        res.sendStatus(404)
      } else next()
    }
  },
  session: (req, res, next) => {
    if (!req.session.user) {
      res.status(401).json({ role: null })
    } else next()
  }
}
