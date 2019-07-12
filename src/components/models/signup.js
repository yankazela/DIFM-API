import Query from './queries'

// let logger = global.logger

export default class LoginModel {
  constructor () {
    this.query = new Query()
  }
  async verifyExisting (login, userType) {
    const query = 'select count(*) AS number from ' + userType + ' where login ="' + login + '"'
    const results = await this.query.runQuery(query)
    if (results) {
      if (results[0]['number'] === 1) {
        return { status: true }
      }
      return { status: false }
    }
  }

  async insertUser (query) {
    const results = await this.query.runQuery(query)
    return (results)
  }

  async insertVendorSkills (skills, vendorId) {
    var query = ''
    skills.forEach(skill => {
      query = `${query} INSERT INTO vendorskill (SkillID, VendorID, JobBalance, YearsOfExperience, RangeLevel) values (${skill.id}, ${vendorId}, ${skill.jobBalance}, ${skill.yearsOfExperience}, ${skill.rangeLevel});`
    })
    const result = await this.query.runQuery(query.substring(0, query.length - 1))
    return result
  }
}
