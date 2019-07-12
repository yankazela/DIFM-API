import JobModel from '../models/job'
let logger = global.logger
export default class Job {
  constructor (props) {
    this.customerId = props.customerId
    this.vendorSkillId = props.vendorSkillId
    this.vendorId = props.vendorId
    this.address = props.address
    this.jobModel = new JobModel()
  }

  async createNewJob () {
    const job = {
      customerId: this.customerId,
      vendorSkillId: this.vendorSkillId,
      vendorId: this.vendorId,
      address: this.address
    }
    try {
      const results = await this.jobModel.insertNewJob(job)
      if (results.affectedRows === 1 && !isNaN(results.insertId)) {
        return { status: 'success' }
      } else {
        return { status: 'failed', message: 'fail to create new job' }
      }
    } catch (error) {
      logger.error('error:', error.message)
      return { status: 'failed', message: error.message }
    }
  }
}
