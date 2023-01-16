module.exports = class StudentAttendance {
  constructor (models, logger) {
    this.studentAttendanceModel = models.studentAttendance
    this.logger = logger
  }

  async createStudentAttendanceRecord (studentID, sessionID, ipAddress, macAddress) {
    try {
      await this.studentAttendanceModel.findOrCreate({
        where: {
          studentID,
          sessionID
        },
        default: {
          start: new Date(),
          studentID,
          sessionID,
          ipAddress,
          macAddress
        }
      })
    } catch (error) {
      this.logger.error('Error in function createStudentAttendanceRecord' + error)
      throw (error)
    }
  }

  async getStudentAttendanceRecordsForSession (sessionID) {
    try {
      return await this.studentAttendanceModel.findAll({
        attributes: ['id', 'studentID', 'start'],
        where: {
          sessionID
        }
      })
    } catch (error) {
      this.logger.error('Error in function getStudentAttendanceRecordsForSession' + error)
      throw (error)
    }
  }

  async updateStudentAttendanceRecord (updateDataObject, recordID) {
    try {
      this.studentAttendanceModel.update(updateDataObject, {
        where: {
          id: recordID
        }
      })
    } catch (error) {
      this.logger.error('Error in function  updateStudentAttendanceRecord' + error)
      throw (error)
    }
  }
}
