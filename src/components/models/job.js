import Query from './queries'

export default class JobModel {
  constructor () {
    this.query = new Query()
  }
  async insertNewJob (job) {
    const query = `INSERT INTO job (CustomerID, VendorID, VendorSkillID, Address) values (${job.customerId}, ${job.vendorId}, ${job.vendorSkillId}, "${job.address}")`
    const results = await this.query.runQuery(query)
    return results
  }
}
