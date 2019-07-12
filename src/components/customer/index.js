import User from '../user'
import Login from '../user/login'

let logger = global.logger

export default class Customer extends User {
  constructor (props) {
    super(props)
    this.averageRating = 0
  }

  async createNewCustomer () {
    try {
      const access = await this.matchCredentials('customer')
      if (!access.status) {
        let query = `INSERT INTO customer (Firstname, Surname, DateOfBirth, Login, Password, Telephone, Email)
        VALUES("${this.firstname}", "${this.surname}", "${this.dateOfBirth}", "${this.login}", "${this.password}", "${this.telephone}", "${this.email}")`
        const results = await this.signUpModel.insertUser(query)
        if (results.affectedRows === 1 && !isNaN(results.insertId)) {
          let userLogin = new Login(this.login, this.password, 'customer')
          let loginData = await userLogin.matchCredentials()
          return { status: 'success', loginData: loginData }
        } else {
          return { status: 'failed', message: 'error inserting' }
        }
      } else {
        return { status: 'failed', message: 'duplicate user' }
      }
    } catch (error) {
      logger.error('error signup: ', error.message)
      return { status: 'failed', message: error.message }
    }
  }
}
