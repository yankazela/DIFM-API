import mysql from 'mysql'

let logger = global.logger
let siteProps = global.siteProps
export default class Connection {
  constructor () {
    this.host = siteProps.dbProps.dbHost
    this.user = siteProps.dbProps.dbUser
    this.password = siteProps.dbProps.dbPassword
    this.database = siteProps.dbProps.dbName
    this.connection = this.getConnection()
  }

  getConnection () {
    return mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      multipleStatements: true
    })
  }

  startConnection () {
    return new Promise((resolve, reject) => {
      this.connection.connect(error => {
        if (error) {
          logger.error('DB connection error:', error.message)
        }
        logger.info('connection successfully started')
        resolve(true)
      })
    })
  }

  endConnction () {
    this.connection.end(error => {
      if (error) {
        logger.error('DB ending connection error:', error.message)
        return false
      }
      logger.info('connection successfully ended')
      return true
    })
  }
}
