import LoginModel from '../models/login'
// import Cache from '../cache'

// const cache = new Cache(5000)
// let logger = global.logger

export default class Login {
  constructor (login, password, userType) {
    this.login = login
    this.password = password
    this.userType = userType
    this.accessStatus = false
    this.accessToken = null
  }

  async matchCredentials () {
    let loginModel = new LoginModel()
    const access = await loginModel.verifyAccess(this.login, this.password, this.userType)
    if (access.status) {
      this.accessStatus = true
      this.accessToken = access.token
      // cache.set('customerLogin', { login: this.login, token: access.token })
      // logger.info('user token', cache.get('customerLogin'))
      return { login: this.login, token: access.token }
    }
    return { login: this.login, token: null }
  }
}
