import DBConnection from '../dbconnection'

let logger = global.logger

export default class Query {
  constructor () {
    this.dbConnection = new DBConnection()
    this.dbConnection.startConnection()
  }
  async runQuery (query) {
    return new Promise((resolve, reject) => {
      if (this.dbConnection.connection.state === 'disconnected') {
        logger.error('DB connection failed')
      }
      this.dbConnection.connection.query(query, (error, results, fields) => {
        if (error) {
          logger.error('error while executing select query', error.message)
          reject(error)
        }
        resolve(results)
      })
    })
  }
}
