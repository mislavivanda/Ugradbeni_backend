module.exports = class StudentAttendance {
  constructor (models, logger) {
    this.studentAttendanceModel = models.studentAttendance
    this.logger = logger
  }

  async createStudentAttendanceRecord (studentID, sessionID, ipAddress, macAddress) {
    try {
      const record = await this.studentAttendanceModel.findOne({
        where: {
          studentID,
          sessionID
        }
      })
      if (!record) {
        // DODAJ AKO NE POSTOJI
        await this.studentAttendanceModel.create({
          start: new Date(),
          end: null,
          studentID,
          sessionID,
          ipAddress,
          macAddress
        })
      }
    } catch (error) {
      this.logger.error('Error in function createStudentAttendanceRecord' + error)
      throw (error)
    }
  }

  async getStudentAttendanceRecordsForSession (sessionID) {
    try {
      return await this.studentAttendanceModel.findAll({
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
