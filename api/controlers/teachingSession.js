const { nodelogger } = require('../../loaders/loggers')
const services = require('../../services')
const teachingSessionPingFactory = require('../../services/teachingSessionPingFactory')

const closeTeachingSession = async (session) => {
  try {
    const sessionStopTime = new Date(); const sessionDurationMinutes = (sessionStopTime.getTime() - new Date(session.start).getTime()) / 60000
    // TODO:zatvori ping servis za zadanu sesiju
    teachingSessionPingFactory.terminateSessionPing(session.id)
    // spremi za profesora da je odrzao predmet
    try {
      await services.profesorSubjectStatsService.incrementProfesorSubjectStatsRecord(session.profesorID, session.subjectID, session.teachingType)
    } catch (error) {
      nodelogger.error('Error while updating profesor stats')
      throw (error)
    }
    // DOHVATI SVE STUDENTE KOJI SU SE PRIJAVILI
    let studentAttendanceList = []
    try {
      studentAttendanceList = await services.studentAttendanceService.getStudentAttendanceRecordsForSession(session.id)
    } catch (error) {
      nodelogger.error('Error while fetching studentAttendance list')
      throw (error)
    }
    // obracunaj minute za svakog studenta u sesiji iz ping podataka -> dohvati samo one zapise sa present:true, 1 zapis = 1 minuta
    // postavi mu end vrijeme kao zadnji timestamp u kojem je bio prisutan
    try {
      for (let i = 0; i < studentAttendanceList.length; i++) {
        const studentPresentRecords = await services.pingService.studentPresentRecordsForSession(studentAttendanceList[i].studentID, session.id)
        studentAttendanceList[i].sessionMinutes = studentPresentRecords.length
        studentAttendanceList[i].lastRecordedTime = studentPresentRecords[studentPresentRecords.length - 1].time
      }
    } catch (error) {
      nodelogger.error('Error while fetching student present records for session')
      throw (error)
    }
    // postavi end vrijeme za svakog studenta
    try {
      for (let i = 0; i < studentAttendanceList.length; i++) {
        await services.studentAttendanceService.updateStudentAttendanceRecord({ end: sessionStopTime }, studentAttendanceList[i].id)
      }
    } catch (error) {
      nodelogger.error('Error while updating studentAttendance end time')
      throw (error)
    }
    // usporedi minute prisutnosti sa sessionDurationMinutes i obracunaj mu dolazak ako ima npr 80% tog vremena
    try {
      for (let i = 0; i < studentAttendanceList.length; i++) {
        nodelogger.info('Session duration ' + sessionDurationMinutes)
        nodelogger.info('Student minutes' + studentAttendanceList[i].sessionMinutes)
        if (studentAttendanceList[i].sessionMinutes > 0.7 * sessionDurationMinutes) {
          await services.studentSubjectStatsService.incrementStudentSubjectStatsRecord(studentAttendanceList[i].studentID, session.subjectID, session.teachingType)
        }
      }
    } catch (error) {
      nodelogger.error('Error while updating student stats')
      throw (error)
    }
    try {
      // zatvori sesiju -> oznaci joj end vrijeme i active:false
      await services.teachingSessionService.closeTeachingSession(session.id, sessionStopTime)
    } catch (error) {
      nodelogger.error('Error while closing session')
      throw (error)
    }
  } catch (error) {
    nodelogger.error('Error in teaching session controler function closeTeachingSession')
    throw (error)
  }
}

const openTeachingSession = async (profesorID, subjectID, roomID, teachingType) => {
  // kreiraj sesiju
  try {
    try {
      const teachingSession = await services.teachingSessionService.createTeachingSession({
        profesorID,
        subjectID,
        roomID,
        teachingType,
        start: new Date(),
        date: new Date(),
        active: true
      })
      // registriraj ping servis sa dobivenim sessionID
      teachingSessionPingFactory.registerSessionPing(teachingSession.id)
    } catch (error) {
      nodelogger.error('Error while creating teaching session')
      throw (error)
    }
  } catch (error) {
    nodelogger.error('Error in teaching session controler function openTeachingSession')
    throw (error)
  }
}

module.exports = {
  handleProfesorTeachingSessionCall: async (req, res, next) => {
    try {
      const { profesorID, subjectName, roomName } = req.body
      let subjectID; let roomID; const teachingType = 'predavanja'
      // PROVJERI JE LI POSTOJE PREDMETI I SOBE S TIM ID-EM
      try {
        const { id } = await services.roomService.getRoomByName(roomName)
        roomID = id
        if (!roomID) {
          throw new Error('No room with specified name')
        }
      } catch (error) {
        nodelogger.error('Error in fetching roomID')
        next(error)
      }
      try {
        const { id } = await services.subjectService.getSubjectByName(subjectName)
        subjectID = id
        if (!subjectID) {
          throw new Error('No subject with specified name')
        }
      } catch (error) {
        nodelogger.error('Error in fetching subjectID')
        next(error)
      }
      try {
        // 1) PROVJERI POSTOJI LI VEC AKTIVNA SESIJA ZA ZADANOG PROFESORA,SOBU I PREDMET
        const teachingSession = await services.teachingSessionService.getTeachingSession(profesorID, subjectID, roomID)
        // a) AKO DA -> POZIV API-A DEFINIRA ZATVARANJE SESIJE
        // b) AKO NE -> POZIV API-A DEFINIRA OTVARANJE SESIJE
        if (teachingSession) {
          await closeTeachingSession(teachingSession, profesorID)
          res.sendStatus(200)
        } else {
          await openTeachingSession(profesorID, subjectID, roomID, teachingType)
          res.sendStatus(200)
        }
      } catch (error) {
        nodelogger.error('Error in fetching teaching session')
        next(error)
      }
    } catch (error) {
      nodelogger.error('Error in teaching session controler function handleProfesorTeachingSessionCall')
      next(error)
    }
  },
  handleStudentTeachingSessionCall: async (req, res, next) => {
    try {
      const { roomName, ipAddress, macAddress, studentID } = req.body
      // NADI TRENUTNO AKTIVNU SESIJU ZA PROSTORIJU(SAMO 1 ISTVOREMENO)
      let roomActiveSession, room
      try {
        room = await services.roomService.getRoomByName(roomName)
      } catch (error) {
        nodelogger.error('Error while fetching room')
        throw (error)
      }
      try {
        roomActiveSession = await services.teachingSessionService.getActiveTeachingSessionForRoom(room.id)
        if (!roomActiveSession) {
          return
        }
      } catch (error) {
        nodelogger.error('Error while fetching active session for room')
        throw (error)
      }
      try {
        // KREIRAJ ZAPIS U studentAttendance -> NE SPREMAJ GA AKO JE VEC SPREMLJEN(findOrCreate)
        await services.studentAttendanceService.createStudentAttendanceRecord(studentID, roomActiveSession.id, ipAddress, macAddress)
        res.sendStatus(200)
      } catch (error) {
        nodelogger.error('Error while creating studentAttendance record')
        throw (error)
      }
    } catch (error) {
      nodelogger.error('Error in teaching session controler function handleStudentTeachingSessionCall')
      next(error)
    }
  }
}
