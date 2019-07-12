import Query from './queries'

let logger = global.logger

export default class LoginModel {
  constructor () {
    this.query = new Query()
  }
  async verifyAccess (login, password, userType) {
    const query = 'select count(*) AS number from ' + userType + ' where login ="' + login + '" and password ="' + password + '"'
    const results = await this.query.runQuery(query)
    if (results) {
      if (results[0]['number'] === 1) {
        return { token: this.generateToken(20), status: true }
      }
      return { status: false }
    }
  }

  generateToken (length) {
    var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    var b = []
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0)
      b[i] = a[j]
    }
    return b.join('')
  }
}
