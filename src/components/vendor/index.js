import User from '../user'
import Login from '../user/login'
import axios from 'axios'

let logger = global.logger
const googleKeys = global.siteProps.googleKeys
export default class Customer extends User {
  constructor (props) {
    super(props)
    this.skills = props.skills
    this.address = props.address
    this.idNumber = props.idNumber
  }

  async createNewVendor () {
    try {
      const access = await this.matchCredentials('vendor')
      const geoCodes = await this.getGeoCodes(this.address)
      if (!access.status) {
        let query = `INSERT INTO vendor (Firstname, Surname, DateOfBirth, Login, Password, Telephone, Email, Address, IdNumber, Coordinates)
        VALUES("${this.firstname}", "${this.surname}", "${this.dateOfBirth}", "${this.login}", "${this.password}", "${this.telephone}", "${this.email}", "${this.address}", "${this.idNumber}", "${geoCodes.Latitude}|${geoCodes.Longitude}")`
        const results = await this.signUpModel.insertUser(query)
        if (results.affectedRows === 1 && !isNaN(results.insertId)) {
          await this.signUpModel.insertVendorSkills(this.skills, results.insertId)
          let userLogin = new Login(this.login, this.password, 'vendor')
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

  async getGeoCodes (address) {
    address = address.replace(/\s/g, '+')
    let url = `${googleKeys.GeocodeUrl}?app_id=${googleKeys.AppId}&app_code=${googleKeys.AppCode}&searchtext=${address}`
    return axios.get(url)
      .then(result => {
        return result.data.Response.View[0].Result[0].Location.DisplayPosition
      })
      .catch(error => {
        logger.error('geocodes', error.message)
        return error
      })
  }
}
