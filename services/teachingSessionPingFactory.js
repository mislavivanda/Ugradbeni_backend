// node.js -> cache modules
// skripta će se odvit samo jednom i to prilikom prvog requirea
// u ostalim require će se uvijek vraćat isti objekt -> u našem slučaju ista instanca klase
const ping = require('ping')
const services = require('.')
const { nodelogger } = require('../loaders/loggers')
class TeachingSessionPingsFactory {
  constructor () {
    this.activeSessionPings = [] // NIZ ČIJI SVAKI ČLAN OBAVLJA ping OPERACIJU ZA ODREDENU SESIJU
  }

  async pingSessionStudentsCallback (sessionID) {
    // SVE STUDENTE KOJI SU ZABILJEŽENI U studentAttendance ZA ZADANU SESIJU ping-amo I SPREMAMO ISHOD U ping TABLICU
    try {
      let studentAttendanceList = []
      try {
        studentAttendanceList = await services.studentAttendanceService.getStudentAttendanceRecordsForSession(sessionID)
      } catch (error) {
        nodelogger.error('Error while getting student attendance records')
        throw (error)
      }
      for (let i = 0; i < studentAttendanceList.length; i++) {
        // REGISTRIRAT ĆE SVE ping POZIVE I NJIHOVE CALLBACKE
        // NE KORISTIMO AWAIT S KOJIM BI CEKALI SVAKI PING DA SE ZAVRSI
        // KAD SE PING ZAVRSI POZVAT CE SE PROSLIJEDENA CALLBACK FUNKCIJA
        nodelogger.info('Ping Ip adress' + studentAttendanceList[i].ipAddress)
        ping.sys.probe(studentAttendanceList[i].ipAddress, async (isAlive) => {
          try {
            await services.pingService.createPingRecord({
              time: new Date(),
              present: isAlive,
              studentID: studentAttendanceList[i].studentID,
              sessionID
            })
          } catch (error) {
            nodelogger.error('Error while saving ping outcome')
            throw (error)
          }
        })
      }
    } catch (error) {
      nodelogger.error('Error inside pingSessionStudentsCallback method')
    }
  }

  registerSessionPing (sessionID) {
    const newSessionPing = {}
    newSessionPing.sessionID = sessionID
    newSessionPing.sessionPing = setInterval(() => this.pingSessionStudentsCallback(sessionID), 60 * 1000)
    this.activeSessionPings.push(newSessionPing)
  }

  terminateSessionPing (sessionID) {
    const targetSessionPing = this.activeSessionPings.find((sessionPing) => sessionPing.sessionID === sessionID)
    if (targetSessionPing) {
      clearInterval(targetSessionPing.sessionPing)
      this.activeSessionPings.splice(this.activeSessionPings.findIndex((sessionPing) => sessionPing.sessionID === sessionID), 1)
    }
  }
}
const teachingSessionPingFactoryInstance = new TeachingSessionPingsFactory()
module.exports = teachingSessionPingFactoryInstance
