const { nodelogger } = require('../../loaders/loggers')
const services = require('../../services')
module.exports = {
  handleTeachingSessionCall: async (req, res, next) => {
    try {
      const { profesorID, subjectName, roomName } = req.body
      let subjectID; let roomID; const teachingType = 'predavanja'
      // PROVJERI JE LI POSTOJE PREDMETI I SOBE S TIM ID-EM
      try {
        const { id: roomID } = await services.roomService.getRoomByName(roomName)
        if (!roomID) {
          throw new Error('No room with specified name')
        }
      } catch (error) {
        nodelogger.error('Error in fetching roomID')
        next(error)
      }
      try {
        const { id: subjectID } = await services.subjectService.getSubjectByName(subjectName)
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
          await this.closeTeachingSession(teachingSession, profesorID)
        } else await this.openTeachingSession(profesorID, subjectID, roomID, teachingType)
      } catch (error) {
        nodelogger.error('Error in fetching teaching session')
        next(error)
      }
    } catch (error) {
      nodelogger.error('Error in teaching session controler function handleTeachingSessionCall')
      next(error)
    }
  },
  closeTeachingSession: async (session) => {
    try {
      const sessionStopTime = new Date(); const sessionDurationMinutes = (sessionStopTime.getTime() - new Date(session.start).getTime()) / 60000
      // TODO:zatvori ping servis za zadanu sesiju
      // spremi za profesora da je odrzao predmet
      try {
        await services.profesorSubjectStats.incrementProfesorSubjectStatsRecord(session.profesorID, session.subjectID, session.teachingType)
      } catch (error) {
        nodelogger.error('Error while updating profesor stats')
        throw (error)
      }
      // DOHVATI SVE STUDENTE KOJI SU SE PRIJAVILI
      let studentAttendanceList = []
      try {
        studentAttendanceList = await services.studentAttendance.getStudentAttendanceRecordsForSession(session.id)
      } catch (error) {
        nodelogger.error('Error while fetching studentAttendance list')
        throw (error)
      }
      // obracunaj minute za svakog studenta u sesiji iz ping podataka -> dohvati samo one zapise sa present:true, 1 zapis = 1 minuta
      // postavi mu end vrijeme kao zadnji timestamp u kojem je bio prisutan
      try {
        for (let i = 0; i < studentAttendanceList.length; i++) {
          const studentPresentRecords = await services.studentAttendance.studentPresentRecordsForSession(studentAttendanceList[i].studentID, session.id)
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
          await services.studentAttendance.updateStudentAttendanceRecord({ end: sessionStopTime }, studentAttendanceList[i].id)
        }
      } catch (error) {
        nodelogger.error('Error while updating studentAttendance end time')
        throw (error)
      }
      // usporedi minute prisutnosti sa sessionDurationMinutes i obracunaj mu dolazak ako ima npr 80% tog vremena
      try {
        for (let i = 0; i < studentAttendanceList.length; i++) {
          if (studentAttendanceList[i].sessionMinutes > 0.7 * sessionDurationMinutes) {
            await services.studentSubjectStats.incrementStudentSubjectStatsRecord(studentAttendanceList[i].studentID, session.subjectID, session.teachingType)
          }
        }
      } catch (error) {
        nodelogger.error('Error while updating student stats')
        throw (error)
      }
      try {
        // zatvori sesiju -> oznaci joj end vrijeme i active:false
        await services.teachingSession.closeTeachingSession(session.id, sessionStopTime)
      } catch (error) {
        nodelogger.error('Error while closing session')
        throw (error)
      }
    } catch (error) {
      nodelogger.error('Error in teaching session controler function closeTeachingSession')
      throw (error)
    }
  },
  openTeachingSession: async (profesorID, subjectID, roomID, teachingType) => {
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
        // teachingSession.id
      } catch (error) {
        nodelogger.error('Error while creating teaching session')
        throw (error)
      }
    } catch (error) {
      nodelogger.error('Error in teaching session controler function openTeachingSession')
      throw (error)
    }
  }
}
