const models = require('../models')
const { nodelogger } = require('../loaders/loggers')
const UsersServiceClass = require('./users')
const StudentServiceClass = require('./student')
const ProfesorServiceClass = require('./profesor')
const TeachingSessionClass = require('./teachingSession')
const RoomServiceClass = require('./room')
const SubjectServiceClass = require('./subject')
const StudentSubjectStatsClass = require('./studentSubjectStats')
const ProfesorSubjectStatsClass = require('./profesorSubjectStats')
const StudentAttendanceClass = require('./studentAttendance')
const PingClass = require('./ping')
const usersService = new UsersServiceClass(models, nodelogger)
const studentService = new StudentServiceClass(models, nodelogger)
const profesorService = new ProfesorServiceClass(models, nodelogger)
const teachingSessionService = new TeachingSessionClass(models, nodelogger)
const roomService = new RoomServiceClass(models, nodelogger)
const subjectService = new SubjectServiceClass(models, nodelogger)
const studentSubjectStatsService = new StudentSubjectStatsClass(models, nodelogger)
const profesorSubjectStatsService = new ProfesorSubjectStatsClass(models, nodelogger)
const studentAttendanceService = new StudentAttendanceClass(models, nodelogger)
const pingService = new PingClass(models, nodelogger)
module.exports = {
  usersService,
  studentService,
  profesorService,
  teachingSessionService,
  roomService,
  subjectService,
  studentSubjectStatsService,
  profesorSubjectStatsService,
  studentAttendanceService,
  pingService
}
