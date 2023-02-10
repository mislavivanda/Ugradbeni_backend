const { nodelogger } = require('../../loaders/loggers')
const services = require('../../services')
module.exports = {
  getStudentTeachingStats: async (req, res, next) => {
    try {
      const { studentID } = req.body
      try {
        const studentTeachingStats = await services.studentService.getStudentTeachingStats(studentID)
        res.json(studentTeachingStats)
      } catch (error) {
        nodelogger.error('Error while fetching student teaching stats')
        throw error
      }
    } catch (error) {
      nodelogger.error('Error in student controler function getStudentTeachingStats')
      next(error)
    }
  }
}
