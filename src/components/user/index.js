import SignUpModel from '../models/signup'

export default class User {
  constructor (props) {
    this.firstname = props.firstname
    this.surname = props.surname
    this.dateOfBirth = props.dateOfBirth
    this.login = props.login
    this.password = props.password
    this.dateJoin = props.dateJoin
    this.dateUpdated = props.dateUpdated
    this.email = props.email
    this.telephone = props.telephone
    this.signUpModel = new SignUpModel()
  }

  async matchCredentials (userType) {
    const access = await this.signUpModel.verifyExisting(this.login, userType)
    return access
  }
}
