const dotenv = require('dotenv')
const envFound = dotenv.config()
if (envFound.error) {
  throw new Error("Couldn't find .env file")
}

module.exports = {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  rootpath: process.env.ROOTPATH,
  cryptography: {
    slowHashRounds: 10,
    saltSizeBytes: 16, // defined by bcrypt
    hashSizeBytes: 24 // defined by bcrypt
  }
}
