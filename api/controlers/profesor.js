const { nodelogger } = require('../../loaders/loggers')
const services = require('../../services')
module.exports = {
  getProfessorTeachingStats: async (req, res, next) => {
    try {
      const { profesorID } = req.body
      try {
        const profesorTeachingStats = await services.profesorService.getProfesorTeachingStats(profesorID)
        res.json(profesorTeachingStats)
      } catch (error) {
        nodelogger.error('Error while fetching profesor teaching stats')
        throw error
      }
    } catch (error) {
      nodelogger.error('Error in profesor controler function getProfessorTeachingStats')
      next(error)
    }
  }
}
