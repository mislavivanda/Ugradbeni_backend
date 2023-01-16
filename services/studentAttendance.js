module.exports = class StudentAttendance {
  constructor (models, logger) {
    this.studentAttendanceModel = models.studentAttendance
    this.logger = logger
  }

  async createStudentAttendanceRecord (studentID, sessionID) {
    try {
      return await this.studentAttendanceModel.create({
        start: new Date(),
        studentID,
        sessionID
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
      this.logger.error('Error in function  createStudentAttendanceRecord' + error)
      throw (error)
    }
  }
}
