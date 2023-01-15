const { nodelogger } = require('../../loaders/loggers')
const config = require('../../config')
const bcrypt = require('bcrypt')
const services = require('../../services')
module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body
      let user
      try {
        user = await services.usersService.getUser(username)
      } catch (error) {
        nodelogger.error('Error in fetching user from database')
        throw (error)
      }
      if (user) {
        const correctPassword = await bcrypt.compare(password, user.password)
        if (correctPassword) {
          if (user.role === parseInt(config.roles.admin)) {
            res.json({
              role: config.roles.admin
            })
          } else if (user.role === parseInt(config.roles.profesor)) {
            // fetch profesor data
            try {
              const professor = await services.profesorService.getProfesorByUserID(user.id)
              res.json({
                name: professor.name,
                surname: professor.surname,
                email: professor.email,
                role: config.roles.teacher
              })
            } catch (error) {
              nodelogger.error('Error while fetching profesor')
              throw (error)
            }
          } else {
            // fetch student data
            try {
              const student = await services.studentService.getStudentByUserID(user.id)
              res.json({
                name: student.name,
                surname: student.surname,
                email: student.email,
                role: config.roles.student
              })
            } catch (error) {
              nodelogger.error('Error while fetching student')
              throw (error)
            }
          }
        } else {
          res.status(401).json({ role: null })
        }
      } else {
        res.status(401).json({ role: null })
      }
    } catch (err) {
      nodelogger.error('Error in login controler function login')
      next(err)// idii na error middleware handler
    }
  }
}
